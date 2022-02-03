$(document).ready(() => {
    $(".mask-rg-rj").mask("00.000.000-0");
});

$("#nv-validate-rg-rj").keyup(() => {
  validateRgRj();
})

function validateRgRj() {
  let rg = $("#nv-validate-rg-rj").val();
  rg = rg.replace(/\D/g, "");

  if (rg.length < 9) {
    responseValidateRgRj();
    return;
  }

  const last = window.sessionStorage.getItem("nv-session-validate-rg-rj");
  if (last !== rg) {
    registerBi();
    window.sessionStorage.setItem("nv-session-validate-rg-rj", rg);
  }

  // validate repeat numbers
  if (rg.match(/(\d)\1{8}/)) {
    responseValidateRgRj("invalid");
    return;
  }

  const digitInformed = rg.substr(8, 1);
  const arrNumbers = rg.split("").splice(0, 8);

  let sum = 0;
  let aux = false;
  let ninesOut = 0;
  arrNumbers.forEach((value, i) => {
    ninesOut = parseInt(value) * (aux ? 2 : 1); // false = 1 vs true = 2
    ninesOut = ninesOut > 9 ? ninesOut - 9 : ninesOut;
    sum = sum + ninesOut;
    aux = !aux;
    ninesOut = 0;
  });

  let digitValid = 10 - (sum % 10);
  if (digitValid == 10)
    digitValid = 0;

  let result = true;
  if (digitInformed != digitValid)
    result = false;

  responseValidateRgRj(result ? "valid" : "invalid");
}

function responseValidateRgRj(response) {
  const div = $("#nv-div-validate-rg-rj");
  const spanIcon = $("#nv-span-icon-validate-rg-rj");
  const spanText = $("#nv-span-text-validate-rg-rj");

  div.removeClass("has-success has-error");
  spanIcon.removeClass("fa fa-check fa-close");
  spanText.html("");

  if (response === "valid") {
    div.addClass("has-success");
    spanIcon.addClass("fa fa-check");
    spanText.html("RG <strong>válido!</strong>");
  }

  if (response === "invalid") {
    div.addClass("has-error");
    spanIcon.addClass("fa fa-close");
    spanText.html("RG <strong>inválido!</strong>");
  }
}
