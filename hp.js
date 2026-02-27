// Funções de formatação e limpeza
function formatarBRL(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function limparMoeda(texto) {
  if (!texto) return 0;
  return parseFloat(texto.replace(/\./g, '').replace(',', '.')) || 0;
}

// Máscara de dinheiro para os inputs
function aplicarMascaraDinheiro(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value === "") { e.target.value = ""; return; }
  value = (parseInt(value) / 100).toFixed(2);
  let partes = value.split(".");
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  e.target.value = partes[0] + "," + partes[1];
}

document.getElementById('hpValor').addEventListener('input', aplicarMascaraDinheiro);
document.getElementById('hpEntrada').addEventListener('input', aplicarMascaraDinheiro);

// O Motor da HP-12C (Fórmula Price)
document.getElementById('btnCalcularHP').addEventListener('click', () => {
  const valorTotal = limparMoeda(document.getElementById('hpValor').value);
  const entrada = limparMoeda(document.getElementById('hpEntrada').value);
  const taxaTexto = document.getElementById('hpTaxa').value.replace(',', '.');
  
  const taxa = parseFloat(taxaTexto) || 0;
  const meses = parseInt(document.getElementById('hpPrazo').value) || 0;

  if (valorTotal <= 0 || meses <= 0 || taxa <= 0) {
    alert("Preencha o Valor do Caminhão, a Taxa e o Prazo corretamente.");
    return;
  }

  // 1. Calcula o Valor Financiado (PV)
  const valorFinanciado = valorTotal - entrada;

  // 2. Transforma a taxa mensal para decimal (ex: 1.5% -> 0.015)
  const i = taxa / 100;

  // 3. Fórmula da Parcela (PMT) - A mesma usada na HP-12C
  // PMT = PV * (i * (1 + i)^n) / ((1 + i)^n - 1)
  const fator = Math.pow(1 + i, meses);
  const parcela = valorFinanciado * ((i * fator) / (fator - 1));

  // 4. Mostra os resultados na tela
  document.getElementById('hpFinanciado').textContent = formatarBRL(valorFinanciado);
  document.getElementById('hpParcela').textContent = formatarBRL(parcela);
  
  // Exibe a caixa verde linda
  document.getElementById('hpResultadoArea').classList.remove('hidden');
});