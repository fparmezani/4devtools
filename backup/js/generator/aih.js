const NAME_COOKIE_GENERATOR_AIH = "nv-cookie-generator-aih";

$(document).ready(() => {
    setCookieGeneratorAih();
    getAih();
});

$("#nv-new-generator-aih").click(() => {
    getAih();
});

$("#nv-new-generator-copy-aih").click(() => {
  	getAih();
    copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getAih();
        copy(".nv-field-copy");
    }
});

function getAih() {
    registerBi();

    const states = $("#states-aih").val();
    const type = $("#type-aih").val();
    const year = $("#year-aih").val().length === 4 ? $("#year-aih").val() : new Date().getFullYear();
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);
    const n9 = Math.round(Math.random() * 9);
    const n10 = Math.round(Math.random() * 9);
    const n11 = Math.round(Math.random() * 9);
    const n12 = Math.round(Math.random() * 9);
    const d1 = states + year.substr(2, 2) + type + n6 + n7 + n8 + n9 + n10 + n11 + n12;
    const d2 = Math.floor(d1 / 11);
    const d3 = d1 - d2;
    const dv = d3.toString().substr(-1);

    const field = $("#nv-field-generator-aih");
    const cookie = getCookie(`${NAME_COOKIE_GENERATOR_AIH}`) === "true";
    const aih = cookie
        ? `${d1}-${dv}`
        : `${d1}${dv}`;

    field.val(aih).text(aih);
}

function setCookieGeneratorAih() {
  	const checkbox = $(`#${NAME_COOKIE_GENERATOR_AIH}`);
  	checkbox.change(() => {
        setCookie(`${NAME_COOKIE_GENERATOR_AIH}`, checkbox.prop("checked"));
        formatAih(checkbox.prop("checked"));
    })
    checkbox.attr("checked", getCookie(`${NAME_COOKIE_GENERATOR_AIH}`) === "true");

    const states = $("#states-aih");
    states.change(() => setCookie(states.attr("id"), states.val()))
    states.val(getCookie(states.attr("id")) || 35);

    const year = $("#year-aih");
    year.change(() => setCookie(year.attr("id"), year.val()))
    year.val(getCookie(year.attr("id")) || new Date().getFullYear());

  	const type = $("#type-aih");
    type.change(() => setCookie(type.attr("id"), type.val()))
    type.val(getCookie(type.attr("id")) || 1);
}

function formatAih(format) {
    const field = $("#nv-field-generator-aih");
    const aih = format
        ? `${field.val().substring(0, 12)}-${field.val().substring(12, 13)}`
        : field.val().replace(/[^0-9]/g,"");

    field.val(aih).text(aih);
}
