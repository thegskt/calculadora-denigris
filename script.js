// =============================================================================
// 1. CONFIGURAÇÕES E DADOS GLOBAIS
// =============================================================================

const sheetCsvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqk-5eBeAxB4GesiaM7W6iEUq9lgfTsRzdy1QylG1ak7dX35Ol827EM1c7LPWb97BoBh6iUbtJMMw/pub?gid=2122951741&single=true&output=csv";

// Variáveis de Estado
const vendedores = {}; 
let vendedorAtual = null;
let dadosCarregados = false;
let pendingFZ = null;
const fabPrecosPorAno = {};

// =============================================================================
// 2. ELEMENTOS DO DOM (DEFINIDOS NO TOPO PARA EVITAR ERROS)
// =============================================================================
const els = id => document.getElementById(id);

// Elementos Globais
const fzEl            = els("fz");
const fzErrorEl       = els("fzError");
const modeloEl        = els("modelo");
const upEl            = els("up");
const anoModEl        = els("anoMod");
const valorTabelaEl   = els("valorTabela");
const descontoEl      = els("desconto");
const descontoReaisEl = els("descontoReais");
const valorVendaEl    = els("valorVenda");
const comissaoEl      = els("comissaoProtected");
const dsrEl           = els("dsrProtected");
const totalEl         = els("total");

const btnVerInfoEl    = els("btnVerInfo");
const infoVeiculoEl   = els("infoVeiculo");
const infoCorEl       = els("infoCor");
const infoVarianteEl  = els("infoVariante");
const infoPatioEl     = els("infoPatio");

// Elementos de Fábrica
const modeloFabEl     = els("modeloFab");
const upFabEl         = els("upFab");
const anoFabEl        = els("anoModeloFab");
const familiaFabEl    = els("familiaFab"); 
const varianteFabEl   = els("varianteFab");
const acaoFabEl       = els("acaoFab");    

// Elementos de Observação
const obsContainerEl  = els("obs-container");
const obsTextoEl      = els("obs-texto");

// Elementos de Navegação/Abas
const btnProprio      = els('btnEstoqueProprio');
const btnFabrica      = els('btnEstoqueFabrica');
const calcProprio     = els('calcEstoqueProprio');
const calcFabrica     = els('calcEstoqueFabrica');

// Elementos Especiais/Senha
const tipoPreco          = els('tipoPreco');
const especialWrapper    = els('especialWrapper'); 
const precoEspecial      = els('precoEspecial');
const precoEspecialInput = els('precoEspecial'); 
const btnMostrarProtegido = els('btnMostrarProtegido');
const passwordGroup       = els('passwordGroup');
const senhaInput          = els('senhaInput');
const btnVerificarSenha   = els('btnVerificarSenha');
const senhaError          = els('senhaError');
const rowComissaoProtected = els('rowComissaoProtected');
const rowDsrProtected      = els('rowDsrProtected');
const rowTotalProtected    = els('rowTotalProtected');


// =============================================================================
// 3. DADOS ESTÁTICOS (VARIANTES E AÇÕES)
// =============================================================================

