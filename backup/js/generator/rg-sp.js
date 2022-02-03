const NAME_COOKIE_GENERATOR_RG_SP = "nv-cookie-generator-rg-sp";

$(document).ready(() => {
    setCookieGeneratorRgSp();
    getRgSp();
});

$("#nv-new-generator-rg-sp").click(() => {
    getRgSp();
});

$("#nv-new-generator-copy-rg-sp").click(() => {
  	getRgSp();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getRgSp();
        copy(".nv-field-copy");
    }
});

function getRgSp() {
    registerBi();

    const n1 = Math.floor((Math.random() * 4) + 1)
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);

    const sum = n1 * 2 + n2 * 3 + n3 * 4 + n4 * 5 + n5 * 6 + n6 * 7 + n7 * 8 + n8 * 9;
    let digit = 11 - (sum % 11);
    if (digit === 11)
        digit = 0;
    if (digit === 10)
        digit = "X";

    const field = $("#nv-field-generator-rg-sp");
    const cookie = getCookie(`${NAME_COOKIE_GENERATOR_RG_SP}`) === "true";
    const rg = cookie
        ? `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}-${digit}`
        : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${digit}`

    field.val(rg).text(rg);
}

function setCookieGeneratorRgSp() {
  	const checkbox = $(`#${NAME_COOKIE_GENERATOR_RG_SP}`);
  	checkbox.change(() => {
    		setCookie(`${NAME_COOKIE_GENERATOR_RG_SP}`, checkbox.prop("checked"));
        formatRgSp(checkbox.prop("checked"));
  	})
  	checkbox.attr("checked", getCookie(`${NAME_COOKIE_GENERATOR_RG_SP}`) === "true");
}

function formatRgSp(format) {
    const field = $("#nv-field-generator-rg-sp");
    const rg = format
        ? `${field.val().substr(0, 2)}.${field.val().substr(2, 3)}.${field.val().substr(5, 3)}-${field.val().substr(8, 1)}`
        : field.val().replace(/[^a-zA-Z0-9]/g,"");

    field.val(rg).text(rg);
}
