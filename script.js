const usuarios = [
  { usuario: "lpereira", senha: "Dn@1234" },
  { usuario: "goliveira", senha: "162134" },
  { usuario: "mferreira", senha: "Dn@1234" },
  { usuario: "lrocha", senha: "Dn@1234" },
  { usuario: "lgallo", senha: "Dn@1234" },
];

function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;
  const autorizado = usuarios.some(user => user.usuario === u && user.senha === p);
  if (autorizado) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
  } else {
    document.getElementById("loginError").innerText = "Usuário ou senha inválidos";
  }
}

    // Elementos principais
    const fzEl              = document.getElementById("fz");
    const fzErrorEl         = document.getElementById("fzError");
    const modeloEl          = document.getElementById("modelo");
    const upEl              = document.getElementById("up");
    const anoModEl          = document.getElementById("anoMod");
    const valorTabelaEl     = document.getElementById("valorTabela");
    const descontoEl        = document.getElementById("desconto");
    const descontoReaisEl   = document.getElementById("descontoReais");
    const valorVendaEl      = document.getElementById("valorVenda");
    const comissaoEl        = document.getElementById("comissaoProtected");
    const dsrEl             = document.getElementById("dsrProtected");
    const totalEl           = document.getElementById("total");
    const rowCom            = document.getElementById("rowComissaoProtected");
    const rowDsr            = document.getElementById("rowDsrProtected");
    const rowTotal          = document.getElementById("rowTotalProtected");
    const btnMost           = document.getElementById("btnMostrarProtegido");
    const pwdGrp            = document.getElementById("passwordGroup");
    const pwdIn             = document.getElementById("senhaInput");
    const btnVer            = document.getElementById("btnVerificarSenha");
    const pwdErr            = document.getElementById("senhaError");

    let valorTabela = 0;
    let vendedorAtual = null;
    const vendedores = {};

    function formatar(v) {
      return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function atualizarValores() {
      let d = parseFloat(descontoEl.value) || 0;
      if (d > 3) { alert("Desconto máximo de 3%"); d = 3; descontoEl.value = 3; }
      // Arredonda desconto para 2 casas decimais
    const valorDesc = arredondaCentenaBaixo(valorTabela * (d / 100));
    const valorVenda = +(valorTabela - valorDesc).toFixed(2);
      let lucroBruto = 0, comissao = 0, dsr = 0, total = 0;

      if (vendedorAtual) {
        const receitaEfetiva = +(valorVenda - (valorVenda * 0.12)).toFixed(2);
        const custoEfetivo = +((vendedorAtual.valorCompra || 0) - ((vendedorAtual.valorCompra || 0) * 0.12)).toFixed(2);
        lucroBruto =
          (receitaEfetiva - custoEfetivo)
          + (vendedorAtual.fundoEstrela || 0)
          + (vendedorAtual.retirada || 0)
          + (vendedorAtual.programacao || 0)
          - (vendedorAtual.frete || 0)
          - (vendedorAtual.revisao || 0)
          - (vendedorAtual.custosAdd || 0);

        comissao = +(lucroBruto * 0.09).toFixed(2);
        dsr = +(comissao * 0.15).toFixed(2);
        total = +(comissao + dsr).toFixed(2);
      }

      descontoReaisEl.innerText = formatar(valorDesc);
      valorVendaEl.innerText    = formatar(valorVenda);
      comissaoEl.innerText      = formatar(comissao);
      dsrEl.innerText           = formatar(dsr);
      totalEl.innerText         = formatar(total);
    }
    // Função para arredondar para a centena mais próxima
    function arredondaCentenaBaixo(valor) {
      return Math.floor(valor / 100) * 100;
    }

    const sheetCsvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqk-5eBeAxB4GesiaM7W6iEUq9lgfTsRzdy1QylG1ak7dX35Ol827EM1c7LPWb97BoBh6iUbtJMMw"
      + "/pub?gid=2122951741&single=true&output=csv";

    async function carregarDados() {
      try {
        const res = await fetch(sheetCsvUrl);
        const txt = await res.text();
        txt.trim().split("\n").slice(1).forEach(line => {
          const cols = line
            .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
            .map(c => c.replace(/^"|"$/g, "").trim());
          const fzKey = cols[0].padStart(6, "0");
          vendedores[fzKey] = {
            modelo: cols[1],
            up:     cols[2],
            anoMod: cols[3],
            valorTabela: parseFloat(cols[4].replace(/\./g, "").replace(/,/g, ".")),
            valorCompra: parseFloat(cols[5].replace(/\./g, "").replace(/,/g, ".")),
            fundoEstrela: parseFloat(cols[6].replace(/\./g, "").replace(/,/g, ".")),
            retirada: parseFloat(cols[7].replace(/\./g, "").replace(/,/g, ".")),
            programacao: parseFloat(cols[8].replace(/\./g, "").replace(/,/g, ".")),
            frete: parseFloat(cols[9].replace(/\./g, "").replace(/,/g, ".")),
            revisao: parseFloat(cols[10].replace(/\./g, "").replace(/,/g, ".")),
            custosAdd: parseFloat(cols[11].replace(/\./g, "").replace(/,/g, "."))
          };
        });
      } catch (err) {
        console.error("Erro ao carregar CSV:", err);
      }
    }

    fzEl.addEventListener("input", () => {
      const raw = fzEl.value.replace(/\D/g, "").slice(0, 6);
      fzEl.value = raw;
      const key = raw.padStart(6, "0");

      if (vendedores[key]) {
        vendedorAtual = vendedores[key];
        modeloEl.innerText     = vendedorAtual.modelo;
        upEl.innerText         = vendedorAtual.up;
        anoModEl.innerText     = vendedorAtual.anoMod;
        valorTabela            = vendedorAtual.valorTabela;
        valorTabelaEl.innerText = formatar(valorTabela);
        fzErrorEl.innerText    = "";
        atualizarValores();
      } else {
        modeloEl.innerText     = "–";
        upEl.innerText         = "–";
        anoModEl.innerText     = "–";
        valorTabelaEl.innerText = "R$ 0,00";
        fzErrorEl.innerText    = "FZ não encontrado";
        vendedorAtual          = null;
        atualizarValores();
      }
    });

    descontoEl.addEventListener("input", atualizarValores);

    let detalhesVisiveis = false;

    btnMost.addEventListener("click", () => {
      if (!detalhesVisiveis) {
        pwdGrp.classList.remove("hidden");
        pwdIn.value = "";
        pwdErr.innerText = "";
        pwdIn.focus();
      } else {
        // Oculta os campos protegidos
        rowCom.classList.add("hidden");
        rowDsr.classList.add("hidden");
        rowTotal.classList.add("hidden");
        detalhesVisiveis = false;
        btnMost.innerText = "Detalhamento";
      }
    });

    btnVer.addEventListener("click", () => {
      if (pwdIn.value === "Luciano@321") {
        rowCom.classList.remove("hidden");
        rowDsr.classList.remove("hidden");
        rowTotal.classList.remove("hidden");
        pwdGrp.classList.add("hidden");
        pwdErr.innerText = "";
        detalhesVisiveis = true;
        btnMost.innerText = "Ocultar Detalhamento";
      } else {
        pwdErr.innerText = "Senha incorreta";
      }
    });

    document.getElementById('btnEstoqueProprio').onclick = function() {
      document.getElementById('calcEstoqueProprio').classList.remove('hidden');
      document.getElementById('calcEstoqueFabrica').classList.add('hidden');
    };
    document.getElementById('btnEstoqueFabrica').onclick = function() {
      document.getElementById('calcEstoqueProprio').classList.add('hidden');
      document.getElementById('calcEstoqueFabrica').classList.remove('hidden');
    };

    // Enter para login
    document.getElementById("pass").addEventListener("keydown", function(e){
      if(e.key === "Enter") login();
    });
    // Enter para senha protegida
    pwdIn.addEventListener("keydown", function(e){
      if(e.key === "Enter") btnVer.click();
    });

    carregarDados();