const variantesFab = {
'ACCELO 1317/39UPF25/25': '1035T',
'ACCELO 1317/39UPG25/25': '1038T',
'ACCELO 1317/46UPF25/25': '1033T',
'ATEGO 2429/48UPB25/25': '3938T',
'ATEGO 2433/54 6X2UPF25/25': '0834T',
'ATEGO 2730/48 6X4UPB25/25': '4711T',
'ACTROS 2045 S/36 4X2UPI25/25': '2580T',
'ACTROS 2045 LS/36 4X2UPH25/25': '2476T',
'ACTROS 2045 LS/36 4X2UPI25/25': '2475T',
'ACTROS 2045 LS/36 4X2UPJ25/25': '2499T',
'ACTROS 2548 LS/33 6X2UPI25/25': '12106T',
'ACTROS 2653 LS/36 6X4UPI25/25': '7207T',
'AROCS 3351 S/33 6X4UPE25/25': '2631T',
'AROCS 3351 S/33 6X4UPG25/25': '2632T',
'ACCELO 917/39UPA25/26': '00194T',
'ACCELO 917/39UPF25/26': '00195T',
'ACCELO 917/46UPA25/26': '00196T',
'ACCELO 917/46UPF25/26': '00193T',
'ACCELO 1117/46UPF25/26': '0388T',
'ATEGO 2429/48 6X2UPB25/26': '3857T',
'ATEGO 2433/54 6X2UPF25/26': '1097T',
'ATEGO 3033/63 8X2UPI25/26': '1793T',
'ATEGO 2730/48 6X4UPE25/26': '5007T',
'ATEGO 2730 B/36 6X4UPE25/26': '5012T',
'ATEGO 2730 K/36 6X4UPB25/26': '4726T',
'ATEGO 2730 K/36 6X4UPE25/26': '5013T',
'ATEGO 3330 K/46 8X4UPF25/26': '1110T',
'ATEGO 3133/48 6X4UPE25/26': '0580T',
'ATEGO 3133/48 6X4UPF25/26': '0587T',
'ATEGO 1933 LS/36UPI25/26': '2628T',
'AXOR 2038 S/36UPI25/26': '0159T',
'AXOR 2545 S/36UPI25/26': '0564T',
'ACTROS 2553 LS/36 6X2UPH25/26': '2578T',
'ACTROS 2553 LS/36 6X2UPI25/26': '2563T',
'ACTROS 2553 LS/36 6X2UPJ25/26': '2577T',
'AROCS 3353 S/33 6X4UPG25/26': '0513T',
'ACCELO 817/39UPA26/26': '02171T',
'ACCELO 817/46UPA26/26': '02170T',
'ACCELO 917/31UPA26/26': '00132T',
'ACCELO 917/31UPF26/26': '00197T',
'ACCELO 917/39UPA26/26': '00194T',
'ACCELO 917/39UPF26/26': '00195T',
'ACCELO 917/46UPA26/26': '00196T',
'ACCELO 917/46UPF26/26': '00193T',
'ACCELO 1117/31UPA26/26': '0379T',
'ACCELO 1117/31UPF26/26': '0407T',
'ACCELO 1117/31UPG26/26': '0404T',
'ACCELO 1117/39UPA26/26': '0375T',
'ACCELO 1117/39UPF26/26': '0401T',
'ACCELO 1117/39UPG26/26': '0237T',
'ACCELO 1117/46UPA26/26': '0377T',
'ACCELO 1117/46UPF26/26': '0388T',
'ACCELO 1117/46UPG26/26': '0244T',
'ACCELO 1417/39UPA26/26': '0230T',
'ACCELO 1417/39UPF26/26': '0238T',
'ACCELO 1417/39UPG26/26': '0235T',
'ACCELO 1417/39UPH26/26': '0232T',
'ACCELO 1417/46UPA26/26': '0233T',
'ACCELO 1417/46UPF26/26': '0244T',
'ACCELO 1417/46UPG26/26': '0188T',
'ACCELO 1417/46UPH26/26': '0178T',
'ATEGO 1419/48UPB26/26': '3574T',
'ATEGO 1419/48UPC26/26': '3572T',
'ATEGO 1419/48UPD26/26': '3645T',
'ATEGO 1419/48UPF26/26': '3571T',
'ATEGO 1719/36UPB26/26': '8816T',
'ATEGO 1719/48UPB26/26': '9149T',
'ATEGO 1719/48UPC26/26': '8827T',
'ATEGO 1719/48UPD26/26': '8930T',
'ATEGO 1719/48UPE26/26': '8946T',
'ATEGO 1719/48UPF26/26': '8821T',
'ATEGO 1719/54UPD26/26': '8992T',
'ATEGO 1726/48UPB26/26': '10138T',
'ATEGO 1726/48UPC26/26': '10136T',
'ATEGO 1726/48UPD26/26': '10342T',
'ATEGO 1726/48UPE26/26': '10327T',
'ATEGO 1726/48UPF26/26': '10135T',
'ATEGO 1726/54UPF26/26': '10140T',
'ATEGO 1726/54UPI26/26': '9532T',
'ATEGO 1729/39S/P26/26': '2164CTT',
'ATEGO 1733/48UPF26/26': '0348T',
'ATEGO 2429/48 6X2UPB26/26': '4038T',
'ATEGO 2429/48 6X2UPC26/26': '3860T',
'ATEGO 2429/48 6X2UPD26/26': '3887T',
'ATEGO 2429/48 6X2UPF26/26': '3853T',
'ATEGO 2429/54 6X2UPD26/26': '3909T',
'ATEGO 2429/54 6X2UPF26/26': '3864T',
'ATEGO 2429/54 6X2UPH26/26': '3932T',
'ATEGO 2429/54 6X2UPI26/26': '3838T',
'ATEGO 2433/48 6X2UPB26/26': '1176T',
'ATEGO 2433/48 6X2UPC26/26': '1093T',
'ATEGO 2433/48 6X2UPD26/26': '1154T',
'ATEGO 2433/48 6X2UPF26/26': '1090T',
'ATEGO 2433/54 6X2UPD26/26': '1189T',
'ATEGO 2433/54 6X2UPF26/26': '1097T',
'ATEGO 2433/54 6X2UPH26/26': '1100T',
'ATEGO 2433/54 6X2UPI26/26': '1086T',
'ATEGO 3033/48 8X2UPB26/26': '1960T',
'ATEGO 3033/48 8X2UPD26/26': '2016T',
'ATEGO 3033/48 8X2UPF26/26': '1797T',
'ATEGO 3033/54 8X2UPD26/26': '1801T',
'ATEGO 3033/54 8X2UPF26/26': '1807T',
'ATEGO 3033/54 8X2UPH26/26': '1843T',
'ATEGO 3033/54 8X2UPI26/26': '1788T',
'ATEGO 3033/63 8X2UPD26/26': '1868T',
'ATEGO 3033/63 8X2UPF26/26': '1814T',
'ATEGO 3033/63 8X2UPH26/26': '1816T',
'ATEGO 3033/63 8X2UPI26/26': '1793T',
'ATEGO 2730/48 6X4UPB26/26': '5015T',
'ATEGO 2730/48 6X4UPE26/26': '5007T',
'ATEGO 2730/48 6X4UPF26/26': '5005T',
'ATEGO 2730 B/36 6X4UPB26/26': '5018T',
'ATEGO 2730 B/36 6X4UPE26/26': '5012T',
'ATEGO 2730 B/36 6X4UPF26/26': '5009T',
'ATEGO 2730 K/36 6X4UPB26/26': '5019T',
'ATEGO 2730 K/36 6X4UPE26/26': '5013T',
'ATEGO 2730 K/36 6X4UPF26/26': '5010T',
'ATEGO 3330/54 8X4UPB26/26': '1112T',
'ATEGO 3330/54 8X4UPE26/26': '1108T',
'ATEGO 3330/54 8X4UPF26/26': '1128T',
'ATEGO 3330 B/46 8X4UPB26/26': '1115T',
'ATEGO 3330 B/46 8X4UPE26/26': '1111T',
'ATEGO 3330 B/46 8X4UPF26/26': '1109T',
'ATEGO 3330 K/46 8X4UPB26/26': '1116T',
'ATEGO 3330 K/46 8X4UPE26/26': '1123T',
'ATEGO 3330 K/46 8X4UPF26/26': '1110T',
'ATEGO 3133/48 6X4UPD26/26': '0585T',
'ATEGO 3133/48 6X4UPE26/26': '0580T',
'ATEGO 3133/48 6X4UPF26/26': '0587T',
'ATEGO 3133/48 6X4UPG26/26': '0586T',
'ATEGO 1933 LS/36UPF26/26': '2649T',
'ATEGO 1933 LS/36UPH26/26': '2635T',
'ATEGO 1933 LS/36UPI26/26': '2772T',
'AXOR 2038 S/36UPH26/26': '0160T',
'AXOR 2038 S/36UPI26/26': '0211T',
'AXOR 2538 S/36UPH26/26': '0050T',
'AXOR 2538 S/36UPI26/26': '0044T',
'AXOR 2545 S/36UPH26/26': '0682T',
'AXOR 2545 S/36UPI26/26': '0679T',
'AXOR 2545LS/36 6X2E6UPH26/26': '0640C',
'AXOR 2545LS/36 6X2E6UPI26/26': '0635C',
'ACTROS 2045 S/36 4X2UPH26/26': '2893T',
'ACTROS 2045 S/36 4X2UPI26/26': '2905T',
'ACTROS 2045 S/36 4X2UPJ26/26': '2836T',
'ACTROS 2045 LS/36 4X2UPH26/26': '2921T',
'ACTROS 2045 LS/36 4X2UPI26/26': '2894T',
'ACTROS 2045 LS/36 4X2UPJ26/26': '2913T',
'ACTROS 2548 S/36 6X2UPH26/26': '13115T',
'ACTROS 2548 S/36 6X2UPI26/26': '13078T',
'ACTROS 2548 S/36 6X2UPJ26/26': '13096T',
'ACTROS 2548 LS/33 6X2UPH26/26': '13079T',
'ACTROS 2548 LS/33 6X2UPI26/26': '13127T',
'ACTROS 2548 LS/33 6X2UPJ26/26': '13199T',
'ACTROS 2548 LS/36 6X2UPH26/26': '13140T',
'ACTROS 2548 LS/36 6X2UPI26/26': '13075T',
'ACTROS 2548 LS/36 6X2UPJ26/26': '13134T',
'ACTROS 2651 S/36 6X4UPH26/26': '15028T',
'ACTROS 2651 S/36 6X4UPI26/26': '15000T',
'ACTROS 2651 S/36 6X4UPJ26/26': '14999T',
'ACTROS 2651 LS/36 6X4UPH26/26': '14683T',
'ACTROS 2651 LS/36 6X4UPI26/26': '15072T',
'ACTROS 2651 LS/36 6X4UPJ26/26': '14696T',
'ACTROS 2553 S/36 6X2UPH26/26': '2709T',
'ACTROS 2553 S/36 6X2UPI26/26': '2561T',
'ACTROS 2553 S/36 6X2UPJ26/26': '2584T',
'ACTROS 2553 LS/36 6X2UPH26/26': '2578T',
'ACTROS 2553 LS/36 6X2UPI26/26': '2563T',
'ACTROS 2553 LS/36 6X2UPJ26/26': '2576T',
'ACTROS 2653 S/36 6X4UPH26/26': '8443T',
'ACTROS 2653 S/36 6X4UPI26/26': '8216T',
'ACTROS 2653 S/36 6X4UPJ26/26': '8222T',
'ACTROS 2653 LS/36 6X4UPH26/26': '7211T',
'ACTROS 2653 LS/36 6X4UPI26/26': '8228T',
'ACTROS 2653 LS/36 6X4UPJ26/26': '8227T',
'AROCS 3351/48 6X4UPE26/26': '2788T',
'AROCS 3351/48 6X4UPF26/26': '2786T',
'AROCS 3351 K/36 6X4UPE26/26': '2793T',
'AROCS 3351 K/36 6X4UPF26/26': '2791T',
'AROCS 3351 S/33 6X4UPE26/26': '2858T',
'AROCS 3351 S/33 6X4UPF26/26': '2857T',
'AROCS 3351 S/33 6X4UPG26/26': '2853T',
'AROCS 3351 S/33 6X4UPH26/26': '2633T',
'AROCS 3353 S/33 6X4UPE26/26': '0489T',
'AROCS 3353 S/33 6X4UPF26/26': '0518T',
'AROCS 3353 S/33 6X4UPG26/26': '0513T',
'AROCS 3353 S/33 6X4UPH26/26': '0563T',
'AROCS 4151 K/36 6X4UPE26/26': '0279T',
'AROCS 4151 K/36 6X4UPF26/26': '0276T'
};

