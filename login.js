// AVISO: este login é apenas uma barreira simples no front-end (não é segurança real).
const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');
const btn = document.getElementById('btnGoogle');
const params = new URLSearchParams(location.search);
const next = params.get('next') || 'estoque.html';

function goNext(){ location.replace(next); }

if (window.netlifyIdentity) {
  netlifyIdentity.on('init', user => { if (user) goNext(); });
  netlifyIdentity.on('login', () => goNext());
  netlifyIdentity.on('error', (e) => { msg.textContent = 'Falha ao autenticar. Tente novamente.'; console.error(e); });
}
btn?.addEventListener('click', () => {
  netlifyIdentity?.open('login'); // abre modal com “Google”
});