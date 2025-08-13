// AVISO: este login é apenas uma barreira simples no front-end (não é segurança real).
const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');
const btn = document.getElementById('btnGoogle');
const params = new URLSearchParams(location.search);
const next = params.get('next') || 'estoque.html';

function goNext(){ location.replace(next); }

// Força sair sempre que abrir o login (zera sessão/cookie)
document.addEventListener('DOMContentLoaded', () => {
  window.netlifyIdentity?.logout();
});

if (window.netlifyIdentity) {
  netlifyIdentity.on('login', () => goNext());
  netlifyIdentity.on('error', (e) => { msg.textContent = 'Falha ao autenticar. Tente novamente.'; console.error(e); });
  netlifyIdentity.init();
}

btn?.addEventListener('click', () => {
  netlifyIdentity?.open('login');
});