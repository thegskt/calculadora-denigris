import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// 🔹 CONFIG SUPABASE
const supabase = createClient(
  "https://abqsyirmlskhzijsfzwi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicXN5aXJtbHNraHppanNmendpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NjY5MjEsImV4cCI6MjA4MzU0MjkyMX0.rL9nldMwEj_BjnOXenLbUsYMo4m2qMw1m2hiTsqBdHY"
)

// 🔹 ELEMENTOS DOM
const msg = document.getElementById('msg');
const viewLogin = document.getElementById('view-login');
const viewRegister = document.getElementById('view-register');

// Links de alternância
const linkToRegister = document.getElementById('linkToRegister');
const linkToLogin = document.getElementById('linkToLogin');

// Forms
const formLogin = document.getElementById('formLogin');
const formRegister = document.getElementById('formRegister');
const btnGoogle = document.getElementById('googleLogin');

// URL de destino
const params = new URLSearchParams(window.location.search);
const nextPage = params.get('next') || 'home.html';

// =========================================
// 1. LÓGICA DE ALTERNAR TELAS (LOGIN <-> CADASTRO)
// =========================================
function switchView(view) {
  msg.textContent = ''; // Limpa mensagens
  msg.className = 'message-box';
  
  if (view === 'register') {
    viewLogin.classList.add('hidden');
    viewRegister.classList.remove('hidden');
  } else {
    viewRegister.classList.add('hidden');
    viewLogin.classList.remove('hidden');
  }
}

linkToRegister?.addEventListener('click', (e) => {
  e.preventDefault();
  switchView('register');
});

linkToLogin?.addEventListener('click', (e) => {
  e.preventDefault();
  switchView('login');
});

// =========================================
// 2. LOGIN GOOGLE
// =========================================
btnGoogle?.addEventListener('click', async () => {
  msg.textContent = 'Aguarde, indo para o Google...';
  
  const currentUrl = window.location.origin + window.location.pathname;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: currentUrl }
  });

  if (error) {
    showMessage(error.message, true);
  }
});

// =========================================
// 3. LOGIN COM EMAIL
// =========================================
formLogin?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  showMessage('Entrando...', false);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    showMessage("Erro: " + error.message, true);
  } else if (data.user) {
    showMessage("Sucesso! Redirecionando...", false);
    window.location.href = nextPage;
  }
});

// =========================================
// 4. CADASTRO (NOVA LÓGICA PROFISSIONAL)
// =========================================
formRegister?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;

  // Validação básica local
  if (password !== confirmPassword) {
    showMessage('As senhas não coincidem.', true);
    return;
  }
  if (password.length < 6) {
    showMessage('A senha deve ter pelo menos 6 caracteres.', true);
    return;
  }

  showMessage('Criando sua conta...', false);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name // Salva o nome do usuário no Supabase!
      }
    }
  });

  if (error) {
    showMessage(error.message, true);
  } else {
    // Verifica se logou direto (Confirmação de email desligada)
    if (data.session) {
      showMessage("Conta criada! Entrando...", false);
      setTimeout(() => { window.location.href = nextPage; }, 1000);
    } else {
      showMessage("Conta criada! Verifique seu e-mail.", false);
      formRegister.reset(); // Limpa o formulário
      setTimeout(() => switchView('login'), 3000); // Volta para login após 3s
    }
  }
});

// Função auxiliar para mensagens coloridas
function showMessage(text, isError) {
  msg.textContent = text;
  if (isError) {
    msg.classList.add('error');
    msg.classList.remove('success');
    msg.style.color = '#ff4d4d';
  } else {
    msg.classList.add('success');
    msg.classList.remove('error');
    msg.style.color = '#b9b610';
  }
}

// =========================================
// 5. CHECAR SESSÃO
// =========================================
async function checkUser() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
     window.location.href = nextPage;
  }
  
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) window.location.href = nextPage;
  });
}

checkUser();