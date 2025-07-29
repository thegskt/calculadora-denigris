const usuarios = [
  { usuario: "lpereira", senha: "Dn@1234" },
  { usuario: "goliveira", senha: "162134" },
  { usuario: "mferreira", senha: "Dn@1234" },
  { usuario: "lrocha", senha: "Dn@1234" },
  { usuario: "csandrim", senha: "Dn@1234" },
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

// VARIANTES (adicione todas as linhas conforme sua lista)
  const variantesFab = {
    "ACCELO 1017/39UPA25/25": "2284T",
    "ACCELO 1017/39UPF25/25": "2285T",
    "ACCELO 1017/39UPG25/25": "2287T",
    "ACCELO 1017/46UPA25/25": "2286T",
    "ACCELO 1017/46UPF25/25": "2282T",
    "ACCELO 1017/46UPG25/25": "2283T",
    "ACCELO 1317/39UPA25/25": "1040T",
    "ACCELO 1317/39UPF25/25": "1035T",
    "ACCELO 1317/39UPG25/25": "1038T",
    "ACCELO 1317/46UPA25/25": "1106T",
    "ACCELO 1317/46UPF25/25": "1033T",
    "ACCELO 1317/46UPG25/25": "1036T",
    "ACCELO 1317/46UPH25/25": "1042T",
    "ACCELO 817/39UPA25/25": "02037T",
    "ACCELO 817/39UPF25/25": "02105T",
    "ACCELO 817/39UPG25/25": "02109T",
    "ACCELO 817/46UPA25/25": "02035T",
    "ACCELO 817/46UPF25/25": "02034T",
    "ACCELO 817/46UPG25/25": "02036T",
    "ACTROS 2045 LS/36 4X2UPH25/25": "2476T",
    "ACTROS 2045 LS/36 4X2UPI25/25": "2475T",
    "ACTROS 2045 LS/36 4X2UPJ25/25": "2499T",
    "ACTROS 2045 S/36 4X2UPH25/25": "2494T",
    "ACTROS 2045 S/36 4X2UPI25/25": "2580T",
    "ACTROS 2548 LS/33 6X2UPH25/25": "12179T",
    "ACTROS 2548 LS/33 6X2UPI25/25": "12106T",
    "ACTROS 2548 LS/33 6X2UPJ25/25": "12049T",
    "ACTROS 2548 LS/36 6X2UPH25/25": "12014T",
    "ACTROS 2548 LS/36 6X2UPI25/25": "12012T",
    "ACTROS 2548 LS/36 6X2UPJ25/25": "12057T",
    "ACTROS 2548 S/36 6X2UPH25/25": "12183T",
    "ACTROS 2548 S/36 6X2UPI25/25": "12180T",
    "ACTROS 2548 S/36 6X2UPJ25/25": "12206T",
    "ACTROS 2553 LS/36 6X2UPH25/25": "1668T",
    "ACTROS 2553 LS/36 6X2UPI25/25": "1540T",
    "ACTROS 2553 LS/36 6X2UPJ25/25": "1534T",
    "ACTROS 2553 S/36 6X2UPH25/25": "1713T",
    "ACTROS 2553 S/36 6X2UPI25/25": "1685T",
    "ACTROS 2553 S/36 6X2UPJ25/25": "1736T",
    "ACTROS 2651 LS/36 6X4UPH25/25": "14683T",
    "ACTROS 2651 LS/36 6X4UPI25/25": "14686T",
    "ACTROS 2651 LS/36 6X4UPJ25/25": "14696T",
    "ACTROS 2651 S/36 6X4UPH25/25": "14520T",
    "ACTROS 2651 S/36 6X4UPI25/25": "14687T",
    "ACTROS 2651 S/36 6X4UPJ25/25": "14697T",
    "ACTROS 2653 LS/36 6X4UPH25/25": "7211T",
    "ACTROS 2653 LS/36 6X4UPI25/25": "7207T",
    "ACTROS 2653 LS/36 6X4UPJ25/25": "7345T",
    "ACTROS 2653 S/36 6X4UPH25/25": "7310T",
    "ACTROS 2653 S/36 6X4UPI25/25": "7186T",
    "ACTROS 2653 S/36 6X4UPJ25/25": "7224T",
    "AROCS 3351 K/36 6X4UPE25/25": "2458T",
    "AROCS 3351 K/36 6X4UPF25/25": "2457T",
    "AROCS 3351 S/33 6X4UPE25/25": "2631T",
    "AROCS 3351 S/33 6X4UPF25/25": "2634T",
    "AROCS 3351 S/33 6X4UPG25/25": "2632T",
    "AROCS 3351 S/33 6X4UPH25/25": "2633T",
    "AROCS 3351/48 6X4UPE25/25": "2103T",
    "AROCS 3351/48 6X4UPF25/25": "2085T",
    "AROCS 3353 S/33 6X4UPE25/25": "0398T",
    "AROCS 3353 S/33 6X4UPF25/25": "0399T",
    "AROCS 3353 S/33 6X4UPG25/25": "0397T",
    "AROCS 4151 K/36 6X4UPE25/25": "0225T",
    "AROCS 4151 K/36 6X4UPF25/25": "0240T",
    "AROCS 4851/45 8X4UPE25/25": "0869T",
    "ATEGO 1419/48UPB25/25": "3295T",
    "ATEGO 1419/48UPC25/25": "3299T",
    "ATEGO 1419/48UPD25/25": "3296T",
    "ATEGO 1419/48UPF25/25": "3341T",
    "ATEGO 1719/48UPB25/25": "8372T",
    "ATEGO 1719/48UPC25/25": "8376T",
    "ATEGO 1719/48UPD25/25": "8373T",
    "ATEGO 1719/48UPF25/25": "8375T",
    "ATEGO 1726/48UPB25/25": "9482T",
    "ATEGO 1726/48UPC25/25": "9490T",
    "ATEGO 1726/48UPD25/25": "9479T",
    "ATEGO 1726/48UPF25/25": "9980T",
    "ATEGO 1729/39SEM UP25/25": "1908T",
    "ATEGO 1733/48UPF25/25": "0199T",
    "ATEGO 1933 LS/36UPF25/25": "2575T",
    "ATEGO 1933 LS/36UPH25/25": "2547T",
    "ATEGO 1933 LS/36UPI25/25": "2548T",
    "ATEGO 2429/48 6X2UPB25/25": "3388T",
    "ATEGO 2429/48 6X2UPC25/25": "3385T",
    "ATEGO 2429/48 6X2UPD25/25": "3397T",
    "ATEGO 2429/48 6X2UPF25/25": "3392T",
    "ATEGO 2429/54 6X2UPD25/25": "3395T",
    "ATEGO 2429/54 6X2UPF25/25": "3391T",
    "ATEGO 2429/54 6X2UPH25/25": "3393T",
    "ATEGO 2429/54 6X2UPI25/25": "3387T",
    "ATEGO 2433/48 6X2UPB25/25": "0829T",
    "ATEGO 2433/48 6X2UPC25/25": "0854T",
    "ATEGO 2433/48 6X2UPD25/25": "0825T",
    "ATEGO 2433/48 6X2UPF25/25": "0828T",
    "ATEGO 2433/54 6X2UPD25/25": "0889T",
    "ATEGO 2433/54 6X2UPF25/25": "0834T",
    "ATEGO 2433/54 6X2UPH25/25": "0839T",
    "ATEGO 2433/54 6X2UPI25/25": "0899T",
    "ATEGO 2730 B/36 6X4UPB25/25": "4724T",
    "ATEGO 2730 B/36 6X4UPE25/25": "4669T",
    "ATEGO 2730 B/36 6X4UPF25/25": "4700T",
    "ATEGO 2730 K/36 6X4UPB25/25": "4726T",
    "ATEGO 2730 K/36 6X4UPE25/25": "4673T",
    "ATEGO 2730 K/36 6X4UPF25/25": "4701T",
    "ATEGO 2730/48 6X4UPB25/25": "4711T",
    "ATEGO 2730/48 6X4UPE25/25": "4696T",
    "ATEGO 2730/48 6X4UPF25/25": "4691T",
    "ATEGO 3033/48 8X2UPB25/25": "1438T",
    "ATEGO 3033/48 8X2UPD25/25": "1434T",
    "ATEGO 3033/48 8X2UPF25/25": "1432T",
    "ATEGO 3033/54 8X2UPD25/25": "1440T",
    "ATEGO 3033/54 8X2UPF25/25": "1433T",
    "ATEGO 3033/54 8X2UPH25/25": "1585T",
    "ATEGO 3033/54 8X2UPI25/25": "1591T",
    "ATEGO 3033/63 8X2UPD25/25": "1428T",
    "ATEGO 3033/63 8X2UPF25/25": "1427T",
    "ATEGO 3033/63 8X2UPH25/25": "1485T",
    "ATEGO 3033/63 8X2UPI25/25": "1582T",
    "ATEGO 3133/48 6X4UPD25/25": "0337T",
    "ATEGO 3133/48 6X4UPE25/25": "0330T",
    "ATEGO 3133/48 6X4UPF25/25": "0334T",
    "ATEGO 3133/48 6X4UPG25/25": "0206T",
    "ATEGO 3330 B/46 8X4UPB25/25": "0959T",
    "ATEGO 3330 B/46 8X4UPE25/25": "0936T",
    "ATEGO 3330 B/46 8X4UPF25/25": "0970T",
    "ATEGO 3330 K/46 8X4UPB25/25": "0960T",
    "ATEGO 3330 K/46 8X4UPE25/25": "0956T",
    "ATEGO 3330 K/46 8X4UPF25/25": "0971T",
    "ATEGO 3330/54 8X4UPB25/25": "0973T",
    "ATEGO 3330/54 8X4UPE25/25": "0947T",
    "ATEGO 3330/54 8X4UPF25/25": "0977T",
    "ACCELO 917/31UPA25/26": "00029T",
    "ACCELO 917/31UPF25/26": "00030T",
    "ACCELO 917/39UPA25/26": "00025T",
    "ACCELO 917/39UPF25/26": "00026T",
    "ACCELO 917/46UPA25/26": "00027T",
    "ACCELO 917/46UPF25/26": "00028T",
    "ACCELO 1117/31UPA25/26": "0065T",
    "ACCELO 1117/31UPF25/26": "0066T",
    "ACCELO 1117/31UPG25/26": "0067T",
    "ACCELO 1117/39UPA25/26": "0072T",
    "ACCELO 1117/39UPF25/26": "0071T",
    "ACCELO 1117/39UPG25/26": "0074T",
    "ACCELO 1117/46UPA25/26": "0070T",
    "ACCELO 1117/46UPF25/26": "0068T",
    "ACCELO 1117/46UPG25/26": "0069T",
    "ACCELO 1417/39UPA25/26": "0047T",
    "ACCELO 1417/39UPF25/26": "0049T",
    "ACCELO 1417/39UPG25/26": "0052T",
    "ACCELO 1417/39UPH25/26": "0053T",
    "ACCELO 1417/46UPA25/26": "0048T",
    "ACCELO 1417/46UPF25/26": "0050T",
    "ACCELO 1417/46UPG25/26": "0051T",
    "ACCELO 1417/46UPH25/26": "0054T",
    "ATEGO 1419/48UPB25/26": "3574T",
    "ATEGO 1419/48UPC25/26": "3299T",
    "ATEGO 1419/48UPD25/26": "3570T",
    "ATEGO 1419/48UPF25/26": "3341T",
    "ATEGO 1719/48UPB25/26": "8830T",
    "ATEGO 1719/48UPC25/26": "8376T",
    "ATEGO 1719/48UPD25/26": "8373T",
    "ATEGO 1719/48UPF25/26": "8375T",
    "ATEGO 1726/48UPB25/26": "9482T",
    "ATEGO 1726/48UPC25/26": "9490T",
    "ATEGO 1726/48UPD25/26": "9479T",
    "ATEGO 1726/48UPF25/26": "10135T",
    "ATEGO 1726/54UPI25/26": "9532T",
    "ATEGO 1729/39S/P25/26": "1908T",
    "ATEGO 1733/48UPF25/26": "0199T",
    "ATEGO 2429/48 6X2UPB25/26": "3388T",
    "ATEGO 2429/48 6X2UPC25/26": "3385T",
    "ATEGO 2429/48 6X2UPD25/26": "3397T",
    "ATEGO 2429/48 6X2UPF25/26": "3853T",
    "ATEGO 2429/54 6X2UPD25/26": "3395T",
    "ATEGO 2429/54 6X2UPF25/26": "3391T",
    "ATEGO 2429/54 6X2UPH25/26": "3393T",
    "ATEGO 2429/54 6X2UPI25/26": "3838T",
    "ATEGO 2433/48 6X2UPB25/26": "0829T",
    "ATEGO 2433/48 6X2UPC25/26": "0854T",
    "ATEGO 2433/48 6X2UPD25/26": "0825T",
    "ATEGO 2433/48 6X2UPF25/26": "0828T",
    "ATEGO 2433/54 6X2UPD25/26": "0889T",
    "ATEGO 2433/54 6X2UPF25/26": "0834T",
    "ATEGO 2433/54 6X2UPH25/26": "0839T",
    "ATEGO 2433/54 6X2UPI25/26": "0899T",
    "ATEGO 3033/48 8X2UPB25/26": "1438T",
    "ATEGO 3033/48 8X2UPD25/26": "1434T",
    "ATEGO 3033/48 8X2UPF25/26": "1432T",
    "ATEGO 3033/54 8X2UPD25/26": "1440T",
    "ATEGO 3033/54 8X2UPF25/26": "1433T",
    "ATEGO 3033/54 8X2UPH25/26": "1585T",
    "ATEGO 3033/54 8X2UPI25/26": "1591T",
    "ATEGO 3033/63 8X2UPD25/26": "1428T",
    "ATEGO 3033/63 8X2UPF25/26": "1427T",
    "ATEGO 3033/63 8X2UPH25/26": "1485T",
    "ATEGO 3033/63 8X2UPI25/26": "1793T",
    "ATEGO 2730/48 6X4UPB25/26": "4711T",
    "ATEGO 2730/48 6X4UPE25/26": "4696T",
    "ATEGO 2730/48 6X4UPF25/26": "4691T",
    "ATEGO 2730 B/36 6X4UPB25/26": "4724T",
    "ATEGO 2730 B/36 6X4UPE25/26": "4669T",
    "ATEGO 2730 B/36 6X4UPF25/26": "4700T",
    "ATEGO 2730 K/36 6X4UPB25/26": "4726T",
    "ATEGO 2730 K/36 6X4UPE25/26": "4673T",
    "ATEGO 2730 K/36 6X4UPF25/26": "4701T",
    "ATEGO 3330/54 8X4UPB25/26": "0973T",
    "ATEGO 3330/54 8X4UPE25/26": "0947T",
    "ATEGO 3330/54 8X4UPF25/26": "0977T",
    "ATEGO 3330 B/46 8X4UPB25/26": "0959T",
    "ATEGO 3330 B/46 8X4UPE25/26": "0936T",
    "ATEGO 3330 B/46 8X4UPF25/26": "0970T",
    "ATEGO 3330 K/46 8X4UPB25/26": "0960T",
    "ATEGO 3330 K/46 8X4UPE25/26": "0956T",
    "ATEGO 3330 K/46 8X4UPF25/26": "0971T",
    "ATEGO 3133/48 6X4UPD25/26": "0337T",
    "ATEGO 3133/48 6X4UPE25/26": "0330T",
    "ATEGO 3133/48 6X4UPF25/26": "0334T",
    "ATEGO 3133/48 6X4UPG25/26": "0206T",
    "ATEGO 1933 LS/36UPF25/26": "2575T",
    "ATEGO 1933 LS/36UPH25/26": "2547T",
    "ATEGO 1933 LS/36UPI25/26": "2548T",
    "AXOR 2038 S/36UPG25/26": "",
    "AXOR 2038 S/36UPH25/26": "",
    "AXOR 2038 S/36UPI25/26": "0159T",
    "AXOR 2538 S/36UPG25/26": "",
    "AXOR 2538 S/36UPH25/26": "",
    "AXOR 2538 S/36UPI25/26": "0055T",
    "AXOR 2545 S/36UPG25/26": "",
    "AXOR 2545 S/36UPH25/26": "0554T",
    "AXOR 2545 S/36UPI25/26": "0564T",
    "ACTROS 2045 S/36 4X2UPH25/26": "2494T",
    "ACTROS 2045 S/36 4X2UPI25/26": "2580T",
    "ACTROS 2045 LS/36 4X2UPH25/26": "2476T",
    "ACTROS 2045 LS/36 4X2UPI25/26": "2475T",
    "ACTROS 2045 LS/36 4X2UPJ25/26": "2499T",
    "ACTROS 2548 S/36 6X2UPH25/26": "12183T",
    "ACTROS 2548 S/36 6X2UPI25/26": "12180T",
    "ACTROS 2548 S/36 6X2UPJ25/26": "12206T",
    "ACTROS 2548 LS/33 6X2UPH25/26": "12179T",
    "ACTROS 2548 LS/33 6X2UPI25/26": "12106T",
    "ACTROS 2548 LS/33 6X2UPJ25/26": "12049T",
    "ACTROS 2548 LS/36 6X2UPH25/26": "12014T",
    "ACTROS 2548 LS/36 6X2UPI25/26": "12012T",
    "ACTROS 2548 LS/36 6X2UPJ25/26": "12057T",
    "ACTROS 2651 S/36 6X4UPH25/26": "14520T",
    "ACTROS 2651 S/36 6X4UPI25/26": "14687T",
    "ACTROS 2651 S/36 6X4UPJ25/26": "14697T",
    "ACTROS 2651 LS/36 6X4UPH25/26": "14683T",
    "ACTROS 2651 LS/36 6X4UPI25/26": "14686T",
    "ACTROS 2651 LS/36 6X4UPJ25/26": "14696T",
    "ACTROS 2553 S/36 6X2UPH25/26": "1713T",
    "ACTROS 2553 S/36 6X2UPI25/26": "1685T",
    "ACTROS 2553 S/36 6X2UPJ25/26": "1736T",
    "ACTROS 2553 LS/36 6X2UPH25/26": "1668T",
    "ACTROS 2553 LS/36 6X2UPI25/26": "1540T",
    "ACTROS 2553 LS/36 6X2UPJ25/26": "1534T",
    "ACTROS 2653 S/36 6X4UPH25/26": "7310T",
    "ACTROS 2653 S/36 6X4UPI25/26": "7186T",
    "ACTROS 2653 S/36 6X4UPJ25/26": "7224T",
    "ACTROS 2653 LS/36 6X4UPH25/26": "7211T",
    "ACTROS 2653 LS/36 6X4UPI25/26": "7207T",
    "ACTROS 2653 LS/36 6X4UPJ25/26": "7345T",
    "AROCS 3351/48 6X4UPE25/26": "2103T",
    "AROCS 3351/48 6X4UPF25/26": "2085T",
    "AROCS 3351 K/36 6X4UPE25/26": "2458T",
    "AROCS 3351 K/36 6X4UPF25/26": "2457T",
    "AROCS 3351 S/33 6X4UPE25/26": "2631T",
    "AROCS 3351 S/33 6X4UPF25/26": "2634T",
    "AROCS 3351 S/33 6X4UPG25/26": "2632T",
    "AROCS 3351 S/33 6X4UPH25/26": "2633T",
    "AROCS 3353 S/33 6X4UPE25/26": "0398T",
    "AROCS 3353 S/33 6X4UPF25/26": "0399T",
    "AROCS 3353 S/33 6X4UPG25/26": "0397T",
    "AROCS 4151 K/36 6X4UPE25/26": "0225T",
    "AROCS 4151 K/36 6X4UPF25/26": "0240T",
    "AROCS 4851/45 8X4UPE25/26": "0869T"
  };

  function atualizarVarianteFab() {
  const modelo = document.getElementById("modeloFab").value.trim();
  const up = document.getElementById("upFab").value.trim();
  const ano = document.getElementById("anoModeloFab").value.trim();
  if (modelo === "Selecione" || up === "Selecione" || !ano) {
    document.getElementById("varianteFab").textContent = "";
    return;
  }
  const chave = `${modelo}${up}${ano}`;
  document.getElementById("varianteFab").textContent = variantesFab[chave] || "";
  }

  document.getElementById("modeloFab").addEventListener("change", atualizarVarianteFab);
  document.getElementById("upFab").addEventListener("change", atualizarVarianteFab);
  document.getElementById("anoModeloFab").addEventListener("change", atualizarVarianteFab);

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

    document.getElementById("btnCopiarVariante").addEventListener("click", function() {
      const varianteEl = document.getElementById("varianteFab");
      const valor = varianteEl.textContent.trim();
      if (valor) {
        navigator.clipboard.writeText(valor);
        this.textContent = "✅";
        setTimeout(() => { this.textContent = "📋"; }, 1000);
      }
    });


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

      function atualizarFamilias() {
        const anoModelo = document.getElementById("anoModeloFab").value;
        const familiaFab = document.getElementById("familiaFab");
        familiaFab.innerHTML = "";

        let familias = [];
        if (anoModelo === "25/25") {
          familias = ["Accelo", "Atego", "Actros", "Arocs"];
        } else if (anoModelo === "25/26") {
          familias = ["Accelo", "Atego", "Actros", "Axor", "Arocs"];
        }

        familias.forEach(fam => {
          const label = document.createElement("label");
          label.innerHTML = `<input type="radio" name="familiaFab" value="${fam}"><span>${fam}</span>`;
          familiaFab.appendChild(label);
        });
    }

      const upPorFamilia = {
        Accelo: ["Selecione","UPA", "UPF", "UPG", "UPH"],
        Atego:  ["Selecione","S/P","UPB", "UPC", "UPD", "UPE", "UPF", "UPG", "UPH", "UPI"],
        Actros: ["Selecione","UPH", "UPI", "UPJ"],
        Axor:   ["Selecione","UPG", "UPI", "UPH"],
        Arocs:  ["Selecione","UPE", "UPF", "UPG", "UPH"]
      };

      function atualizarUP() {
        const familiaSelecionada = document.querySelector('input[name="familiaFab"]:checked');
        const upFab = document.getElementById("upFab");
        upFab.innerHTML = ""; // Limpa opções

        if (!familiaSelecionada) return;

        const familia = familiaSelecionada.value;
        const ups = upPorFamilia[familia] || [];

        ups.forEach(up => {
          const option = document.createElement("option");
          option.value = up;
          option.textContent = up;
          upFab.appendChild(option);
        });
      }

      // Atualiza UP ao selecionar família
      document.getElementById("familiaFab").addEventListener("change", atualizarUP);

      // Atualiza UP sempre que atualizar famílias
      function atualizarFamilias() {
        // ...seu código atual...
        // (depois de adicionar os radios)
        atualizarUP();
      }
      const modelosPorChave = {
        "Accelo25/25UPA": ["Selecione", "ACCELO 817/39", "ACCELO 817/46", "ACCELO 1017/39", "ACCELO 1017/46", "ACCELO 1317/39", "ACCELO 1317/46"],
        "Accelo25/25UPF": ["Selecione", "ACCELO 817/39", "ACCELO 817/46", "ACCELO 1017/39", "ACCELO 1017/46", "ACCELO 1317/39", "ACCELO 1317/46"],
        "Accelo25/25UPG": ["Selecione", "ACCELO 817/39", "ACCELO 817/46", "ACCELO 1017/39", "ACCELO 1017/46", "ACCELO 1317/39", "ACCELO 1317/46"],
        "Accelo25/25UPH": ["Selecione", "ACCELO 1317/46"],

        "Atego25/25S/P": ["Selecione", "ATEGO 1729/39"],
        "Atego25/25UPB": ["Selecione", "ATEGO 1419/48", "ATEGO 1719/48", "ATEGO 1726/48", "ATEGO 2429/48 6X2", "ATEGO 2433/48 6X2", "ATEGO 3033/48 8X2", "ATEGO 2730/48 6X4", "ATEGO 2730 B/36 6X4", "ATEGO 2730 K/36 6X4", "ATEGO 3330/54 8X4", "ATEGO 3330 B/46 8X4", "ATEGO 3330 K/46 8X4"],
        "Atego25/25UPC": ["Selecione", "ATEGO 1419/48", "ATEGO 1719/48", "ATEGO 1726/48", "ATEGO 2429/48 6X2", "ATEGO 2433/48 6X2"],
        "Atego25/25UPD": ["Selecione", "ATEGO 1419/48", "ATEGO 1719/48", "ATEGO 1726/48", "ATEGO 2429/48 6X2", "ATEGO 2429/54 6X2", "ATEGO 2433/48 6X2", "ATEGO 2433/54 6X2", "ATEGO 3033/48 8X2", "ATEGO 3033/54 8X2", "ATEGO 3033/63 8X2", "ATEGO 3133/48 6X4"],
        "Atego25/25UPE": ["Selecione", "ATEGO 2730/48 6X4", "ATEGO 2730 B/36 6X4", "ATEGO 2730 K/36 6X4", "ATEGO 3330/54 8X4", "ATEGO 3330 B/46 8X4", "ATEGO 3330 K/46 8X4", "ATEGO 3133/48 6X4"],
        "Atego25/25UPF": ["Selecione", "ATEGO 1419/48", "ATEGO 1719/48", "ATEGO 1726/48", "ATEGO 1733/48", "ATEGO 2429/48 6X2", "ATEGO 2429/54 6X2", "ATEGO 2433/48 6X2", "ATEGO 2433/54 6X2", "ATEGO 3033/48 8X2", "ATEGO 3033/54 8X2", "ATEGO 3033/63 8X2", "ATEGO 2730/48 6X4", "ATEGO 2730 B/36 6X4", "ATEGO 2730 K/36 6X4", "ATEGO 3330/54 8X4", "ATEGO 3330 B/46 8X4", "ATEGO 3330 K/46 8X4", "ATEGO 3133/48 6X4", "ATEGO 1933 LS/36"],
        "Atego25/25UPG": ["Selecione", "ATEGO 3133/48 6X4"],
        "Atego25/25UPH": ["Selecione", "ATEGO 2429/54 6X2", "ATEGO 2433/54 6X2", "ATEGO 3033/54 8X2", "ATEGO 3033/63 8X2", "ATEGO 1933 LS/36"],
        "Atego25/25UPI": ["Selecione", "ATEGO 2429/54 6X2", "ATEGO 2433/54 6X2", "ATEGO 3033/54 8X2", "ATEGO 3033/63 8X2", "ATEGO 1933 LS/36"],

        "Actros25/25UPH": ["Selecione", "ACTROS 2045 S/36 4X2", "ACTROS 2045 LS/36 4X2", "ACTROS 2548 S/36 6X2", "ACTROS 2548 LS/33 6X2", "ACTROS 2548 LS/36 6X2", "ACTROS 2651 S/36 6X4", "ACTROS 2651 LS/36 6X4", "ACTROS 2553 S/36 6X2", "ACTROS 2553 LS/36 6X2", "ACTROS 2653 S/36 6X4", "ACTROS 2653 LS/36 6X4"],
        "Actros25/25UPI": ["Selecione", "ACTROS 2045 S/36 4X2", "ACTROS 2045 LS/36 4X2", "ACTROS 2548 S/36 6X2", "ACTROS 2548 LS/33 6X2", "ACTROS 2548 LS/36 6X2", "ACTROS 2651 S/36 6X4", "ACTROS 2651 LS/36 6X4", "ACTROS 2553 S/36 6X2", "ACTROS 2553 LS/36 6X2", "ACTROS 2653 S/36 6X4", "ACTROS 2653 LS/36 6X4"],
        "Actros25/25UPJ": ["Selecione", "ACTROS 2045 LS/36 4X2", "ACTROS 2548 S/36 6X2", "ACTROS 2548 LS/33 6X2", "ACTROS 2548 LS/36 6X2", "ACTROS 2651 S/36 6X4", "ACTROS 2651 LS/36 6X4", "ACTROS 2553 S/36 6X2", "ACTROS 2553 LS/36 6X2", "ACTROS 2653 S/36 6X4", "ACTROS 2653 LS/36 6X4"],

        "Arocs25/25UPE": ["Selecione", "AROCS 3351/48 6X4", "AROCS 3351 K/36 6X4", "AROCS 3351 S/33 6X4", "AROCS 3353 S/33 6X4", "AROCS 4151 K/36 6X4", "AROCS 4851/45 8X4"],
        "Arocs25/25UPF": ["Selecione", "AROCS 3351/48 6X4", "AROCS 3351 K/36 6X4", "AROCS 3351 S/33 6X4", "AROCS 3353 S/33 6X4", "AROCS 4151 K/36 6X4"],
        "Arocs25/25UPG": ["Selecione", "AROCS 3351 S/33 6X4", "AROCS 3353 S/33 6X4"],
        "Arocs25/25UPH": ["Selecione", "AROCS 3351 S/33 6X4"],

        "Accelo25/26UPA": ["Selecione", "ACCELO 917/31", "ACCELO 917/39", "ACCELO 917/46", "ACCELO 1117/31", "ACCELO 1117/39", "ACCELO 1117/46", "ACCELO 1417/39", "ACCELO 1417/46"],
        "Accelo25/26UPF": ["Selecione", "ACCELO 917/31", "ACCELO 917/39", "ACCELO 917/46", "ACCELO 1117/31", "ACCELO 1117/39", "ACCELO 1117/46", "ACCELO 1417/39", "ACCELO 1417/46"],
        "Accelo25/26UPG": ["Selecione", "ACCELO 1117/31", "ACCELO 1117/39", "ACCELO 1117/46", "ACCELO 1417/39", "ACCELO 1417/46"],
        "Accelo25/26UPH": ["Selecione", "ACCELO 1417/39", "ACCELO 1417/46"],

        "Atego25/26S/P": ["Selecione", "ATEGO 1729/39"],
        "Atego25/26UPB": ["Selecione", "ATEGO 1419/48", "ATEGO 1719/48", "ATEGO 1726/48", "ATEGO 2429/48 6X2", "ATEGO 2433/48 6X2", "ATEGO 3033/48 8X2", "ATEGO 2730/48 6X4", "ATEGO 2730 B/36 6X4", "ATEGO 2730 K/36 6X4", "ATEGO 3330/54 8X4", "ATEGO 3330 B/46 8X4", "ATEGO 3330 K/46 8X4"],
        "Atego25/26UPC": ["Selecione", "ATEGO 1419/48", "ATEGO 1719/48", "ATEGO 1726/48", "ATEGO 2429/48 6X2", "ATEGO 2433/48 6X2"],
        "Atego25/26UPD": ["Selecione", "ATEGO 1419/48", "ATEGO 1719/48", "ATEGO 1726/48", "ATEGO 2429/48 6X2", "ATEGO 2429/54 6X2", "ATEGO 2433/48 6X2", "ATEGO 2433/54 6X2", "ATEGO 3033/48 8X2", "ATEGO 3033/54 8X2", "ATEGO 3033/63 8X2", "ATEGO 3133/48 6X4"],
        "Atego25/26UPE": ["Selecione", "ATEGO 2730/48 6X4", "ATEGO 2730 B/36 6X4", "ATEGO 2730 K/36 6X4", "ATEGO 3330/54 8X4", "ATEGO 3330 B/46 8X4", "ATEGO 3330 K/46 8X4", "ATEGO 3133/48 6X4"],
        "Atego25/26UPF": ["Selecione", "ATEGO 1419/48", "ATEGO 1719/48", "ATEGO 1726/48", "ATEGO 1733/48", "ATEGO 2429/48 6X2", "ATEGO 2429/54 6X2", "ATEGO 2433/48 6X2", "ATEGO 2433/54 6X2", "ATEGO 3033/48 8X2", "ATEGO 3033/54 8X2", "ATEGO 3033/63 8X2", "ATEGO 2730/48 6X4", "ATEGO 2730 B/36 6X4", "ATEGO 2730 K/36 6X4", "ATEGO 3330/54 8X4", "ATEGO 3330 B/46 8X4", "ATEGO 3330 K/46 8X4", "ATEGO 3133/48 6X4", "ATEGO 1933 LS/36"],
        "Atego25/26UPG": ["Selecione", "ATEGO 3133/48 6X4"],
        "Atego25/26UPH": ["Selecione", "ATEGO 2429/54 6X2", "ATEGO 2433/54 6X2", "ATEGO 3033/54 8X2", "ATEGO 3033/63 8X2", "ATEGO 1933 LS/36"],
        "Atego25/26UPI": ["Selecione", "ATEGO 1726/54", "ATEGO 2429/54 6X2", "ATEGO 2433/54 6X2", "ATEGO 3033/54 8X2", "ATEGO 3033/63 8X2", "ATEGO 1933 LS/36"],

        "Axor25/26UPG": ["Selecione", "AXOR 2038 S/36", "AXOR 2538 S/36", "AXOR 2545 S/36"],
        "Axor25/26UPH": ["Selecione", "AXOR 2038 S/36", "AXOR 2538 S/36", "AXOR 2545 S/36"],
        "Axor25/26UPI": ["Selecione", "AXOR 2038 S/36", "AXOR 2538 S/36", "AXOR 2545 S/36"],

        "Actros25/26UPH": ["Selecione", "ACTROS 2045 S/36 4X2", "ACTROS 2045 LS/36 4X2", "ACTROS 2548 S/36 6X2", "ACTROS 2548 LS/33 6X2", "ACTROS 2548 LS/36 6X2", "ACTROS 2651 S/36 6X4", "ACTROS 2651 LS/36 6X4", "ACTROS 2553 S/36 6X2", "ACTROS 2553 LS/36 6X2", "ACTROS 2653 S/36 6X4", "ACTROS 2653 LS/36 6X4"],
        "Actros25/26UPI": ["Selecione", "ACTROS 2045 S/36 4X2", "ACTROS 2045 LS/36 4X2", "ACTROS 2548 S/36 6X2", "ACTROS 2548 LS/33 6X2", "ACTROS 2548 LS/36 6X2", "ACTROS 2651 S/36 6X4", "ACTROS 2651 LS/36 6X4", "ACTROS 2553 S/36 6X2", "ACTROS 2553 LS/36 6X2", "ACTROS 2653 S/36 6X4", "ACTROS 2653 LS/36 6X4"],
        "Actros25/26UPJ": ["Selecione", "ACTROS 2045 LS/36 4X2", "ACTROS 2548 S/36 6X2", "ACTROS 2548 LS/33 6X2", "ACTROS 2548 LS/36 6X2", "ACTROS 2651 S/36 6X4", "ACTROS 2651 LS/36 6X4", "ACTROS 2553 S/36 6X2", "ACTROS 2553 LS/36 6X2", "ACTROS 2653 S/36 6X4", "ACTROS 2653 LS/36 6X4"],

        "Arocs25/26UPE": ["Selecione", "AROCS 3351/48 6X4", "AROCS 3351 K/36 6X4", "AROCS 3351 S/33 6X4", "AROCS 3353 S/33 6X4", "AROCS 4151 K/36 6X4", "AROCS 4851/45 8X4"],
        "Arocs25/26UPF": ["Selecione", "AROCS 3351/48 6X4", "AROCS 3351 K/36 6X4", "AROCS 3351 S/33 6X4", "AROCS 3353 S/33 6X4", "AROCS 4151 K/36 6X4"],
        "Arocs25/26UPG": ["Selecione", "AROCS 3351 S/33 6X4", "AROCS 3353 S/33 6X4"],
        "Arocs25/26UPH": ["Selecione", "AROCS 3351 S/33 6X4"]
      };

      // Função para atualizar modelos
      function atualizarModelos() {
        const anoModelo = document.getElementById("anoModeloFab").value;
        const familiaSelecionada = document.querySelector('input[name="familiaFab"]:checked');
        const upFab = document.getElementById("upFab");
        const modeloSelect = document.getElementById("modeloFab"); // id do select de modelos

        modeloSelect.innerHTML = ""; // Limpa opções

        if (!familiaSelecionada || !upFab.value || upFab.value === "Selecione") return;

        const chave = `${familiaSelecionada.value}${anoModelo}${upFab.value}`;
        const modelos = modelosPorChave[chave] || ["Selecione"];

        modelos.forEach(modelo => {
          const option = document.createElement("option");
          option.value = modelo;
          option.textContent = modelo;
          modeloSelect.appendChild(option);
        });
      }

      // Atualiza modelos ao trocar UP
      document.getElementById("upFab").addEventListener("change", atualizarModelos);
      // Atualiza modelos ao trocar família
      document.getElementById("familiaFab").addEventListener("change", atualizarModelos);
      // Atualiza modelos ao trocar ano/modelo
      document.getElementById("anoModeloFab").addEventListener("change", atualizarModelos);

    document.getElementById("anoModeloFab").addEventListener("change", atualizarFamilias);
    atualizarFamilias();
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
    document.getElementById("acaoFab").addEventListener("change", function() {
      const select = this;
      switch (select.value) {
        case "Estoque":
          select.style.backgroundColor = "#8dc2ffff"; // Azul De Nigris
          select.style.color = "#001c3bff";
          select.style.fontWeight = "900";
          break;
        case "C.E.ABAST":
          select.style.backgroundColor = "#ffc35bff"; // Laranja claro
          select.style.color = "#301e01ff";
          select.style.fontWeight = "900";
          break;
        case "Frigorificado":
          select.style.backgroundColor = "#e1bee7"; // Roxo claro
          select.style.color = "#25002cff";
          select.style.fontWeight = "900";
          break;
        case "Postos de Combustiveis":
          select.style.backgroundColor = "#a2f3a5ff"; // Verde claro
          select.style.color = "#002401ff";
          select.style.fontWeight = "900";
          break;
        case "Mais Alimentos":
          select.style.backgroundColor = "#fff48fff"; // Amarelo claro
          select.style.color = "#383200ff";
          select.style.fontWeight = "900";
          break;
        default:
          select.style.backgroundColor = "";
          select.style.color = "";
      }
    });
    carregarDados();