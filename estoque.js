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
      <div>Cor</div>
      <div>UP</div>
      <div>Var.</div>
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

      // Modelo (com botão "i" para detalhes)
      const cMod = document.createElement('div');
      cMod.className = 'modelo';
      cMod.setAttribute('data-label','Modelo');
      const modTxt = document.createElement('span');
      modTxt.textContent = r.modelo;
      const infoBtn = document.createElement('button');
      infoBtn.type = 'button'; infoBtn.className = 'chip-btn'; infoBtn.title = 'Detalhes (Pátio e FZ)'; infoBtn.textContent = 'i';
      infoBtn.addEventListener('click', (e)=>{ e.preventDefault(); row.classList.toggle('show-meta'); });
      cMod.append(modTxt, infoBtn);

      // Cor (substitui FZ na coluna visível)
      const cCor = document.createElement('div'); cCor.textContent = r.cor || '-'; cCor.setAttribute('data-label','Cor');

      // UP (destaque)
      const cUp = document.createElement('div'); cUp.className = 'up'; cUp.textContent = r.up; cUp.setAttribute('data-label','UP');

      // Variante (entre UP e Ano)
      const cVar = document.createElement('div'); cVar.textContent = r.variante || '-'; cVar.setAttribute('data-label','Var.');

      // Ano
      const cAno = document.createElement('div'); cAno.textContent = r.anoMod; cAno.setAttribute('data-label','Ano');

      // Valor
      const cVal = document.createElement('div'); cVal.textContent = fmtBRL(r.valorTabela); cVal.className = 'right'; cVal.setAttribute('data-label','Valor Tabela');

      // Ação
      const cAc = document.createElement('div');
      const a = document.createElement('a'); a.className = 'btn btn-primary'; a.textContent = 'Calcular';
      a.href = `index.html?calc=proprio&fz=${encodeURIComponent(r.fz)}`;
      cAc.appendChild(a);

      // Meta (apenas Pátio, FZ e Foto)
      const cMeta = document.createElement('div'); cMeta.className = 'meta'; cMeta.setAttribute('data-label',''); cMeta.style.gridColumn = '1 / -1';
      if (r.patio) cMeta.insertAdjacentHTML('beforeend', `<span class="chip"><b>Pátio</b> ${r.patio}</span>`);
      if (r.fz)    cMeta.insertAdjacentHTML('beforeend', `<span class="chip"><b>FZ</b> ${r.fz}</span>`);
      if (r.fotoUrl) {
        const btnFoto = document.createElement('button');
        btnFoto.className = 'chip chip-foto';
        btnFoto.innerHTML = '📷 Foto';
        btnFoto.addEventListener('click', () => abrirFoto(r.fotoUrl, r.modelo));
        cMeta.appendChild(btnFoto);
      }

      // Ordem: Modelo, Cor, UP, Var., Ano, Valor, Ação, Meta
      row.append(cMod, cCor, cUp, cVar, cAno, cVal, cAc, cMeta);
      rows.appendChild(row);
    }

    c.appendChild(rows); acc.append(h, c); groupsEl.appendChild(acc);

    const toggle = () => { const isOpen = acc.classList.toggle('open'); h.setAttribute('aria-expanded', String(isOpen)); };
    h.addEventListener('click', toggle);
    h.addEventListener('keydown', (e)=> { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  }
}

function filtrar(){
  const q = (busca.value || '').trim().toLowerCase();
  if (!q) { render(itens); return; }
  const qNum = q.replace(/\D/g,'');
  const f = itens.filter(r =>
    r.fz.includes(qNum) ||
    r.modelo.toLowerCase().includes(q) ||
    r.up.toLowerCase().includes(q) ||
    r.anoMod.toLowerCase().includes(q) ||
    (r.cor||'').toLowerCase().includes(q) ||
    (r.variante||'').toLowerCase().includes(q)
  );
  render(f);
  document.querySelectorAll('.acc').forEach(sec => {
    sec.classList.add('open'); sec.querySelector('.acc-h')?.setAttribute('aria-expanded','true');
  });
}

busca.addEventListener('input', filtrar);

// Função para converter URL do Google Drive em URL de imagem direta
function converterUrlFoto(url) {
  if (!url || url.trim() === '') return '';
  
  // Se já é Google Drive direto, retorna como está
  if (url.includes('drive.google.com/uc?export=view')) return url;
  
  // Se é compartilhado do Drive, extrai o ID
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  
  return url;
}

async function carregar(){
  try{
    const res = await fetch(sheetCsvUrl, { cache:'no-store' });
    const txt = await res.text();
    const rows = txt.trim().split('\n'); 
    
    // Debug: mostrar cabeçalho
    console.log('Cabeçalho:', rows[0]);
    console.log('Primeira linha de dados:', rows[1]);
    
    rows.shift(); // cabeçalho
    itens = rows.map((line, idx) => {
      const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, "").trim());
      
      // Debug: mostrar TODAS as colunas da primeira linha
      if (idx === 0) {
        console.log('=== PRIMEIRA LINHA ===');
        cols.forEach((col, i) => {
          console.log(`Coluna ${i}: ${col}`);
        });
        console.log('Total de colunas:', cols.length);
      }
      
      const fotoUrl = converterUrlFoto(cols[15] || '');
      console.log(`Veículo: ${cols[1]} | Foto URL: ${fotoUrl}`);
      
      return {
        fz: (cols[0] || '').padStart(6, "0"),
        modelo: cols[1] || '',
        up: cols[2] || '',
        anoMod: cols[3] || '',
        valorTabela: parseFloat((cols[4] || '0').replace(/\./g,"").replace(/,/g,".")) || 0,
        patio: cols[12] || '',   // 13ª
        cor: cols[13] || '',     // 14ª
        variante: cols[14] || '', // 15ª
        fotoUrl: fotoUrl  // 16ª - CONVERTIDA
      };
    });
    render(itens);
  }catch(e){
    console.error('Erro ao carregar estoque:', e);
    groupsEl.innerHTML = '<div class="acc"><div class="acc-h"><div class="acc-title"><span>Erro</span></div></div><div class="acc-c"><div class="rows"><div class="row"><div>Não foi possível carregar o estoque.</div></div></div></div></div>';
  }
}

// Função para abrir modal com foto
function abrirFoto(fotoUrl, modelo) {
  console.log('Abrindo foto:', fotoUrl); // Debug
  
  if (!fotoUrl || fotoUrl.trim() === '') {
    alert('URL da foto não disponível');
    return;
  }
  
  const modal = document.createElement('div');
  modal.className = 'modal-foto';
  modal.innerHTML = `
    <div class="modal-conteudo">
      <button class="modal-fechar">&times;</button>
      <h3>${modelo}</h3>
      <img src="${fotoUrl}" alt="${modelo}" style="max-width: 100%; height: auto;" onerror="this.src='https://via.placeholder.com/400?text=Foto+não+disponível'">
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.modal-fechar').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

carregar();