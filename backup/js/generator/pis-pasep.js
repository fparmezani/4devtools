const NAME_COOKIE_GENERATOR_PIS_PASEP = "nv-cookie-generator-pis-pasep";

$(document).ready(() => {
    setCookieGeneratorPisPasep();
    getPisPasep();
});

$("#nv-new-generator-pis-pasep").click(() => {
    getPisPasep();
});

$("#nv-new-generator-copy-pis-pasep").click(() => {
  	getPisPasep();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getPisPasep();
        copy(".nv-field-copy");
    }
});

function getPisPasep() {
    registerBi();

    const n1 = Math.round(Math.random() * 9);
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);
    const n9 = Math.round(Math.random() * 9);
    const n10 = Math.round(Math.random() * 9);

    const sum = n1 * 3 + n2 * 2 + n3 * 9 + n4 * 8 + n5 * 7 + n6 * 6 + n7 * 5 + n8 * 4 + n9 * 3 + n10 * 2;

    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) {
        digit = 0;
    }

    const field = $("#nv-field-generator-pis-pasep");
    const cookie = getCookie(`${NAME_COOKIE_GENERATOR_PIS_PASEP}`) === "true";
    const pisPasep = cookie
        ? `${n1}${n2}${n3}.${n4}${n5}${n6}${n7}${n8}.${n9}${n10}-${digit}`
        : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${digit}`;

    field.val(pisPasep).text(pisPasep);
}

function setCookieGeneratorPisPasep() {
  	const checkbox = $(`#${NAME_COOKIE_GENERATOR_PIS_PASEP}`);
  	checkbox.change(() => {
    		setCookie(`${NAME_COOKIE_GENERATOR_PIS_PASEP}`, checkbox.prop("checked"));
        formatPisPasep(checkbox.prop("checked"));
  	})
  	checkbox.attr("checked", getCookie(`${NAME_COOKIE_GENERATOR_PIS_PASEP}`) === "true");
}

function formatPisPasep(format) {
    const field = $("#nv-field-generator-pis-pasep");
    const pisPasep = format
        ? `${field.val().substring(0, 3)}.${field.val().substring(3, 8)}.${field.val().substring(8, 10)}-${field.val().substring(10, 11)}`
        : field.val().replace(/[^0-9]/g,"");

    field.val(pisPasep).text(pisPasep);
}
