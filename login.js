// AVISO: este login é apenas uma barreira simples no front-end (não é segurança real).
const form = document.getElementById('loginForm');
const pinEl = document.getElementById('pin');
const msg = document.getElementById('msg');
const params = new URLSearchParams(location.search);
const next = params.get('next'); // opcional: voltar para onde o user tentou acessar

// Defina seu PIN aqui (troque "1234"):
const VALID_PINS = ['1234']; // adicione outros se quiser

// Se já está logado, pula login
if (localStorage.getItem('dn_auth') === 'ok') {
  location.replace(next || 'estoque.html');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const pin = (pinEl.value || '').trim();
  if (VALID_PINS.includes(pin)) {
    localStorage.setItem('dn_auth', 'ok');
    location.replace(next || 'estoque.html');
  } else {
    msg.textContent = 'PIN inválido.';
    pinEl.focus();
  }
});