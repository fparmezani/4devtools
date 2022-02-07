$(document).ready(() => {
    $(".mask-cnpj").mask("00.000.000/0000-00");
});

$("#nv-validate-cnpj").keyup(() => {
  validateCnpj();
})

function validateCnpj() {
  let cnpj = $("#nv-validate-cnpj").val();
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length < 14) {
    responseValidateCnpj();
    return;
  }

  const last = window.sessionStorage.getItem("nv-session-validate-cnpj");
  if (last !== cnpj) {
    registerBi();
    window.sessionStorage.setItem("nv-session-validate-cnpj", cnpj);
  }

  // validate repeat numbers
  if (cnpj.match(/(\d)\1{13}/)) {
    responseValidateCnpj("invalid");
    return;
  }

  let length = cnpj.length - 2
  let numbers = cnpj.substring(0, length);
  let digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  // validate first digit
  if (result != digits.charAt(0)) {
    responseValidateCnpj("invalid");
    return;
  }

  length = length + 1;
  numbers = cnpj.substring(0,length);
  sum = 0;
  pos = length - 7;
  for (i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  // validate second digit
  if (result != digits.charAt(1)) {
    responseValidateCnpj("invalid");
    return;
  }

  responseValidateCnpj("valid");
}

function responseValidateCnpj(response) {
  const div = $("#nv-div-validate-cnpj");
  const spanIcon = $("#nv-span-icon-validate-cnpj");
  const spanText = $("#nv-span-text-validate-cnpj");

  div.removeClass("has-success has-error");
  spanIcon.removeClass("fa fa-check fa-close");
  spanText.html("");

  if (response === "valid") {
    div.addClass("has-success");
    spanIcon.addClass("fa fa-check");
    spanText.html("CNPJ <strong>válido!</strong>");
  }

  if (response === "invalid") {
    div.addClass("has-error");
    spanIcon.addClass("fa fa-close");
    spanText.html("CNPJ <strong>inválido!</strong>");
  }
}
