import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// 🔹 CONFIG SUPABASE
const supabase = createClient(
  "https://abqsyirmlskhzijsfzwi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicXN5aXJtbHNraHppanNmendpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NjY5MjEsImV4cCI6MjA4MzU0MjkyMX0.rL9nldMwEj_BjnOXenLbUsYMo4m2qMw1m2hiTsqBdHY"
)

// 🔹 ELEMENTOS DOM
const msg = document.getElementById('msg')
const btnGoogle = document.getElementById('googleLogin')
const emailForm = document.getElementById('emailForm')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const btnRegisterEmail = document.getElementById('registerBtn')

// 🔹 DEFINE PARA ONDE VAI APÓS LOGIN
// Se houver ?next= no link, usa ele. Se não, vai para home.html
const params = new URLSearchParams(window.location.search)
const nextPage = params.get('next') || 'home.html'

// =========================================
// 1. LOGIN COM GOOGLE
// =========================================
btnGoogle?.addEventListener('click', async () => {
  msg.textContent = 'Aguarde, redirecionando para o Google...'
  
  // Pega a URL base atual (ex: http://127.0.0.1:5500)
  const currentUrl = window.location.origin + window.location.pathname;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // Importante: O Supabase redireciona para cá DEPOIS do Google
      redirectTo: currentUrl 
    }
  })

  if (error) {
    msg.textContent = 'Erro Google: ' + error.message
    console.error(error)
  }
})

// =========================================
// 2. LOGIN COM EMAIL
// =========================================
emailForm?.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  msg.textContent = 'Verificando credenciais...'

  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  })

  if (error) {
    msg.textContent = "Erro: " + error.message;
  } else if (data.user) {
    msg.textContent = "Login com sucesso! Entrando...";
    window.location.href = nextPage;
  }
})

// =========================================
// 3. REGISTRO (CRIAR CONTA)
// =========================================
btnRegisterEmail?.addEventListener('click', async () => {
  if (!emailInput.value || !passwordInput.value) {
    msg.textContent = 'Preencha e-mail e senha.'
    return
  }
  
  msg.textContent = 'Criando conta...'

  const { data, error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value
  })

  if (error) {
    msg.textContent = "Erro ao criar: " + error.message
  } else {
    // Se a confirmação de e-mail estiver DESLIGADA no painel, ele loga direto
    if (data.session) {
        msg.textContent = "Conta criada! Entrando...";
        window.location.href = nextPage;
    } else {
        // Se a confirmação estiver LIGADA
        msg.textContent = "Verifique seu e-mail para confirmar o cadastro.";
    }
  }
})

// =========================================
// 4. VERIFICAÇÃO DE SESSÃO (IMPORTANTE)
// =========================================
async function checkUser() {
  // Escuta mudanças no estado da autenticação (Login, Logout, Token Refreshed)
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("Evento Auth:", event);
    
    if (session) {
      // Se existe sessão, redireciona
      console.log("Usuário logado:", session.user.email);
      // Pequeno delay para garantir que o cookie foi gravado
      setTimeout(() => {
        window.location.href = nextPage;
      }, 500);
    }
  });

  // Verifica se JÁ está logado ao abrir a página
  const { data } = await supabase.auth.getSession();
  if (data.session) {
     window.location.href = nextPage;
  }
}

// Inicia a verificação
checkUser();