document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     CONFIG
     ========================= */
  const sheetCsvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqk-5eBeAxB4GesiaM7W6iEUq9lgfTsRzdy1QylG1ak7dX35Ol827EM1c7LPWb97BoBh6iUbtJMMw" +
    "/pub?gid=2122951741&single=true&output=csv";

  const busca = document.getElementById('busca');
  const groupsEl = document.getElementById('groups');

  // Se não estiver na página de estoque, sai silenciosamente
  if (!busca || !groupsEl) return;

  let itens = [];
  const FAM_ORDER = ['Accelo','Atego','Actros','Axor','Arocs','Outros'];

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

      groupBySubModel(g.items).forEach(sub=>{
        const subAcc = document.createElement('div');
        subAcc.className = 'sub-acc';

        const subH = document.createElement('div');
        subH.className = 'sub-acc-h';
        subH.tabIndex = 0;
        subH.innerHTML = `<span>${sub.name} (${sub.items.length})</span><span class="chev">▾</span>`;

        const subC = document.createElement('div');
        subC.className = 'sub-acc-c';

        const subRows = document.createElement('div');
        subRows.className = 'rows';

        sub.items.forEach(r=>{
          const row = document.createElement('div');
          row.className = 'row';
          row.innerHTML = `
            <div data-label="Modelo">${r.modelo}</div>
            <div data-label="Cor">${r.cor||'-'}</div>
            <div data-label="UP" class="up">${r.up}</div>
            <div data-label="Var.">${r.variante||'-'}</div>
            <div data-label="Ano">${r.anoMod}</div>
            <div data-label="Valor Tabela" class="right">${fmtBRL(r.valorTabela)}</div>
            <div>
              <a class="btn btn-primary" href="index.html?calc=proprio&fz=${encodeURIComponent(r.fz)}">Calcular</a>
            </div>
          `;
          subRows.appendChild(row);
        });

        subC.appendChild(subRows);
        subAcc.append(subH, subC);
        rows.appendChild(subAcc);

        subH.onclick = ()=>subAcc.classList.toggle('open');
      });

      c.appendChild(rows);
      acc.append(h,c);
      groupsEl.appendChild(acc);

      h.onclick = ()=>acc.classList.toggle('open');
    });
  }

  /* =========================
     FILTRO
     ========================= */
  function filtrar(){
    const q = busca.value.toLowerCase().trim();
    if(!q){ render(itens); return; }

    const qNum = q.replace(/\D/g,'');
    render(itens.filter(r =>
      r.fz.includes(qNum) ||
      r.modelo.toLowerCase().includes(q) ||
      r.up.toLowerCase().includes(q) ||
      r.anoMod.toLowerCase().includes(q) ||
      (r.cor||'').toLowerCase().includes(q) ||
      (r.variante||'').toLowerCase().includes(q)
    ));
  }

  busca.addEventListener('input', filtrar);

  /* =========================
     LOAD CSV
     ========================= */
  async function carregar(){
    try{
      const res = await fetch(sheetCsvUrl,{cache:'no-store'});
      const txt = await res.text();
      const rows = txt.trim().split('\n');
      rows.shift();

      itens = rows.map(line=>{
        const c = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v=>v.replace(/^"|"$/g,''));
        return {
          fz:(c[0]||'').padStart(6,'0'),
          modelo:c[1]||'',
          up:c[2]||'',
          anoMod:c[3]||'',
          valorTabela:parseFloat((c[4]||'0').replace(/\./g,'').replace(',','.'))||0,
          cor:c[5]||'',
          variante:c[6]||'',
          patio:c[7]||''
        };
      });

      render(itens);
    }catch(e){
      console.error(e);
      groupsEl.innerHTML = '<p>Erro ao carregar estoque.</p>';
    }
  }

  carregar();

});
