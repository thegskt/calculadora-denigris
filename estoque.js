document.addEventListener('DOMContentLoaded', () => {

    /* =========================
     CONFIG
     ========================= */

  const sheetCsvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqk-5eBeAxB4GesiaM7W6iEUq9lgfTsRzdy1QylG1ak7dX35Ol827EM1c7LPWb97BoBh6iUbtJMMw"
    + "/pub?gid=2122951741&single=true&output=csv";
  
  const busca = document.getElementById('busca');
  const groupsEl = document.getElementById('groups');

  // proteção para outras páginas
  if (!busca || !groupsEl) return;

  let itens = [];
  const FAM_ORDER = ['Accelo','Atego','Actros','Axor','Arocs','Outros'];

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-menu');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // 🔑 impede interferência
    nav.classList.toggle('open');
  });

  // Fecha menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
    }
  });

  /* =========================
    HELPERS
  ========================= */
  function fmtBRL(v){
    if (isNaN(v)) return "R$ 0,00";
    return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  }

  function normFamily(modelo=''){
    const famRaw = modelo.trim().split(/\s+/)[0].toUpperCase();
    return ({
      ACCELO:'Accelo', ATEGO:'Atego', ACTROS:'Actros',
      AXOR:'Axor', AROCS:'Arocs'
    })[famRaw] || 'Outros';
  }

  function normSubModel(modelo=''){
    return modelo.split('/')[0].trim();
  }

  function groupByFamily(list){
    const map = new Map();
    list.forEach(it=>{
      const fam = normFamily(it.modelo);
      if(!map.has(fam)) map.set(fam,[]);
      map.get(fam).push(it);
    });
    return FAM_ORDER.filter(f=>map.has(f)).map(f=>({name:f,items:map.get(f)}));
  }

  function groupBySubModel(items){
    const map = new Map();
    items.forEach(it=>{
      const sub = normSubModel(it.modelo);
      if(!map.has(sub)) map.set(sub,[]);
      map.get(sub).push(it);
    });
    return [...map.entries()]
      .map(([name,items])=>({name,items}))
      .sort((a,b)=>(parseInt(a.name.match(/\d+/))||0)-(parseInt(b.name.match(/\d+/))||0));
  }

  /* =========================
    RENDER
  ========================= */
  function render(list){
    groupsEl.innerHTML = '';
    const groups = groupByFamily(list);

    groups.forEach(g=>{
      const acc = document.createElement('section');
      acc.className = 'acc';

      const h = document.createElement('div');
      h.className = 'acc-h';
      h.tabIndex = 0;
      h.innerHTML = `
        <div class="acc-title">
          <span>${g.name}</span>
          <span class="badge">${g.items.length}</span>
        </div>
        <span class="chev">▾</span>
      `;


      const c = document.createElement('div');
      c.className = 'acc-c';

      const cols = document.createElement('div');
      cols.className = 'cols';
      cols.innerHTML = `
        <div>Modelo</div><div>Cor</div><div>UP</div>
        <div>Var.</div><div>Ano</div>
        <div class="right">Valor Tabela</div><div>Ação</div>
      `;

    c.appendChild(cols);

    const rows = document.createElement('div');
    rows.className = 'rows';

    const subGroups = groupBySubModel(g.items);
    for (const sub of subGroups){
      const subAcc = document.createElement('div');
      subAcc.className = 'sub-acc';

    const subH = document.createElement('div');
    subH.className = 'sub-acc-h';
    subH.tabIndex = 0;

    subH.innerHTML = `
      <span>${sub.name} (${sub.items.length})</span>
      <span class="chev">▾</span>
    `;

      const subC = document.createElement('div');
      subC.className = 'sub-acc-c';

      const subRows = document.createElement('div');
      subRows.className = 'rows';

      for (const r of sub.items){
        const row = document.createElement('div');
        row.className = 'row';

        // Modelo (com botão "i" para detalhes)

      const cMod = document.createElement('div');
      cMod.className = 'modelo';
      const modTxt = document.createElement('span');
      modTxt.textContent = r.modelo;

      const infoBtn = document.createElement('button');
      infoBtn.className = 'chip-btn';
      infoBtn.textContent = 'i';
      infoBtn.onclick = e => {
        e.preventDefault();
        row.classList.toggle('show-meta');
      };
 cMod.append(modTxt, infoBtn);

          const cMeta = document.createElement('div');
          cMeta.className = 'meta';
          cMeta.style.gridColumn = '1 / -1';

          if (r.patio) cMeta.innerHTML += `<span class="chip"><b>Pátio</b> ${r.patio}</span>`;
          if (r.fz) cMeta.innerHTML += `<span class="chip"><b>FZ</b> ${r.fz}</span>`;

          if (r.fotoUrl){
            const btnFoto = document.createElement('button');
            btnFoto.className = 'chip chip-foto';
            btnFoto.textContent = '📷 Foto';
            btnFoto.onclick = () => abrirFoto(r.fotoUrl, r.modelo);
            cMeta.appendChild(btnFoto);
          }

          row.append(
            cMod,
            Object.assign(document.createElement('div'),{textContent:r.cor||'-'}),
            Object.assign(document.createElement('div'),{textContent:r.up,className:'up'}),
            Object.assign(document.createElement('div'),{textContent:r.variante||'-'}),
            Object.assign(document.createElement('div'),{textContent:r.anoMod}),
            Object.assign(document.createElement('div'),{textContent:fmtBRL(r.valorTabela),className:'right'}),
            Object.assign(document.createElement('div'),{innerHTML:`<a class="btn btn-primary" href="index.html?calc=proprio&fz=${r.fz}">Calcular</a>`}),
            cMeta
          );

          subRows.appendChild(row);
        }

        subC.appendChild(subRows);
        subAcc.append(subH, subC);
        rows.appendChild(subAcc);

        subH.onclick = ()=>subAcc.classList.toggle('open');
      }

      c.appendChild(rows);
      acc.append(h,c);
      groupsEl.appendChild(acc);

      h.onclick = ()=>acc.classList.toggle('open');
    });
  }
 /* =========================
     FILTRO + LOAD
  ========================= */
  busca.addEventListener('input', () => {
    const q = busca.value.toLowerCase();
    render(!q ? itens : itens.filter(r =>
      r.modelo.toLowerCase().includes(q) ||
      r.up.toLowerCase().includes(q) ||
      r.anoMod.toLowerCase().includes(q)
    ));
  });

  async function carregar(){
    const res = await fetch(sheetCsvUrl,{cache:'no-store'});
    const txt = await res.text();
    const rows = txt.trim().split('\n');
    rows.shift();

    itens = rows.map(l=>{
      const c = l.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v=>v.replace(/^"|"$/g,''));
      return {
        fz:c[0], modelo:c[1], up:c[2], anoMod:c[3],
        valorTabela:parseFloat(c[4].replace('.','').replace(',','.'))||0,
        cor:c[5], variante:c[6], patio:c[7],
        fotoUrl:c[8]
      };
    });

    render(itens);
  }

  function abrirFoto(url,modelo){
    const m=document.createElement('div');
    m.className='modal-foto';
    m.innerHTML=`<div class="modal-conteudo"><button>&times;</button><h3>${modelo}</h3><img src="${url}"></div>`;
    m.onclick=e=>e.target===m&&m.remove();
    m.querySelector('button').onclick=()=>m.remove();
    document.body.appendChild(m);
  }

  carregar();

});