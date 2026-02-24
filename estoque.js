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

  // NOVA FUNÇÃO: Ajuda a criar as colunas já com o data-label para o CSS do mobile funcionar!
  function criarColuna(texto, label, className = '') {
    const div = document.createElement('div');
    if (texto instanceof HTMLElement) {
      div.appendChild(texto);
    } else {
      div.textContent = texto;
    }
    if (label) div.dataset.label = label;
    if (className) div.className = className;
    return div;
  }

  /* =========================
   RENDER
  ========================= */
  function render(list){
    groupsEl.innerHTML = '';
    
    // Se a busca não encontrou nada
    if (list.length === 0) {
      groupsEl.innerHTML = '<div style="text-align:center; padding: 2rem; color: #64738a;">Nenhum veículo encontrado.</div>';
      return;
    }

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

          // Meta dados (FZ, Pátio, Foto)
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

          // Botão Calcular
          const btnCalcular = document.createElement('a');
          btnCalcular.className = 'btn btn-primary';
          btnCalcular.href = `index.html?calc=proprio&fz=${r.fz}`;
          btnCalcular.textContent = 'Calcular';

          // Montando a linha usando a função helper para injetar os data-labels
          row.append(
            cMod,
            criarColuna(r.cor || '-', 'Cor'),
            criarColuna(r.up, 'UP', 'up'),
            criarColuna(r.variante || '-', 'Variante'),
            criarColuna(r.anoMod, 'Ano'),
            criarColuna(fmtBRL(r.valorTabela), 'Valor Tabela', 'right'),
            criarColuna(btnCalcular, 'Ação'),
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
    const q = busca.value.toLowerCase().trim();
    render(!q ? itens : itens.filter(r =>
      r.modelo.toLowerCase().includes(q) ||
      r.up.toLowerCase().includes(q) ||
      r.anoMod.toLowerCase().includes(q) ||
      (r.fz && r.fz.toLowerCase().includes(q)) // Agora busca por FZ também!
    ));
  });

  async function carregar(){
    // Mostra o loading antes de buscar os dados
    groupsEl.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; padding: 3rem 1rem;">
        <div class="loading-spinner"></div>
        <p style="margin-top: 1rem; color: #64738a; font-weight: 600;">Sincronizando estoque...</p>
      </div>
    `;

    try {
      const res = await fetch(sheetCsvUrl,{cache:'no-store'});
      const txt = await res.text();
      const rows = txt.trim().split('\n');
      rows.shift();

      itens = rows.map(l=>{
        const c = l.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v=>v.replace(/^"|"$/g,''));
        return {
          fz:c[0], modelo:c[1], up:c[2], anoMod:c[4],
          valorTabela:parseFloat(c[8].replace('.','').replace(',','.'))||0,
          cor:c[9], variante:c[10], patio:c[11],
          fotoUrl:c[22]
        };
      });

      render(itens);
    } catch (error) {
      groupsEl.innerHTML = '<div style="text-align:center; padding: 2rem; color: #ef4444;">Erro ao carregar o estoque. Verifique sua conexão.</div>';
    }
  }

  function abrirFoto(url,modelo){
    const m=document.createElement('div');
    m.className='modal-foto'; // Já usando a classe que você estilizou
    m.innerHTML=`<div class="modal-conteudo"><button class="modal-fechar">&times;</button><h3>${modelo}</h3><img src="${url}"></div>`;
    m.onclick=e=>e.target===m&&m.remove();
    m.querySelector('button').onclick=()=>m.remove();
    document.body.appendChild(m);
  }

  carregar();

});