$(document).ready(() => {
    $(".mask-aih").mask("000000000000-0");
});

$("#nv-validate-aih").keyup(() => {
  validateAih();
})

function validateAih() {
  let aih = $("#nv-validate-aih").val();
  aih = aih.replace(/\D/g, "");

  if (aih.length < 13) {
    responseValidateAih();
    return;
  }

  const last = window.sessionStorage.getItem("nv-session-validate-aih");
  if (last !== aih) {
    registerBi();
    window.sessionStorage.setItem("nv-session-validate-aih", aih);
  }

  // validate repeat numbers
  if (aih.match(/(\d)\1{11}/)) {
    responseValidateAih("invalid");
    return;
  }

  // validate state
  const stateValid = [11, 12, 13, 14, 15, 16, 17, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 35, 41, 42, 43, 50, 51, 52, 53, 99];
  const validateState = state => $.inArray(parseInt(state), stateValid) !== -1
  const state = aih.substr(0, 2);
  if (!validateState(state)) {
    responseValidateAih("invalid");
    return;
  }

  // validate type
  const typeValid = [1, 2, 3, 4, 5];
  const validateType = type => $.inArray(parseInt(type), typeValid) !== -1
  const type = aih.substr(4, 1);
  if (!validateType(type)) {
    responseValidateAih("invalid");
    return;
  }

  // validate digit
  const numbersInformed = aih.substr(0, 12);
  const digitInformed = aih.substr(-1);

  const division = Math.floor(numbersInformed / 11);
  const subtraction = numbersInformed - division;
  const digit = subtraction.toString().substr(-1);
  const compareDigit = (informad, calculated) => informad !== calculated;

  if (compareDigit(digitInformed, digit)) {
    responseValidateAih("invalid");
    return;
  }

  responseValidateAih("valid");
}

function responseValidateAih(response) {
  const div = $("#nv-div-validate-aih");
  const spanIcon = $("#nv-span-icon-validate-aih");
  const spanText = $("#nv-span-text-validate-aih");

  div.removeClass("has-success has-error");
  spanIcon.removeClass("fa fa-check fa-close");
  spanText.html("");

  if (response === "valid") {
    div.addClass("has-success");
    spanIcon.addClass("fa fa-check");
    spanText.html("AIH <strong>válida!</strong>");
  }

  if (response === "invalid") {
    div.addClass("has-error");
    spanIcon.addClass("fa fa-close");
    spanText.html("AIH <strong>inválida!</strong>");
  }
}
