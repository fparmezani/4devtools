$(document).ready(() => {
    $(".mask-rg-sp").mask("00.000.000-A");
});

$("#nv-validate-rg-sp").keyup(() => {
  validateRgSp();
})

function validateRgSp() {
  let rg = $("#nv-validate-rg-sp").val();

  if (rg.length < 12) {
    responseValidateRgSp();
    return;
  }

  const last = window.sessionStorage.getItem("nv-session-validate-rg-sp");
  if (last !== rg) {
    registerBi();
    window.sessionStorage.setItem("nv-session-validate-rg-sp", rg);
  }

  const rgNumbersClear = rg.substr(0, 11).replace(/\D/g, "");

  // validate repeat numbers
  if (rgNumbersClear.match(/(\d)\1{7}/)) {
    responseValidateRgSp("invalid");
    return;
  }

  let digitInformed = rg.substr(11, 1);
  if (digitInformed == "x" || digitInformed == "X")
    digitInformed = 10;

  const arrNumbers = rgNumbersClear.split("").splice(0, 8);

  let sum = 0;
  arrNumbers.forEach((value, i) => {
    sum = sum + (parseInt(value) * (parseInt(i) + 2));
  });

  let digitValid = 11 - (sum % 11);
  if (digitValid == 11)
    digitValid = 0;

  let result = true;
  if (digitInformed != digitValid)
    result = false;

  responseValidateRgSp(result ? "valid" : "invalid");
}

function responseValidateRgSp(response) {
  const div = $("#nv-div-validate-rg-sp");
  const spanIcon = $("#nv-span-icon-validate-rg-sp");
  const spanText = $("#nv-span-text-validate-rg-sp");

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
