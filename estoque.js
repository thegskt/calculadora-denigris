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
  /* =========================
   RENDER (Versão Card Premium)
  ========================= */
  /* =========================
   RENDER (Versão Card com Botão "i")
  ========================= */
  function render(list){
    groupsEl.innerHTML = '';
    
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
        subRows.className = 'card-grid';

        for (const r of sub.items){
          const card = document.createElement('div');
          card.className = 'vehicle-card';

          // 1. Header do Card (Modelo + Botões da Direita)
          const cardHeader = document.createElement('div');
          cardHeader.className = 'card-header-flex';
          
          const titleDiv = document.createElement('div');
          titleDiv.className = 'modelo-title';
          titleDiv.textContent = r.modelo;
          cardHeader.appendChild(titleDiv);

          // Container para os botões (Foto e Informação)
          const headerActions = document.createElement('div');
          headerActions.style.display = 'flex';
          headerActions.style.gap = '8px';

          if (r.fotoUrl) {
            const btnFoto = document.createElement('button');
            btnFoto.className = 'btn-icon-foto';
            btnFoto.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`;
            btnFoto.onclick = (e) => {
                e.stopPropagation();
                abrirFoto(r.fotoUrl, r.modelo);
            };
            headerActions.appendChild(btnFoto);

            // 2. NOVO: Botão do WhatsApp (Só aparece se tiver foto)
            const textoZap = `*OPORTUNIDADE*\n\n*Modelo:* ${r.modelo}\n*Ano:* ${r.anoMod} | *Cor:* ${r.cor || '-'}\n\n*Veja a foto do veículo:* ${r.fotoUrl}`;
            
            const btnZap = document.createElement('a');
            btnZap.className = 'btn-icon-whatsapp';
            // encodeURIComponent garante que espaços e quebras de linha funcionem no link
            btnZap.href = `https://wa.me/?text=${encodeURIComponent(textoZap)}`;
            btnZap.target = '_blank'; // Abre em nova aba/app
            btnZap.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
            
            // Impede que o clique no link feche o card sem querer
            btnZap.onclick = (e) => e.stopPropagation();
            
            headerActions.appendChild(btnZap);
          }

          // Criando o botão "i"
          const infoBtn = document.createElement('button');
          infoBtn.className = 'chip-btn';
          infoBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
          infoBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            card.classList.toggle('show-meta'); 
          };
          headerActions.appendChild(infoBtn);
          
          cardHeader.appendChild(headerActions);

          // 2. Área Oculta (Meta) que só aparece ao clicar no "i"
          const cMeta = document.createElement('div');
          cMeta.className = 'meta tags-container';
          
          if (r.fz) cMeta.innerHTML += `<span class="tag tag-fz">FZ: ${r.fz}</span>`;
          if (r.patio) cMeta.innerHTML += `<span class="tag tag-patio">Pátio: ${r.patio}</span>`;

          // === NOVO: OBSERVAÇÃO DENTRO DO "i" ===
          // Se tiver um '*' na UP ou texto na coluna Obs (D), ele cria o aviso aqui dentro
          if ((r.up && r.up.includes('*')) || (r.obs && r.obs.trim() !== '')) {
            const textoObs = r.obs ? r.obs.trim() : 'Veículo com observação na UP (consulte).';
            cMeta.innerHTML += `<div class="obs-inline"><strong>OBS:</strong> ${textoObs}</div>`;
          }
          // ======================================

          // 3. Grid de Detalhes 2x2
          const detailsGrid = document.createElement('div');
          detailsGrid.className = 'details-grid';
          detailsGrid.append(
            criarColuna(r.cor || '-', 'Cor'),
            criarColuna(r.anoMod, 'Ano'),
            criarColuna(r.up, 'UP', 'up'),
            criarColuna(r.variante || '-', 'Var')
          );

          // === NOVO: CAIXA DE OBSERVAÇÃO ===
          // Verifica se a UP tem um '*' ou se a coluna obs tem algum texto
          let obsDiv = null;
          if ((r.up && r.up.includes('*')) || (r.obs && r.obs.trim() !== '')) {
            obsDiv = document.createElement('div');
            obsDiv.className = 'obs-alert';
            obsDiv.innerHTML = `<strong>Obs:</strong> ${r.obs || 'Veículo com observação (consulte).'}`;
          }
          // ==================================

          // 4. Preço em Destaque Absoluto
          const priceDiv = document.createElement('div');
          priceDiv.className = 'price-highlight';
          priceDiv.innerHTML = `<span class="price-label">Valor Tabela</span><span class="price-value">${fmtBRL(r.valorTabela)}</span>`;

          // 5. Botão Full Width
          const actionDiv = document.createElement('div');
          actionDiv.className = 'action-full';
          const btnCalcular = document.createElement('a');
          btnCalcular.className = 'btn btn-primary btn-block';
          btnCalcular.href = `index.html?calc=proprio&fz=${r.fz}`;
          btnCalcular.textContent = 'Calcular';
          actionDiv.appendChild(btnCalcular);

          // Empacota tudo dentro do Card (Adicionando a obsDiv se ela existir)
          card.append(cardHeader, cMeta, detailsGrid);
          if (obsDiv) card.append(obsDiv); // Coloca o alerta logo abaixo do grid e acima do preço!
          card.append(priceDiv, actionDiv);
          
          subRows.appendChild(card);
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
          fz:c[0], modelo:c[1], up:c[2], 
          obs: c[3], // <-- ADICIONAMOS A COLUNA D AQUI
          anoMod:c[4],
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