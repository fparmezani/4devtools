$(document).ready(() => {
    $(".mask-credit-card").mask("0000 0000 0000 0000");
});

$("#nv-validate-credit-card").keyup(() => {
  validateCreditCard();
})

function validateCreditCard() {
  let card = $("#nv-validate-credit-card").val();
  card = card.replace(/\D/g, "");

  if (card.length < 16) {
    responseValidateCreditCard();
    return;
  }

  const last = window.sessionStorage.getItem("nv-session-validate-credit-card");
  if (last !== card) {
    registerBi();
    window.sessionStorage.setItem("nv-session-validate-credit-card", card);
  }

  // validate repeat numbers
  if (card.match(/(\d)\1{15}/)) {
    responseValidateCreditCard("invalid");
    return;
  }

  const digitInformed = card.substr(15, 1);
  const arrNumbers = card.split("").splice(0, 15);

  let sum = 0;
  let aux = true;
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

  responseValidateCreditCard(result ? "valid" : "invalid");
}

function responseValidateCreditCard(response) {
  const div = $("#nv-div-validate-credit-card");
  const spanIcon = $("#nv-span-icon-validate-credit-card");
  const spanText = $("#nv-span-text-validate-credit-card");

  div.removeClass("has-success has-error");
  spanIcon.removeClass("fa fa-check fa-close");
  spanText.html("");

  if (response === "valid") {
    div.addClass("has-success");
    spanIcon.addClass("fa fa-check");
    spanText.html("Cartão de Crédito <strong>válido!</strong>");
  }

  if (response === "invalid") {
    div.addClass("has-error");
    spanIcon.addClass("fa fa-close");
    spanText.html("Cartão de Crédito <strong>inválido!</strong>");
  }
}
