const NAME_COOKIE_GENERATOR_CNPJ = "nv-cookie-generator-cnpj";

$(document).ready(() => {
    setCookieGeneratorCnpj();
    getCnpj();
});

$("#nv-new-generator-cnpj").click(() => {
    getCnpj();
});

$("#nv-new-generator-copy-cnpj").click(() => {
  	getCnpj();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getCnpj();
        copy(".nv-field-copy");
    }
});

function getCnpj() {
    registerBi();

    const n1 = Math.round(Math.random() * 9);
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);
    const n9 = 0;
    const n10 = 0;
    const n11 = 0;
    const n12 = 1;
    let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;
    let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;

    const field = $("#nv-field-generator-cnpj");
    const cookie = getCookie(`${NAME_COOKIE_GENERATOR_CNPJ}`) === "true";
    const cnpj = cookie
        ? `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`
        : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;

    field.val(cnpj).text(cnpj);
}

function mod(dividend, divider) {
    return Math.round(dividend - (Math.floor(dividend / divider) * divider));
}

function setCookieGeneratorCnpj() {
  	const checkbox = $(`#${NAME_COOKIE_GENERATOR_CNPJ}`);
  	checkbox.change(() => {
    		setCookie(`${NAME_COOKIE_GENERATOR_CNPJ}`, checkbox.prop("checked"));
        formatCnpj(checkbox.prop("checked"));
  	})
  	checkbox.attr("checked", getCookie(`${NAME_COOKIE_GENERATOR_CNPJ}`) === "true");
}

function formatCnpj(format) {
    const field = $("#nv-field-generator-cnpj");
    const cnpj = format
        ? `${field.val().substring(0, 2)}.${field.val().substring(2, 5)}.${field.val().substring(5, 8)}/${field.val().substring(8, 12)}-${field.val().substring(12, 14)}`
        : field.val().replace(/[^0-9]/g,"");

    field.val(cnpj).text(cnpj);
}
