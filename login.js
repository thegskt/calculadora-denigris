import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// 🔹 CONFIG SUPABASE
const supabase = createClient(
  "https://abqsyirmlskhzijsfzwi.supabase.co",
  "SUA_ANON_PUBLIC_KEY_AQUI"
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

checkSession()