const RAW_ACOES = `
  '1035T25/25' : ['Estoque', 'Frigorificado''ABAD''Mais Alimentos'
  '1038T25/25' : ['Estoque', 'Frigorificado''ABAD'
  '1033T25/25' : ['Estoque', 'Frigorificado''ABAD''Mais Alimentos'
  '3938T25/25' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0834T25/25' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '4711T25/25' : ['Estoque', 'Frigorificado'
  '2580T25/25' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2476T25/25' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2475T25/25' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2499T25/25' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '12106T25/25' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '7207T25/25' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2631T25/25' : ['Estoque', 
  '2632T25/25' : ['Estoque', 
  '00132T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '00197T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '00194T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '00195T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '00196T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '00193T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0379T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0407T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0404T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0375T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0401T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0237T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0377T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0388T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0244T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0230T25/26' : ['Estoque', 'Postos de Combustiveis''C.E.ABAST''ABAD'
  '0238T25/26' : ['Estoque', 'Postos de Combustiveis''C.E.ABAST''ABAD'
  '0235T25/26' : ['Estoque', 'Postos de Combustiveis''C.E.ABAST''ABAD'
  '0232T25/26' : ['Estoque', 'Postos de Combustiveis''C.E.ABAST''ABAD'
  '0233T25/26' : ['Estoque', 'Postos de Combustiveis''C.E.ABAST''ABAD'
  '0244T25/26' : ['Estoque', 'Postos de Combustiveis''C.E.ABAST''ABAD'
  '0188T25/26' : ['Estoque', 'Postos de Combustiveis''C.E.ABAST''ABAD'
  '0178T25/26' : ['Estoque', 'Postos de Combustiveis''C.E.ABAST''ABAD'
  '3574T25/26' : ['Estoque', 'ABAD'
  '3572T25/26' : ['Estoque', 'ABAD'
  '3645T25/26' : ['Estoque', 'ABAD'
  '3571T25/26' : ['Estoque', 'ABAD'
  '8816T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '9149T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '8827T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '8930T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '8946T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '8821T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '8992T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '10138T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '10136T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '10342T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '10327T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '10135T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '10140T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '9532T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '1908T25/26' : ['Estoque', 
  '0341T25/26' : ['Estoque', 'ABAD'
  '3857T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3860T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3397T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3853T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3909T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3864T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3393T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3838T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1092T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '1093T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0825T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '1090T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0889T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '1097T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '1100T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '1086T25/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '1799T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1434T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1797T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1440T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1807T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1585T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1788T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1428T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1814T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1485T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1793T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '5015T25/26' : ['Estoque', 'Frigorificado'
  '5007T25/26' : ['Estoque', 'Frigorificado'
  '5005T25/26' : ['Estoque', 'Frigorificado'
  '5018T25/26' : ['Estoque', 'Frigorificado'
  '5012T25/26' : ['Estoque', 'Frigorificado'
  '5009T25/26' : ['Estoque', 'Frigorificado'
  '4726T25/26' : ['Estoque', 'Frigorificado'
  '5013T25/26' : ['Estoque', 'Frigorificado'
  '5010T25/26' : ['Estoque', 'Frigorificado'
  '1112T25/26' : ['Estoque', 'Frigorificado'
  '1153T25/26' : ['Estoque', 'Frigorificado'
  '1128T25/26' : ['Estoque', 'Frigorificado'
  '0959T25/26' : ['Estoque', 'Frigorificado'
  '0936T25/26' : ['Estoque', 'Frigorificado'
  '1109T25/26' : ['Estoque', 'Frigorificado'
  '0960T25/26' : ['Estoque', 'Frigorificado'
  '0956T25/26' : ['Estoque', 'Frigorificado'
  '1110T25/26' : ['Estoque', 'Frigorificado'
  '0585T25/26' : ['Estoque', 'Frigorificado'
  '0580T25/26' : ['Estoque', 'Frigorificado'
  '0587T25/26' : ['Estoque', 'Frigorificado'
  '0586T25/26' : ['Estoque', 'Frigorificado'
  '2649T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2547T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2628T25/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '25/26' : ['Estoque', 
  '0160T25/26' : ['Estoque', 
  '0159T25/26' : ['Estoque', 
  '25/26' : ['Estoque', 
  '0050T25/26' : ['Estoque', 
  '0055T25/26' : ['Estoque', 
  '25/26' : ['Estoque', 
  '0565T25/26' : ['Estoque', 
  '0564T25/26' : ['Estoque', 
  '0640C25/26' : ['Estoque', 
  '0635C25/26' : ['Estoque', 
  '2494T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2580T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2476T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2902T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2896T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '12183T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '13078T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '12206T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '13079T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '12106T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '12049T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '12014T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '13075T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '12057T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '14520T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '14687T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '14697T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '14683T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '14686T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '14696T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '1713T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2569T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '1736T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2578T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2563T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2577T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '7310T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '8216T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '8222T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '7211T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '8228T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '8085T25/26' : ['Estoque', 'Postos de Combustiveis''ABAD'
  '2788T25/26' : ['Estoque', 
  '2785T25/26' : ['Estoque', 
  '2793T25/26' : ['Estoque', 
  '2457T25/26' : ['Estoque', 
  '2697T25/26' : ['Estoque', 
  '2634T25/26' : ['Estoque', 
  '2632T25/26' : ['Estoque', 
  '2633T25/26' : ['Estoque', 
  '0398T25/26' : ['Estoque', 
  '0399T25/26' : ['Estoque', 
  '0513T25/26' : ['Estoque', 
  '0225T25/26' : ['Estoque', 
  '0240T25/26' : ['Estoque', 
  '0869T25/26' : ['Estoque', 
  '02171T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '02170T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '00132T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '00197T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '00194T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '00195T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '00196T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '00193T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '0379T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0407T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0404T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0375T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0401T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0237T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0377T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0388T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0244T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0230T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '0238T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '0235T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '0232T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '0233T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '0244T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '0188T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '0178T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '3574T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '3572T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '3645T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '3571T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '8816T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '9149T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '8827T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '8930T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '8946T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '8821T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '8992T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '10138T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '10136T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '10342T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '10327T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '10135T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '10140T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '9532T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2164CTT26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0348T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '4038T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3860T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3887T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3853T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3909T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3864T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3932T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '3838T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1176T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1093T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1154T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1090T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1189T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1097T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1100T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1086T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1960T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2016T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1797T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1801T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1807T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1843T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1788T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1868T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1814T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1816T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '1793T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '5015T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '5007T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '5005T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '5018T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '5012T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '5009T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '5019T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '5013T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '5010T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1112T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1108T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1128T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1115T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1111T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1109T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1116T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1123T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '1110T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0585T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0580T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0587T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0586T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '2649T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2635T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2772T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0160T26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0211T26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0050T26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0044T26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0682T26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0679T26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0640C26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '0635C26/26' : ['Estoque', 'Frigorificado''C.E.ABAST''ABAD'
  '2893T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2905T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2836T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2921T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2894T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2913T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '13115T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '13078T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '13096T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '13079T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '13127T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '13199T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '13140T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '13075T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '13134T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '15028T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '15000T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '14999T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '14683T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '15072T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '14696T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2709T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2561T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2584T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2578T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2563T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2576T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '8443T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '8216T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '8222T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '7211T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '8228T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '8227T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST'
  '2788T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '2786T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '2793T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '2791T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '2858T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '2857T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '2853T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '2633T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0489T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0518T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0513T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0563T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0279T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
  '0276T26/26' : ['Estoque', 'Postos de Combustiveis''Frigorificado''C.E.ABAST''ABAD'
`;

