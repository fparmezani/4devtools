$(document).ready(() => {
    $(".mask-cns").mask("000 0000 0000 0000");
});

$("#nv-validate-cns").keyup(() => {
  validateCns();
})

function validateCns() {
  let cns = $("#nv-validate-cns").val();
  cns = cns.replace(/\D/g, "");

  if (cns.length < 15) {
    responseValidateCns();
    return;
  }

  const last = window.sessionStorage.getItem("nv-session-validate-cns");
  if (last !== cns) {
    registerBi();
    window.sessionStorage.setItem("nv-session-validate-cns", cns);
  }

  if (["1", "2"].includes(cns[0])) {
    const pis = cns.substr(0, 11);
    const sum = pis.split("").reduce((total, value, index) => total + (value * (15 - index)), 0);
    const rest = sum % 11;
    const digit = rest === 0 ? 0 : 11 - rest;
    const result = digit === 10 ? `${pis}001${(11 - ((sum + 2) % 11))}` : `${pis}000${digit}`;
    if (result === cns) {
      responseValidateCns("valid");
      return;
    }
  }

  if (["7", "8", "9"].includes(cns[0])) {
    const sum = cns.split("").reduce((total, value, index) => total + (value * (15 - index)), 0);
    const result = sum % 11 === 0;
    if (result) {
      responseValidateCns("valid");
      return;
    }
  }

  responseValidateCns("invalid");
}

function responseValidateCns(response) {
  const div = $("#nv-div-validate-cns");
  const spanIcon = $("#nv-span-icon-validate-cns");
  const spanText = $("#nv-span-text-validate-cns");

  div.removeClass("has-success has-error");
  spanIcon.removeClass("fa fa-check fa-close");
  spanText.html("");

  if (response === "valid") {
    div.addClass("has-success");
    spanIcon.addClass("fa fa-check");
    spanText.html("CNS <strong>válido!</strong>");
  }

  if (response === "invalid") {
    div.addClass("has-error");
    spanIcon.addClass("fa fa-close");
    spanText.html("CNS <strong>inválido!</strong>");
  }
}
