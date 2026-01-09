import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// 🔹 CONFIG SUPABASE
const supabase = createClient(
  "https://abqsyirmlskhzijsfzwi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicXN5aXJtbHNraHppanNmendpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NjY5MjEsImV4cCI6MjA4MzU0MjkyMX0.rL9nldMwEj_BjnOXenLbUsYMo4m2qMw1m2hiTsqBdHY"
)

// 🔹 ELEMENTOS
const msg = document.getElementById('msg')
const btn = document.getElementById('btnGoogle')

// 🔹 REDIRECIONAMENTO (?next=pagina.html)
const params = new URLSearchParams(window.location.search)
const next = params.get('next') || 'estoque.html'

// 🔹 LOGIN GOOGLE
btn?.addEventListener('click', async () => {
  msg.textContent = 'Redirecionando para o Google...'

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/${next}`
    }
  })

  if (error) {
    msg.textContent = 'Falha ao autenticar. Tente novamente.'
    console.error(error)
  }
})

// 🔹 SE JÁ ESTIVER LOGADO, PULA O LOGIN
const checkSession = async () => {
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    location.replace(next)
  }
}

const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const btnLoginEmail = document.getElementById('btnLoginEmail')
const btnRegisterEmail = document.getElementById('btnRegisterEmail')

// LOGIN COM EMAIL
btnLoginEmail?.addEventListener('click', async () => {
  msg.textContent = 'Entrando...'

  const { error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  })

  if (error) {
    msg.textContent = error.message
  } else {
    location.replace(next)
  }
})

// REGISTRO COM EMAIL
btnRegisterEmail?.addEventListener('click', async () => {
  msg.textContent = 'Criando conta...'

  const { error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value
  })

  if (error) {
    msg.textContent = error.message
  } else {
    msg.textContent = 'Conta criada! Verifique seu email.'
  }
})

checkSession()
