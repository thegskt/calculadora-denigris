// --- MOTOR RPN APRIMORADO HP-12C ---

// Elementos da UI
const displayEl = document.getElementById('display');
const keyGrid = document.querySelector('.hp-grid');

// Estado da Calculadora
let stack = [0, 0, 0, 0]; // Pilha RPN: [X, Y, Z, T]
let fin = { n: 0, i: 0, PV: 0, PMT: 0, FV: 0 }; // Registradores Financeiros
let inputBuffer = '0'; // Buffer de entrada atual
let inputMode = true; // Flag para controlar se estamos digitando um novo número
let shiftActive = null; // Controla as teclas 'f' (laranja) e 'g' (azul)

// --- FUNÇÕES DE NÚCLEO ---

/**
 * Atualiza o visor com formatação e lógica de entrada.
 * @param {string|number} value O valor a ser exibido.
 * @param {boolean} isInput Se o valor é do buffer de entrada (sem formatação completa).
 */
function updateDisplay(value, isInput = false) {
  if (isInput) {
    // Para entrada, apenas troca o ponto por vírgula e limita o tamanho
    displayEl.innerText = value.replace('.', ',').substring(0, 10);
  } else {
    let num = parseFloat(value);
    if (isNaN(num)) {
      displayEl.innerText = 'Error';
      return;
    }
    // Formata para o padrão brasileiro (ex: 1.234,56)
    displayEl.innerText = num.toLocaleString('pt-BR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  }
}

/** Empurra um valor para a pilha RPN. */
function pushStack(value) {
  stack.unshift(value);
  if (stack.length > 4) stack.pop(); // Mantém a pilha com 4 níveis
}

/** Tira o registrador X (stack[0]) e move os outros para baixo. */
function popStack() {
  const x = stack.shift();
  stack.push(0); // Adiciona 0 no final (em T)
  return x;
}

/** Processa o buffer de entrada e o empurra para a pilha se necessário. */
function handleInput() {
  if (inputMode) {
    pushStack(parseFloat(inputBuffer));
    inputBuffer = '0';
    inputMode = false;
  }
}

// --- MANIPULADORES DE TECLAS ---

const keyHandlers = {
  // Números e Ponto Decimal
  number(key) {
    if (!inputMode) {
      pushStack(stack[0]); // Salva o valor anterior
      inputBuffer = '0';
      inputMode = true;
    }
    const val = key.dataset.val;
    if (val === '.' && inputBuffer.includes('.')) return;
    if (inputBuffer === '0' && val !== '.') inputBuffer = '';
    
    inputBuffer += val;
    stack[0] = parseFloat(inputBuffer); // Atualiza X em tempo real
    updateDisplay(inputBuffer, true);
  },

  // Operadores Matemáticos
  operator(key) {
    handleInput();
    const op = key.dataset.val;
    const x = popStack();
    const y = popStack();
    let result = 0;

    if (op === '+') result = y + x;
    if (op === '-') result = y - x;
    if (op === '*') result = y * x;
    if (op === '/') result = x !== 0 ? y / x : 'Error';

    stack[0] = result;
    updateDisplay(result);
  },

  // Funções Especiais
  special(key) {
    const func = key.dataset.val;
    switch(func) {
      case 'ENTER':
        if (inputMode) {
          pushStack(parseFloat(inputBuffer));
          inputBuffer = '0';
          inputMode = false;
        } else {
          pushStack(stack[0]);
        }
        break;
      case 'CHS': // Change Sign
        stack[0] *= -1;
        if (inputMode) {
            inputBuffer = stack[0].toString();
        }
        updateDisplay(inputMode ? inputBuffer : stack[0], inputMode);
        break;
      case 'CLx': // Clear X
        stack[0] = 0;
        inputBuffer = '0';
        inputMode = false;
        updateDisplay('0', true);
        break;
    }
  },

  // Teclas de Shift (f, g)
  shift(key) {
    shiftActive = key.classList.contains('btn-f') ? 'f' : 'g';
    // Adicionar um feedback visual seria ótimo aqui (ex: acender um LED no painel)
  },

  // Funções Financeiras (n, i, PV, PMT, FV)
  financial(key) {
    const finKey = key.dataset.val;

    if (shiftActive === 'f' || shiftActive === 'g') { // Considerando 'g' para futuras expansões
      // CALCULAR a variável
      let result = 0;
      const i = fin.i / 100; // Taxa como decimal

      try {
        switch(finKey) {
          case 'n':
            if (i > 0 && fin.PV !== 0 && fin.PMT !== 0) {
              result = Math.log((-fin.PMT + i * fin.FV) / (-fin.PMT + i * fin.PV)) / Math.log(1 + i);
            } else { result = 'Error'; }
            break;
          case 'i':
            // Calcular i é complexo, requer um solver numérico (não implementado)
            result = 'Error'; // Placeholder
            break;
          case 'PV':
            if (i > 0) {
              const factor = Math.pow(1 + i, fin.n);
              result = -(fin.FV + fin.PMT * (factor - 1) / i) / factor;
            } else { result = 'Error'; }
            break;
          case 'PMT':
            if (fin.n === 0) { result = 'Error'; break; }
            if (i === 0) {
              result = -(fin.PV + fin.FV) / fin.n;
            } else {
              const factor = Math.pow(1 + i, fin.n);
              result = - (fin.PV * factor * i + fin.FV * i) / (factor - 1);
            }
            break;
          case 'FV':
             if (i === 0){
                result = -(fin.PV + fin.PMT * fin.n);
             } else {
                const factor = Math.pow(1 + i, fin.n);
                result = -(fin.PV * factor + fin.PMT * (factor - 1) / i);
             }
            break;
        }
        stack[0] = result;
        updateDisplay(result);
      } catch (e) {
        displayEl.innerText = 'Error';
      }
    } else {
      // ARMAZENAR o valor do visor no registrador financeiro
      handleInput();
      fin[finKey] = stack[0];
      
      // Feedback visual rápido
      displayEl.innerText = finKey;
      setTimeout(() => updateDisplay(stack[0]), 400);
    }
    
    shiftActive = null; // Reseta o shift após o uso
  }
};

// --- EVENT LISTENER PRINCIPAL ---

keyGrid.addEventListener('click', (e) => {
  const key = e.target.closest('.key');
  if (!key) return;

  const keyType = getKeyType(key);
  if (keyHandlers[keyType]) {
    keyHandlers[keyType](key);
  }
});

/**
 * Determina o tipo da tecla pressionada para direcionar ao handler correto.
 */
function getKeyType(key) {
  if (key.classList.contains('num')) return 'number';
  if (key.classList.contains('op')) return 'operator';
  if (key.classList.contains('btn-f') || key.classList.contains('btn-g')) return 'shift';
  
  const val = key.dataset.val;
  if (['ENTER', 'CHS', 'CLx'].includes(val)) return 'special';
  if (['n', 'i', 'PV', 'PMT', 'FV'].includes(val)) return 'financial';
  
  return 'other'; // Para funções ainda não implementadas
}


// Inicialização
updateDisplay('0', true);