// =============================================================================
// 4. FUNÇÕES DE UTILIDADE E PARSING
// =============================================================================

function formatar(v){
  return (v||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

function arredondaCentenaBaixo(v){ return Math.floor(v/100)*100; }

function limparMoeda(valorTexto) {
    if (!valorTexto) return 0;
    return parseFloat(valorTexto.replace(/\./g, '').replace(',', '.')) || 0;
}

function parseMoeda(valorTexto) {
    if (!valorTexto) return 0;
    let limpo = valorTexto.replace(/\./g, '').replace(',', '.');
    return parseFloat(limpo) || 0;
}

function buildAcoesMap(raw){
  const map = {};
  raw.split(/\r?\n/).forEach(line=>{
    // 1. Regex mais flexível: Pega a chave e tudo que vier depois do '['
    const m = line.match(/'([^']+)'\s*:\s*\[(.*)/);
    if(!m) return;
    
    const key = m[1].trim().toUpperCase();
    const inside = m[2]; // Conteúdo bruto após o '['

    // 2. Extrai apenas o texto que está entre aspas simples '...'
    // Isso ignora a falta de vírgulas ou colchetes
    const parts = [];
    // Regex global para pegar todas as ocorrências de 'Texto'
    const regexItens = /'([^']+)'/g; 
    let match;
    
    while ((match = regexItens.exec(inside)) !== null) {
      parts.push(match[1].trim());
    }

    // Se achou itens, salva. Se não, array vazio.
    if(parts.length > 0) {
        map[key] = Array.from(new Set(parts));
    } else {
        map[key] = []; 
    }
  });
  return map;
}

const ACOES_MAP = buildAcoesMap(RAW_ACOES);
const ACOES_PADRAO = ['Estoque'];

// =============================================================================
// 5. LÓGICA DO ESTOQUE PRÓPRIO (CALCULADORA DE NIGRIS)
// =============================================================================

function atualizarValores() {
    if (!vendedorAtual) return;

    // 2. VALOR DE TABELA
    const vTabela = vendedorAtual.valorTabela;
    if (valorTabelaEl) {
        valorTabelaEl.innerText = formatar(vTabela);
    }

    // 3. BASE DE VENDA
    const tipo = tipoPreco ? tipoPreco.value : 'vendedor';
    let baseCalculo = 0;

    if (tipo === 'vendedor') baseCalculo = vendedorAtual.precoVendedor;
    else if (tipo === 'gerente') baseCalculo = vendedorAtual.precoGerente;
    else if (tipo === 'oportunidade') baseCalculo = vendedorAtual.precoOportunidade;
    else if (tipo === 'especial' && precoEspecial) baseCalculo = limparMoeda(precoEspecial.value);

    // 4. DESCONTO
    let porcentagem = 0;
    if (descontoEl && descontoEl.value) {
        porcentagem = parseFloat(descontoEl.value.replace(',', '.'));
    }
    if (isNaN(porcentagem)) porcentagem = 0;

    const valorDescontoPerc = arredondaCentenaBaixo(baseCalculo * (porcentagem / 100));
    const valorVendaFinal = baseCalculo - valorDescontoPerc;

    // 5. ATUALIZAR INTERFACE
    if (valorVendaEl) valorVendaEl.innerText = formatar(valorVendaFinal);

    if (descontoReaisEl) {
        const diffTotal = vTabela - valorVendaFinal;
        descontoReaisEl.innerText = formatar(diffTotal);
    }

    // 6. COMISSÃO
    const receitaEfetiva = +(valorVendaFinal - valorVendaFinal * 0.12).toFixed(2);
    const custoEfetivo = +((vendedorAtual.valorCompra || 0) - (vendedorAtual.valorCompra || 0) * 0.12).toFixed(2);
    
    const lucroBruto = (receitaEfetiva - custoEfetivo) +
        (vendedorAtual.fundoEstrela || 0) + (vendedorAtual.retirada || 0) +
        (vendedorAtual.programacao || 0) + (vendedorAtual.comissao || 0) +
        (vendedorAtual.bonificacao || 0) + (vendedorAtual.bonusExtra || 0) -
        (vendedorAtual.frete || 0) - (vendedorAtual.revisao || 0) -
        (vendedorAtual.custosAdd || 0);

    const comissao = +(lucroBruto * 0.09).toFixed(2);
    const dsr = +((comissao / 27) * 4).toFixed(2);

    if (comissaoEl) comissaoEl.innerText = formatar(comissao);
    if (dsrEl) dsrEl.innerText = formatar(dsr);
    if (totalEl) totalEl.innerText = formatar(comissao + dsr);
}

function aplicarFZ(fzRaw){
    const raw = (fzRaw||'').replace(/\D/g,'').slice(0,6);
    if (fzEl) fzEl.value = raw;

    const key = raw.padStart(6,'0');

    if (vendedores[key]){
      vendedorAtual = vendedores[key];

      modeloEl && (modeloEl.innerText = vendedorAtual.modelo || '–');
      upEl     && (upEl.innerText     = vendedorAtual.up || '–');
      anoModEl && (anoModEl.innerText = vendedorAtual.anoMod || '–');

      infoCorEl && (infoCorEl.innerText = vendedorAtual.cor || '–');
      infoVarianteEl && (infoVarianteEl.innerText = vendedorAtual.variante || '–');
      infoPatioEl && (infoPatioEl.innerText = vendedorAtual.patio || '–');

      fzErrorEl && (fzErrorEl.innerText = '');

      // --- OBSERVAÇÃO ---
      if (obsContainerEl && obsTextoEl) {
        if (vendedorAtual.up && vendedorAtual.up.includes('*')) {
            obsTextoEl.innerText = vendedorAtual.observacao || ''; 
            obsContainerEl.style.display = 'block'; 
        } else {
            obsContainerEl.style.display = 'none'; 
        }
      }

    } else {
      vendedorAtual = null;
      modeloEl && (modeloEl.innerText = '–');
      upEl     && (upEl.innerText     = '–');
      anoModEl && (anoModEl.innerText = '–');
      infoCorEl && (infoCorEl.innerText = '–');
      infoVarianteEl && (infoVarianteEl.innerText = '–');
      infoPatioEl && (infoPatioEl.innerText = '–');
      fzErrorEl && (fzErrorEl.innerText = raw.length ? 'FZ não encontrado' : '');
      if (obsContainerEl) obsContainerEl.style.display = 'none';
    }
    atualizarValores();
}

