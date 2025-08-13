// Fonte de dados (CSV do Google Sheets)
const sheetCsvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqk-5eBeAxB4GesiaM7W6iEUq9lgfTsRzdy1QylG1ak7dX35Ol827EM1c7LPWb97BoBh6iUbtJMMw"
  + "/pub?gid=2122951741&single=true&output=csv";

const busca = document.getElementById('busca');
const groupsEl = document.getElementById('groups');
let itens = [];

const FAM_ORDER = ['Accelo','Atego','Actros','Axor','Arocs','Outros'];

function fmtBRL(v){
  if (isNaN(v)) return "R$ 0,00";
  return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}
function normFamily(modelo=''){
  const famRaw = (modelo || '').trim().split(/\s+/)[0].toUpperCase();
  switch (famRaw) {
    case 'ACCELO': return 'Accelo';
    case 'ATEGO':  return 'Atego';
    case 'ACTROS': return 'Actros';
    case 'AXOR':   return 'Axor';
    case 'AROCS':  return 'Arocs';
    default:       return 'Outros';
  }
}
function groupByFamily(list){
  const map = new Map();
  for (const it of list){
    const fam = normFamily(it.modelo);
    if (!map.has(fam)) map.set(fam, []);
    map.get(fam).push(it);
  }
  const arr = [];
  for (const fam of FAM_ORDER){
    if (map.has(fam)) arr.push({ name:fam, items: map.get(fam) });
  }
  return arr;
}

function render(list){
  groupsEl.innerHTML = '';
  const groups = groupByFamily(list);

  for (const g of groups){
    const acc = document.createElement('section');
    acc.className = 'acc';

    // header
    const h = document.createElement('div');
    h.className = 'acc-h';
    h.setAttribute('role','button');
    h.setAttribute('tabindex','0');
    h.setAttribute('aria-expanded','false');

    const left = document.createElement('div');
    left.className = 'acc-title';
    const title = document.createElement('span');
    title.textContent = g.name;
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = g.items.length;
    left.append(title, badge);

    const chev = document.createElement('span');
    chev.className = 'chev';
    chev.textContent = '▾';

    h.append(left, chev);

    // content
    const c = document.createElement('div');
    c.className = 'acc-c';

    // header de colunas (desktop)
    const cols = document.createElement('div');
    cols.className = 'cols';
    cols.innerHTML = `
      <div>Modelo</div>
      <div>FZ</div>
      <div>UP</div>
      <div>Ano</div>
      <div class="right">Valor Tabela</div>
      <div>Ação</div>
    `;
    c.appendChild(cols);

    const rows = document.createElement('div');
    rows.className = 'rows';

    for (const r of g.items){
      const row = document.createElement('div');
      row.className = 'row';

      // Modelo primeiro
      const cMod = document.createElement('div');
      cMod.textContent = r.modelo;
      cMod.className = 'modelo';
      cMod.setAttribute('data-label','Modelo');

      // FZ
      const cFz = document.createElement('div');
      cFz.className = 'fz';
      cFz.textContent = r.fz;
      cFz.setAttribute('data-label','FZ');

      const cUp = document.createElement('div');
      cUp.textContent = r.up;
      cUp.setAttribute('data-label','UP');

      const cAno = document.createElement('div');
      cAno.textContent = r.anoMod;
      cAno.setAttribute('data-label','Ano');

      const cVal = document.createElement('div');
      cVal.textContent = fmtBRL(r.valorTabela);
      cVal.className = 'right';
      cVal.setAttribute('data-label','Valor Tabela');

      const cAc = document.createElement('div');
      const a = document.createElement('a');
      a.className = 'btn btn-primary';
      a.textContent = 'Calcular';
      a.href = `index.html?calc=proprio&fz=${encodeURIComponent(r.fz)}`;
      cAc.appendChild(a);

      // Ordem: Modelo, FZ, UP, Ano, Valor, Ação
      row.append(cMod, cFz, cUp, cAno, cVal, cAc);
      rows.appendChild(row);
    }

    c.appendChild(rows);
    acc.append(h, c);
    groupsEl.appendChild(acc);

    // toggle
    const toggle = () => {
      const isOpen = acc.classList.toggle('open');
      h.setAttribute('aria-expanded', String(isOpen));
    };
    h.addEventListener('click', toggle);
    h.addEventListener('keydown', (e)=> {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  }
}

function filtrar(){
  const q = busca.value.trim().toLowerCase();
  if (!q) { render(itens); return; }
  const qNum = q.replace(/\D/g,'');
  const f = itens.filter(r =>
    r.fz.includes(qNum) ||
    r.modelo.toLowerCase().includes(q) ||
    r.up.toLowerCase().includes(q) ||
    r.anoMod.toLowerCase().includes(q)
  );
  render(f);
  // abre automaticamente as famílias que aparecerem no filtro
  document.querySelectorAll('.acc').forEach(sec => {
    sec.classList.add('open');
    sec.querySelector('.acc-h')?.setAttribute('aria-expanded','true');
  });
}

busca.addEventListener('input', filtrar);

async function carregar(){
  try{
    const res = await fetch(sheetCsvUrl, { cache:'no-store' });
    const txt = await res.text();
    const rows = txt.trim().split('\n');
    rows.shift(); // cabeçalho
    itens = rows.map(line => {
      const cols = line
        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(c => c.replace(/^"|"$/g, "").trim());
      return {
        fz: (cols[0] || '').padStart(6, "0"),
        modelo: cols[1] || '',
        up: cols[2] || '',
        anoMod: cols[3] || '',
        valorTabela: parseFloat((cols[4] || '0').replace(/\./g,"").replace(/,/g,".")) || 0
      };
    });
    render(itens);
  }catch(e){
    console.error('Erro ao carregar estoque:', e);
    groupsEl.innerHTML = '<div class="acc"><div class="acc-h"><div class="acc-title"><span>Erro</span></div></div><div class="acc-c"><div class="rows"><div class="row"><div>Não foi possível carregar o estoque.</div></div></div></div></div>';
  }
}

carregar();