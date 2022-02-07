$(document).ready(() => {
    setCookieGeneratorCep();
    getCep();
});

$("#nv-new-generator-cep").click(() => {
  	getCep();
});

$("#nv-new-generator-copy-cep").click(() => {
    getCep(true);
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

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getCep(true);
    }
});

function getCep(copyField = false) {
    if ($("#nv-new-generator-cep").is(":disabled")) return; // used for enter

    disabledButtons(true);

    const search = $.get({
        url: `${getBaseUrlApi()}/api/cep/random-by-states`,
        data: { "state": $("#nv-state-cep").val() }
    }).then((data) => {
        registerBi();
        fillCepRandom(data);
        if (copyField) copy(".nv-field-copy");
    });
}

function fillCepRandom(data) {
    disabledButtons(false);

    const format = cep => `${cep.substring(0, 5)}-${cep.substring(5, 8)}`;
    const cep = data.cep;
    const street = data.type ? `${data.type} ${data.street}` : "";

    $("#nv-field-cep").val(format(cep));
    autosize($("#nv-field-street").val(street));
    autosize($("#nv-field-neighborhood").val(data.neighborhood));
    autosize($("#nv-field-city").val(data.city));
    $("#nv-field-state").val(data.state);
}

function setCookieGeneratorCep() {
    const states = $("#nv-state-cep");
    states.change(() => setCookie(states.attr("id"), states.val()));
    states.val(getCookie(states.attr("id")) || "SP");
}

function disabledButtons(value) {
    $("#nv-new-generator-cep, #nv-new-generator-copy-cep").prop("disabled", value);
    $(".nv-btn-copy").prop("disabled", value);
}
