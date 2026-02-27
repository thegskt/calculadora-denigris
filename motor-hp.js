// --- MOTOR RPN SIMPLIFICADO HP-12C ---
let displayEl = document.getElementById('display');
let inputBuffer = '';
let inputMode = false;

// A famosa Pilha (Stack) RPN: X, Y, Z, T
let stack = [0, 0, 0, 0];

// Registradores Financeiros
let fin = { n: 0, i: 0, PV: 0, PMT: 0, FV: 0 };

function updateDisplay(val) {
  let num = parseFloat(val);
  if (isNaN(num)) num = 0;
  // Formata padrão Brasil (1.234,56)
  displayEl.innerText = num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function pushStack(val) {
  stack[3] = stack[2]; // T = Z
  stack[2] = stack[1]; // Z = Y
  stack[1] = stack[0]; // Y = X
  stack[0] = val;      // X = Novo valor
}

function popStack() {
  let val = stack[0];
  stack[0] = stack[1]; // X = Y
  stack[1] = stack[2]; // Y = Z
  stack[2] = stack[3]; // Z = T
  return val;
}

// Captura todos os botões
document.querySelectorAll('.key').forEach(btn => {
  btn.addEventListener('click', () => {
    let val = btn.getAttribute('data-val');
    
    // NÚMEROS E PONTO
    if (btn.classList.contains('num')) {
      if (!inputMode) {
        inputBuffer = '';
        inputMode = true;
      }
      if (val === '.') {
        if (!inputBuffer.includes('.')) inputBuffer += '.';
      } else {
        inputBuffer += val;
      }
      stack[0] = parseFloat(inputBuffer);
      displayEl.innerText = inputBuffer.replace('.', ',');
      return;
    }

    // ENTER (O botão principal da HP)
    if (val === 'ENTER') {
      pushStack(stack[0]);
      inputMode = false;
      updateDisplay(stack[0]);
      return;
    }

    // CHANGE SIGN (Muda sinal - vital para financiamento)
    if (val === 'CHS') {
      stack[0] = stack[0] * -1;
      if (inputMode) {
        inputBuffer = stack[0].toString();
        displayEl.innerText = inputBuffer.replace('.', ',');
      } else {
        updateDisplay(stack[0]);
      }
      return;
    }

    // LIMPAR (CLx)
    if (val === 'CLx') {
      stack[0] = 0;
      inputBuffer = '';
      inputMode = false;
      updateDisplay(stack[0]);
      return;
    }

    // OPERAÇÕES MATEMÁTICAS (+, -, *, /)
    if (btn.classList.contains('op')) {
      inputMode = false;
      let x = stack[0];
      let y = stack[1];
      popStack(); // Desce a pilha
      
      if (val === '+') stack[0] = y + x;
      if (val === '-') stack[0] = y - x;
      if (val === '*') stack[0] = y * x;
      if (val === '/') stack[0] = x !== 0 ? y / x : 0;
      
      updateDisplay(stack[0]);
      return;
    }

    // FUNÇÕES FINANCEIRAS (A Mágica!)
    if (['n', 'i', 'PV', 'PMT', 'FV'].includes(val)) {
      inputMode = false;

      // Se ele só clicou (não tem valor novo), ele quer CALCULAR
      if (inputBuffer === '' && val === 'PMT') {
        // Fórmula PMT = PV * (i / (1 - (1+i)^-n))
        let taxa = fin.i / 100;
        let pmt = fin.PV * (taxa / (1 - Math.pow(1 + taxa, -fin.n)));
        stack[0] = pmt * -1; // Na HP, saída é negativa se entrada é positiva
        updateDisplay(stack[0]);
        return;
      }

      // Se ele digitou algo antes, ele quer ARMAZENAR na memória
      fin[val] = stack[0];
      inputBuffer = ''; 
      
      // Pisca a tela rapidamente para confirmar que gravou (efeito clássico HP)
      displayEl.innerText = val;
      setTimeout(() => updateDisplay(stack[0]), 400);
      return;
    }
  });
});

// Inicializa zerada
updateDisplay(0);