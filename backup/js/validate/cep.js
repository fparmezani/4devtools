let aux = "";

$(document).ready(() => {
  $(".mask-cep").mask("00000-000");
  $(".nv-result-cep").hide();
});

$("#nv-validate-cep").keyup(() => {
  validateCep();
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});
$(".nv-btn-textarea-copy-2").click(() => {
    copy(".nv-field-copy-2");
});
$(".nv-btn-textarea-copy-3").click(() => {
    copy(".nv-field-copy-3");
});
$(".nv-btn-textarea-copy-4").click(() => {
    copy(".nv-field-copy-4");
});
$(".nv-btn-textarea-copy-5").click(() => {
    copy(".nv-field-copy-5");
});

function validateCep() {
  let cep = $("#nv-validate-cep").val();
  cep = cep.replace(/\D/g, "");

  if (cep.length < 8) {
    responseValidateCep();
    return;
  }

  // evita busca de forma desnecessária
  if ($("#nv-validate-cep").attr("readonly") === "readonly") return;
  if ($("#nv-validate-cep").val() === $("#nv-field-cep").val()) return;
  if (aux === cep) {
    responseValidateCep("invalid");
    return;
  };
  aux = cep;

  responseValidateCep("search");
  searchCep();
}

function searchCep() {
  $("#nv-validate-cep").attr("readonly", true);

  const search = $.get({
    url: `${getBaseUrlApi()}/api/cep/search`,
    data: { "cep": $("#nv-validate-cep").val().replace(/\D/g, "") }
  }).then((data) => {
    registerBi();
    fillCepSearch(data)
  });
}

function fillCepSearch(data) {
  $("#nv-validate-cep").attr("readonly", false);

  if (data === false) {
    $(".nv-result-cep").hide();
    $("#nv-field-cep").val("");
    responseValidateCep("invalid");
    return;
  }

  const format = cep => `${cep.substring(0, 5)}-${cep.substring(5, 8)}`;
  const cep = data.cep;
  const street = data.type ? `${data.type} ${data.street}` : "";

  $(".nv-result-cep").show();
  $("#nv-field-cep").val(format(cep));
  $("#nv-field-street").val(street);
  $("#nv-field-neighborhood").val(data.neighborhood);
  $("#nv-field-city").val(data.city);
  $("#nv-field-state").val(data.state);

  responseValidateCep("valid");
}

function responseValidateCep(response) {
  const div = $("#nv-div-validate-cep");
  const spanIcon = $("#nv-span-icon-validate-cep");
  const spanText = $("#nv-span-text-validate-cep");

  div.removeClass("has-success has-error");
  spanIcon.removeClass("fa fa-search fa-check fa-close");
  spanText.html("");

  if (response === "search") {
    spanIcon.addClass("fa fa-search");
    spanText.html("Buscando CEP...");
  }

  if (response === "valid") {
    div.addClass("has-success");
    spanIcon.addClass("fa fa-check");
    spanText.html("CEP <strong>encontrado!</strong>");
  }

  if (response === "invalid") {
    div.addClass("has-error");
    spanIcon.addClass("fa fa-close");
    spanText.html("CEP <strong>não encontrado!</strong>");
  }
}