async function carregarDados(){
    const loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.classList.remove('hidden');

    let fallbackTimer = setTimeout(()=>{
      if (!dadosCarregados) {
        console.warn('carregarDados: fallback after timeout');
        if (loadingEl) loadingEl.classList.add('hidden');
      }
    }, 9000);

    try{
      const res = await fetch(sheetCsvUrl);
      const txt = await res.text();

      txt.trim().split('\n').slice(1).forEach(line=>{
        const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
          .map(c=>c.replace(/^"|"$/g,'').trim());

        if(!cols[0]) return;
        const fzKey = cols[0].padStart(6,'0');

        vendedores[fzKey] = {
            modelo: cols[1],
            up: cols[2],
            observacao: cols[3], 
            anoMod: cols[4],
            valorTabela: parseFloat((cols[5]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            precoVendedor: parseFloat((cols[6]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            precoGerente: parseFloat((cols[7]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            precoOportunidade: parseFloat((cols[8]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            cor: cols[9] || '',
            variante: cols[10] || '',
            patio: cols[11] || '',
            fotoUrl: cols[22] || '',
            valorCompra: parseFloat((cols[12]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            fundoEstrela: parseFloat((cols[13]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            retirada: parseFloat((cols[14]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            programacao: parseFloat((cols[15]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            comissao: parseFloat((cols[16]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            bonificacao: parseFloat((cols[17]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            bonusExtra: parseFloat((cols[18]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            frete: parseFloat((cols[19]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            revisao: parseFloat((cols[20]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
            custosAdd: parseFloat((cols[21]||'0').replace(/\./g,'').replace(/,/g,'.')) || 0,
        };
      });

      dadosCarregados = true;
      if (pendingFZ){
        aplicarFZ(pendingFZ);
        pendingFZ = null;
      }
      clearTimeout(fallbackTimer);
    } catch(e){
      console.error('Erro ao carregar CSV', e);
      clearTimeout(fallbackTimer);
    } finally {
      if (loadingEl) loadingEl.classList.add('hidden');
    }
}

// =============================================================================
// 6. LÓGICA DA FÁBRICA (NOVA ESTRUTURA)
// =============================================================================

// MAPAS
const MAP_FAMILIA_UPS = {
  ACCELO: ['UPA','UPF','UPG','UPH'],
  ATEGO:  ['UPB','UPC','UPD','UPE','UPF','UPG','UPH','UPI'],
  ACTROS: ['UPH','UPI','UPJ'],
  AXOR:   ['UPG','UPH','UPI'],
  AROCS:  ['UPE','UPF','UPG','UPH']
};

const FAB_ACTION_COLS = {
  "Estoque": "I",
  "Postos de Combustiveis": "K",
  "Frigorificado": "M",
  "C.E.ABAST": "O",
  "Mais Alimentos": "Q"
};

const FAB_PRECO_URLS = {
  "25/25": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqk-5eBeAxB4GesiaM7W6iEUq9lgfTsRzdy1QylG1ak7dX35Ol827EM1c7LPWb97BoBh6iUbtJMMw/pub?gid=320257334&single=true&output=csv",
  "25/26": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqk-5eBeAxB4GesiaM7W6iEUq9lgfTsRzdy1QylG1ak7dX35Ol827EM1c7LPWb97BoBh6iUbtJMMw/pub?gid=1188555781&single=true&output=csv",
  "26/26": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqk-5eBeAxB4GesiaM7W6iEUq9lgfTsRzdy1QylG1ak7dX35Ol827EM1c7LPWb97BoBh6iUbtJMMw/pub?gid=1774947889&single=true&output=csv"
};

// HELPERS DE PARSING FÁBRICA
function parseKey(k){
  const m = k.match(/^([A-Z]+)\s+(.+?)(UP[A-Z]|SEM UP|S\/P)(\d{2}\/\d{2})$/i);
  if(!m) return null;
  return {
    familia: m[1].toUpperCase(),
    modelo: m[2].trim(),
    up: m[3],
    ano: m[4]
  };
}

function parseFabPrecoCSV(csv) {
  const lines = csv.split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return {};
  const splitSmart = line => line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());
  const header = splitSmart(lines.shift());
  const idxChave = header.findIndex(h => h.toUpperCase().includes("CHAVE"));
  const idxTabela = header.findIndex(h => h.toUpperCase().includes("TABELA"));
  const map = {};
  lines.forEach(l => {
    const cols = splitSmart(l);
    const chave = (cols[idxChave] || '').trim().toUpperCase();
    if (chave) {
      const valorTabela = idxTabela > -1 ? parseNumeroBR(cols[idxTabela]) : 0;
      map[chave] = { tabela: valorTabela, cols: cols };
    }
  });
  return map;
}

function parseNumeroBR(str) {
    if (!str) return 0;
    return parseFloat(str.replace(/R\$\s*/i, '').replace(/\./g, '').replace(/,/g, '.')) || 0;
}

// FUNÇÕES DE CONTROLE DE SELECTS
function getAnos(){
  const s = new Set();
  Object.keys(variantesFab).forEach(k=>{ const p = parseKey(k); if(p) s.add(p.ano); });
  return Array.from(s).sort();
}
function getFamilias(ano){
  const s = new Set();
  Object.keys(variantesFab).forEach(k=>{ const p = parseKey(k); if(p && (!ano || p.ano===ano)) s.add(p.familia); });
  return Array.from(s).sort();
}
function getModelos(ano,familia,up){
  const s = new Set();
  Object.keys(variantesFab).forEach(k=>{
    const p = parseKey(k);
    if(!p) return;
    if(p.ano !== ano) return;
    if(p.familia !== familia) return;
    if(p.up !== up) return;
    s.add(p.modelo);
  });
  return Array.from(s).sort();
}

function limparSelect(sel, placeholder='Selecione'){
  if(!sel) return;
  sel.innerHTML='';
  sel.add(new Option(placeholder,''));
}
function familiaSelecionada(){
  const r = document.querySelector('#familiaFab input[name="familiaFab"]:checked');
  return r ? r.value.trim().toUpperCase() : null;
}
function formatFamilia(f){
  if(!f) return '';
  return f.charAt(0) + f.slice(1).toLowerCase();
}

function preencherAnos(){
  limparSelect(anoFabEl);
  getAnos().forEach(a=> anoFabEl.add(new Option(a,a)));
  limparSelect(upFabEl);
  limparSelect(modeloFabEl);
  if(varianteFabEl) varianteFabEl.textContent='';
  atualizarRadiosFamilia();
  preencherAcoes();
}

function atualizarRadiosFamilia(){
  const ano = anoFabEl.value;
  const permitidas = new Set(getFamilias(ano));
  const radios = document.querySelectorAll('#familiaFab input[name="familiaFab"]');
  let precisaLimpar = false;
  radios.forEach(r=>{
    const fam = r.value.trim().toUpperCase();
    const habilita = !ano || permitidas.has(fam);
    r.disabled = !habilita;
    r.parentElement.style.opacity = habilita? '1' : '.35';
    if(!habilita && r.checked) precisaLimpar = true;
  });
  if(precisaLimpar) radios.forEach(r=> r.checked = false);
}

function preencherFamilias(){ 
  atualizarRadiosFamilia();
  limparSelect(upFabEl);
  limparSelect(modeloFabEl);
  if(varianteFabEl) varianteFabEl.textContent='';
  preencherAcoes();
}

function preencherUps(){
  limparSelect(upFabEl);
  const ano = anoFabEl.value;
  const familia = familiaSelecionada();
  if(!ano || !familia) return;
  const candidatos = MAP_FAMILIA_UPS[familia] || [];
  const existentes = candidatos.filter(up=>{
    return Object.keys(variantesFab).some(k=>{
      const p = parseKey(k);
      return p && p.ano===ano && p.familia===familia && p.up===up;
    });
  });
  (existentes.length? existentes : candidatos).forEach(u=> upFabEl.add(new Option(u,u)));
  limparSelect(modeloFabEl);
  if(varianteFabEl) varianteFabEl.textContent='';
  preencherAcoes();
}

function preencherModelos(){
  limparSelect(modeloFabEl);
  const ano = anoFabEl.value;
  const familia = familiaSelecionada();
  const up = upFabEl.value;
  if(!ano || !familia || !up) return;
  const familiaLabel = formatFamilia(familia);
  getModelos(ano,familia,up).forEach(m=>{
    const opt = new Option(`${familiaLabel} ${m}`, m);
    modeloFabEl.add(opt);
  });
  if(varianteFabEl) varianteFabEl.textContent='';
  preencherAcoes();
}

function chaveVariante(){
  const ano = anoFabEl.value;
  const familia = familiaSelecionada();
  const up = upFabEl.value;
  const modelo = modeloFabEl.value;
  if(!ano || !familia || !up || !modelo) return null;
  return `${familia} ${modelo}${up}${ano}`;
}

// === LÓGICA DE PREÇOS FÁBRICA ===
function colLetterToIdx(letter){
  letter = (letter||'').toUpperCase().trim();
  let n=0;
  for (const ch of letter){
    if(ch<'A'||ch>'Z') return -1;
    n = n*26 + (ch.charCodeAt(0)-64);
  }
  return n-1;
}

async function garantirPrecosAno(ano) {
  if (!ano || fabPrecosPorAno[ano]) return;
  const url = FAB_PRECO_URLS[ano];
  if (!url) return;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const csv = await res.text();
    fabPrecosPorAno[ano] = parseFabPrecoCSV(csv);
  } catch (e) {
    console.error("Erro CSV Fábrica", e);
    fabPrecosPorAno[ano] = {};
  }
}

function valorVendaAcao(item, acao) {
  if (!item || !item.cols) return 0;
  const letraColuna = FAB_ACTION_COLS[acao] || "I";
  const idx = colLetterToIdx(letraColuna);
  if (idx < 0 || idx >= item.cols.length) return 0;
  return parseNumeroBR(item.cols[idx]);
}

function getAcoesForCurrentVariant(){
    const cod = (varianteFabEl?.textContent || '').trim().toUpperCase();
    const ano = (anoFabEl?.value || '').trim().toUpperCase();
    if(!cod || !ano) return ACOES_PADRAO;
    const key = (cod + ano).toUpperCase();
    return ACOES_MAP[key] || ACOES_PADRAO;
}

function preencherAcoes(){
    if(!acaoFabEl) return;
    const lista = getAcoesForCurrentVariant();
    acaoFabEl.innerHTML = '';
    lista.forEach(a=>{
      const opt = document.createElement('option');
      opt.value = a;
      opt.textContent = a;
      acaoFabEl.appendChild(opt);
  });
  aplicarCoresAcao();
}

function aplicarCoresAcao(){
    const val = acaoFabEl.value;
    const map = {
        "Estoque": {bg:"#8dc2ff", fg:"#001c3b"},
        "C.E.ABAST": {bg:"#ffc35b", fg:"#301e01"},
        "Frigorificado": {bg:"#e1bee7", fg:"#25002c"},
        "Postos de Combustiveis":{bg:"#a2f3a5", fg:"#002401"},
        "Mais Alimentos": {bg:"#fff48f", fg:"#383200"}
    };
    const cfg = map[val] || {bg:"",fg:""};
    acaoFabEl.style.backgroundColor = cfg.bg;
    acaoFabEl.style.color = cfg.fg;
    acaoFabEl.style.fontWeight = cfg.bg? "900":"";
}

// === FUNÇÃO PRINCIPAL DE PREÇO ===
async function atualizarPrecoFab() {
  const ano = anoFabEl?.value;
  const acao = acaoFabEl?.value || "Estoque";
  
  const tabelaSpan = document.getElementById('faValorTabela');
  const vendaSpan = document.getElementById('faValorVenda');
  const descPercSpan = document.getElementById('faDescontoPerc');
  const fmt = (v) => (v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  if (!ano || !tabelaSpan) return;

  await garantirPrecosAno(ano);
  const chave = chaveVariante();
  
  if (!chave) {
    tabelaSpan.textContent = "R$ 0,00";
    vendaSpan.textContent = "R$ 0,00";
    if (descPercSpan) descPercSpan.textContent = "0,00%";
    return;
  }

  const dadosAno = fabPrecosPorAno[ano] || {};
  const item = dadosAno[chave.toUpperCase()];

  if (!item) {
    tabelaSpan.textContent = "Não encontrado";
    vendaSpan.textContent = "R$ 0,00";
    if (descPercSpan) descPercSpan.textContent = "0,00%";
    return;
  }

  const valorTabela = item.tabela;
  const valorVenda = valorVendaAcao(item, acao);
  
  tabelaSpan.textContent = fmt(valorTabela);
  vendaSpan.textContent = fmt(valorVenda);

  let perc = 0;
  if (valorTabela > 0) {
    const diferenca = valorTabela - valorVenda;
    perc = (diferenca / valorTabela) * 100;
  }

  if (descPercSpan) {
    descPercSpan.textContent = perc.toFixed(2).replace('.', ',') + "%";
    descPercSpan.style.color = perc >= 0 ? "#28a745" : "#d9534f";
  }
}

// === FUNÇÃO CRÍTICA: ATUALIZA VARIANTE E PREÇO ===
function atualizarVarianteFab(){
    const chave = chaveVariante();
    if(!varianteFabEl) return;
    if(!chave){
        varianteFabEl.textContent = '';
        preencherAcoes();
        atualizarPrecoFab();
        return;
    }
    const codigo = variantesFab[chave] || '';
    varianteFabEl.textContent = codigo;
    preencherAcoes();
    atualizarPrecoFab();
}

// =============================================================================
// 7. FOTOS E MODAL
// =============================================================================

function converterUrlFoto(url) {
    if (!url) return '';
    url = url.trim();
    if (url.includes('lh3.googleusercontent.com') || url.includes('drive.google.com/uc?export=view')) return url;
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    return url;
}

async function fetchFotoByFz(fzRaw) {
  const fz = (fzRaw || '').replace(/\D/g, '').padStart(6, '0');
  if (vendedores[fz] && vendedores[fz].fotoUrl) return converterUrlFoto(vendedores[fz].fotoUrl);
  if (!dadosCarregados) {
    await new Promise(r => setTimeout(r, 1000)); 
    if (vendedores[fz] && vendedores[fz].fotoUrl) return converterUrlFoto(vendedores[fz].fotoUrl);
  }
  return '';
}

function abrirFoto(fotoUrl, titulo = '') {
    if (!fotoUrl) { alert('Foto não disponível.'); return; }
    const modal = document.createElement('div');
    modal.className = 'modal-foto';
    modal.tabIndex = -1;
    modal.innerHTML = `
      <div class="modal-conteudo" role="dialog" aria-modal="true" aria-label="Foto do veículo">
        <button class="modal-close" aria-label="Fechar">×</button>
        <div class="photo-frame" title="${titulo || 'Foto'}">
          <img class="photo-img" src="${fotoUrl}" alt="${titulo || 'Foto do veículo'}"
              onerror="this.src='https://via.placeholder.com/800x600?text=Foto+não+disponível'">
        </div>
        <div class="photo-caption">${titulo || ''}</div>
        <div class="photo-actions">
          <button class="btn btn-open" title="Abrir em nova aba">Abrir</button>
          <button class="btn btn-download" title="Baixar foto">Baixar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    setTimeout(()=> modal.focus(), 50);
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    modal.querySelector('.modal-close').addEventListener('click', ()=> modal.remove());
    modal.querySelector('.btn-open').addEventListener('click', ()=> window.open(fotoUrl, '_blank', 'noopener'));
    modal.querySelector('.btn-download').addEventListener('click', ()=>{
      const a = document.createElement('a');
      a.href = fotoUrl;
      a.download = (titulo || 'foto').replace(/\s+/g,'_') + '.jpg';
      try { document.body.appendChild(a); a.click(); a.remove(); } catch (err) { window.open(fotoUrl, '_blank', 'noopener'); }
    });
    function onKey(e){ if (e.key === 'Escape') { modal.remove(); document.removeEventListener('keydown', onKey); } }
    document.addEventListener('keydown', onKey);
}

// =============================================================================
// 8. EVENT LISTENERS E INIT
// =============================================================================

// Listeners Fábrica
if(anoFabEl) anoFabEl.addEventListener('change', ()=>{ preencherFamilias(); atualizarVarianteFab(); });
if(familiaFabEl) familiaFabEl.addEventListener('change', e=>{ if(e.target && e.target.name === 'familiaFab'){ preencherUps(); atualizarVarianteFab(); } });
if(upFabEl) upFabEl.addEventListener('change', ()=>{ preencherModelos(); atualizarVarianteFab(); });
if(modeloFabEl) modeloFabEl.addEventListener('change', atualizarVarianteFab);
if(acaoFabEl) acaoFabEl.addEventListener('change', ()=>{ aplicarCoresAcao(); atualizarPrecoFab(); });

// Listeners Próprio
if(fzEl) fzEl.addEventListener('input', () => aplicarFZ(fzEl.value));
if(btnVerInfoEl) btnVerInfoEl.addEventListener('click', () => { if (infoVeiculoEl) infoVeiculoEl.classList.toggle('hidden'); });

// Listener Tipo Preço
if(tipoPreco) {
    tipoPreco.addEventListener('change', () => {
        const tipo = tipoPreco.value;
        tipoPreco.className = 'form-select ' + tipo;
        if (tipo === 'especial') {
            especialWrapper.classList.remove('hidden'); 
            precoEspecial.disabled = false; 
            precoEspecial.readOnly = false;
            if (vendedorAtual) {
                const min = vendedorAtual.precoOportunidade;
                document.getElementById('minEspecialValor').innerText = 'Mínimo: R$ ' + min.toLocaleString('pt-BR', {minimumFractionDigits: 2});
            }
            precoEspecial.focus(); 
        } else {
            especialWrapper.classList.add('hidden');
            precoEspecial.value = ''; 
        }
        atualizarValores();
    });
}

// Listener Preço Especial Input
if(precoEspecialInput) {
    precoEspecialInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value === "") { e.target.value = ""; return; }
        value = (parseInt(value) / 100).toFixed(2);
        let partes = value.split(".");
        partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        e.target.value = partes[0] + "," + partes[1];
        atualizarValores();
    });
    
    precoEspecialInput.addEventListener('blur', () => {
        if (!vendedorAtual || tipoPreco.value !== 'especial') return;
        const min = vendedorAtual.precoOportunidade;
        let v = limparMoeda(precoEspecialInput.value);
        if (isNaN(v) || v < min) {
            alert("O valor não pode ser inferior ao preço de Oportunidade.");
            v = min;
            precoEspecialInput.value = v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        }
        atualizarValores(); 
    });
}

// Botões Protegidos
if (btnMostrarProtegido) {
    btnMostrarProtegido.addEventListener('click', () => {
        // 1. Verifica se a informação já está na tela (se a classe 'hidden' NÃO existe)
        const estaoVisiveis = !rowComissaoProtected.classList.contains('hidden');

        if (estaoVisiveis) {
            // SE JÁ ESTÁ VENDO: Oculta tudo novamente (como se fechasse o detalhamento)
            [rowComissaoProtected, rowDsrProtected, rowTotalProtected].forEach(r => r.classList.add('hidden'));
            
            // Opcional: Se quiser que o campo de senha suma também caso esteja aberto
            passwordGroup.classList.add('hidden'); 
            
            // Limpa mensagens de erro antigas
            senhaError.textContent = "";
        } else {
            // SE NÃO ESTÁ VENDO: Abre o campo para digitar a senha
            passwordGroup.classList.toggle('hidden');
            senhaError.textContent = "";
            
            if (!passwordGroup.classList.contains('hidden')) {
                senhaInput.focus();
            }
        }
    });
}

// Mantém o restante da lógica de verificação de senha igual
if (btnVerificarSenha) {
    btnVerificarSenha.addEventListener('click', () => {
        if (senhaInput.value.trim() === 'Vendas456') {
            [rowComissaoProtected, rowDsrProtected, rowTotalProtected].forEach(r => r.classList.remove('hidden'));
            passwordGroup.classList.add('hidden'); // Esconde o campo de senha após acertar
            senhaInput.value = '';
            senhaError.textContent = "";
        } else {
            senhaError.textContent = "Senha incorreta.";
        }
    });
}

if (senhaInput) senhaInput.addEventListener('keyup', e => { if (e.key === 'Enter') btnVerificarSenha.click(); });

// Copiar Variante
els("btnCopiarVariante")?.addEventListener("click", ()=>{
  const v = (varianteFabEl?.textContent||'').trim();
  if(!v) return;
  navigator.clipboard.writeText(v);
  const icon  = els("iconCopiarVariante");
  const check = els("iconCheckVariante");
  if(icon && check){
    icon.style.display='none'; check.style.display='inline';
    setTimeout(()=>{icon.style.display='inline';check.style.display='none';},900);
  }
});

// Botão Ver Foto
const btnVerFoto = els('btnVerFoto');
if (btnVerFoto && fzEl) {
    btnVerFoto.addEventListener('click', async () => {
        const fz = fzEl.value || '';
        if (!fz.trim()) { alert('Informe o FZ antes de ver a foto.'); return; }
        btnVerFoto.disabled = true;
        btnVerFoto.textContent = 'Carregando...';
        try {
            const fotoUrl = await fetchFotoByFz(fz);
            if (!fotoUrl) throw new Error('Foto não encontrada.');
            const nomeModelo = modeloEl ? modeloEl.textContent.trim() : '';
            abrirFoto(fotoUrl, nomeModelo);
        } catch (error) {
            alert('Não foi possível carregar a foto deste veículo.');
        } finally {
            btnVerFoto.disabled = false;
            btnVerFoto.textContent = '📷 Foto'; 
        }
    });
}

// Controle de Abas
if(btnProprio) btnProprio.onclick = () => {
    calcProprio.classList.remove('hidden');
    calcFabrica.classList.add('hidden');
    btnProprio.classList.add('btn-primary');
    btnProprio.classList.remove('btn-secondary');
    btnFabrica.classList.add('btn-secondary');
    btnFabrica.classList.remove('btn-primary');
};

if(btnFabrica) btnFabrica.onclick = () => {
    calcFabrica.classList.remove('hidden');
    calcProprio.classList.add('hidden');
    btnFabrica.classList.add('btn-primary');
    btnFabrica.classList.remove('btn-secondary');
    btnProprio.classList.add('btn-secondary');
    btnProprio.classList.remove('btn-primary');
};

// =============================================================================
// 9. FUNÇÃO SHOW CALC & INIT
// =============================================================================

function showCalcProprio(){
    els('calcEstoqueProprio')?.classList.remove('hidden');
    els('calcEstoqueFabrica')?.classList.add('hidden');
}
function showCalcFabrica(){
    els('calcEstoqueProprio')?.classList.add('hidden');
    els('calcEstoqueFabrica')?.classList.remove('hidden');
}

function applyQueryParams(){
    const params = new URLSearchParams(location.search);
    const calc = (params.get('calc')||'').toLowerCase();
    const fz   = (params.get('fz')||'').replace(/\D/g,'').slice(0,6);

    if (calc === 'fabrica') showCalcFabrica(); else showCalcProprio();

    if (fz){
      if (dadosCarregados) aplicarFZ(fz);
      else pendingFZ = fz;
    }
}

function init(){
  els('mainContent')?.classList.remove('hidden');
  showCalcProprio();
  applyQueryParams();
  carregarDados();
  preencherAnos();
  if(anoFabEl && anoFabEl.options.length>1){
    anoFabEl.selectedIndex = 1;
    anoFabEl.dispatchEvent(new Event('change'));
  }

  // Ajuste Header Padding
  const adjustBodyPadding = () => {
    const hdr = document.querySelector('.main-header');
    if (hdr) {
      const h = hdr.offsetHeight || 56;
      document.body.style.paddingTop = h + 'px';
      const headerSpace = document.querySelector('.header-space');
      if (headerSpace) headerSpace.style.height = h + 'px';
    }
  };
  adjustBodyPadding();
  window.addEventListener('resize', () => {
    clearTimeout(window._adjustHeaderTimer);
    window._adjustHeaderTimer = setTimeout(adjustBodyPadding, 120);
  });
  
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalReserva');
  const btnOpen = document.getElementById('btnOpenReserva');
  const btnClose = document.getElementById('btnCloseReserva');
  const btnEnviar = document.getElementById('btnEnviarWhatsApp');

  // Inputs
  const inpNome = document.getElementById('reservaNome');
  const inpPedido = document.getElementById('reservaPedido');
  const inpLoja = document.getElementById('reservaLoja');

  // 1. Abrir Modal
  if(btnOpen) {
    btnOpen.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Validação: Só abre se tiver carro selecionado
      if (!vendedorAtual) {
        alert("Por favor, digite um FZ/Chassi válido primeiro.");
        return;
      }

      // Preenche o resumo visual
      document.getElementById('resumoModelo').innerText = vendedorAtual.modelo;
      document.getElementById('resumoFZ').innerText = "FZ: " + (document.getElementById('fz').value || '--');

      // Mostra a janela
      modal.classList.remove('hidden');
      inpNome.focus();
    });
  }

  // 2. Fechar Modal
  if(btnClose) btnClose.addEventListener('click', () => modal.classList.add('hidden'));
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

// 3. Enviar WhatsApp (Avançado com Qualificação de Lead)
  if(btnEnviar) {
    btnEnviar.addEventListener('click', () => {
      // Dados Básicos
      const nome = inpNome.value.trim();
      const pedido = inpPedido.value.trim();
      const loja = inpLoja.value;

      // Dados Novos
      const cliente = document.getElementById('reservaCliente').value.trim() || "Não informado";
      const termometro = document.getElementById('reservaTermometro').value;
      const dataFatRaw = document.getElementById('reservaDataFaturamento').value;
      const formaPgto = document.getElementById('reservaFormaPagamento').value;
      const banco = document.getElementById('reservaInstituicao').value;

      // Checkboxes (Retornam Sim ou Não)
      const credAprovado = document.getElementById('reservaCredito').checked ? "SIM" : "Não";
      const temEntrada = document.getElementById('reservaEntrada').checked ? "SIM" : "Não";
      const temTroca = document.getElementById('reservaTroca').checked ? "SIM" : "Não";
      const eParceria = document.getElementById('reservaParceria').checked ? "SIM" : "Não";

      if (!nome || !pedido || !loja) {
        alert("Por favor, preencha seu Nome, a Concessionária e o Número do Pedido no topo da tela.");
        return;
      }

      // Formatar Data (De YYYY-MM-DD para DD/MM/YYYY)
      let dataFatFormatada = "Não informada";
      if (dataFatRaw) {
        const [y, m, d] = dataFatRaw.split('-');
        dataFatFormatada = `${d}/${m}/${y}`;
      }

      // Dados do Carro
      const fz = document.getElementById('fz').value;
      const modelo = vendedorAtual.modelo;
      const precoFinal = document.getElementById('valorVenda').innerText;

      // Monta a mensagem executiva super estruturada
      const mensagemTexto = 
`*SOLICITAÇÃO DE RESERVA*

*Vendedor:* ${nome}
*Loja:* ${loja}
*Pedido:* ${pedido}

*--- DADOS DO CLIENTE ---*
*Cliente:* ${cliente}
*Termômetro:* ${termometro}
*Crédito Aprovado:* ${credAprovado}

*--- NEGOCIAÇÃO ---*
*Forma de Pagto:* ${formaPgto}
*Instituição:* ${banco}
*Pagar entrada?* ${temEntrada}
*Usado na troca?* ${temTroca}
*Venda Parceria?* ${eParceria}
*Previsão de Faturamento:* ${dataFatFormatada}

*--- VEÍCULO ---*
*Modelo:* ${modelo}
*FZ:* ${fz}
*Valor Fechado:* ${precoFinal}

Segue abaixo o Pedido de Venda.`;

      const textoCodificado = encodeURIComponent(mensagemTexto);

      // Mapa de números por concessionária
      const numerosConcessionarias = {
        "Limão": "5511976983600",
        "SBC": "5511940554579",
        "Sorocaba": "5515992487105",
        "Itu": "5515992487105",
        "SJC": "5512997186270"
      };

      const numero = numerosConcessionarias[loja] || "5511976983600"; 

      // Abre o WhatsApp
      window.open(`https://wa.me/${numero}?text=${textoCodificado}`, '_blank');

      // Fecha a janela do site
      modal.classList.add('hidden');
    });
  }

});

// Inicialização
if (document.readyState === 'complete') init();
else window.addEventListener('load', init);

document.addEventListener('DOMContentLoaded', function() {
  // Menu Mobile
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-menu');
  if(toggle && nav){
      toggle.addEventListener('click', () => { 
        nav.classList.toggle('open');
        toggle.classList.toggle('active');
      });
      nav.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { 
        nav.classList.remove('open'); 
        toggle.classList.remove('active');
      }); });
      document.addEventListener('click', (e) => { 
        if (!nav.contains(e.target) && !toggle.contains(e.target)) { 
          nav.classList.remove('open'); 
          toggle.classList.remove('active');
        } 
      });
  }
});