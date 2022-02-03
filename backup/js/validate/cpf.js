$(document).ready(() => {
    $(".mask-cpf").mask("000.000.000-00");
});

$("#nv-validate-cpf").keyup(() => {
  validateCpf();
})

function validateCpf() {
  let cpf = $("#nv-validate-cpf").val();
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length < 11) {
    responseValidateCpf();
    return;
  }

  const last = window.sessionStorage.getItem("nv-session-validate-cpf");
  if (last !== cpf) {
    registerBi();
    window.sessionStorage.setItem("nv-session-validate-cpf", cpf);
  }

  // validate repeat numbers
  if (cpf.match(/(\d)\1{10}/)) {
    responseValidateCpf("invalid");
    return;
  }

  let result = true;
  [9, 10].forEach((j) => {
    let sum = 0;
    let rest;
    cpf.split(/(?=)/).splice(0, j).forEach((e, i) => {
      sum += parseInt(e) * ((j + 2) - (i + 1));
    });
    rest = sum % 11;
    rest = (rest < 2) ? 0 : 11 - rest;
    if (rest != cpf.substring(j, j + 1))
      result = false;
  });

  responseValidateCpf(result ? "valid" : "invalid");
}

function responseValidateCpf(response) {
  const div = $("#nv-div-validate-cpf");
  const spanIcon = $("#nv-span-icon-validate-cpf");
  const spanText = $("#nv-span-text-validate-cpf");

  div.removeClass("has-success has-error");
  spanIcon.removeClass("fa fa-check fa-close");
  spanText.html("");

  if (response === "valid") {
    div.addClass("has-success");
    spanIcon.addClass("fa fa-check");
    spanText.html("CPF <strong>válido!</strong>");
  }

  if (response === "invalid") {
    div.addClass("has-error");
    spanIcon.addClass("fa fa-close");
    spanText.html("CPF <strong>inválido!</strong>");
  }
}
