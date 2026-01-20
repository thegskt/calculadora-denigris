import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient(
  "https://abqsyirmlskhzijsfzwi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicXN5aXJtbHNraHppanNmendpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NjY5MjEsImV4cCI6MjA4MzU0MjkyMX0.rL9nldMwEj_BjnOXenLbUsYMo4m2qMw1m2hiTsqBdHY"
)

export async function requireAuth() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Se não estiver logado, manda de volta para o login
    // Salvando a página atual no parâmetro 'next' para voltar depois
    const currentPath = window.location.pathname.split('/').pop();
    window.location.href = `login.html?next=${currentPath}`;
  }
  return user;
}