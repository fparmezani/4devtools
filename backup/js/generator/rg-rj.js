const NAME_COOKIE_GENERATOR_RG_RJ = "nv-cookie-generator-rg-rj";

$(document).ready(() => {
    setCookieGeneratorRgRj();
    getRgRj();
});

$("#nv-new-generator-rg-rj").click(() => {
    getRgRj();
});

$("#nv-new-generator-copy-rg-rj").click(() => {
  	getRgRj();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getRgRj();
        copy(".nv-field-copy");
    }
});

function getRgRj() {
    registerBi();

    const arr = [];
    arr.push(Math.floor((Math.random() * 4) + 1));
    for (var i = 1; i < 8; i++) {
        arr.push(Math.round(Math.random() * 9))
    }

    let sum = 0;
    let aux = false;
    let ninesOut = 0;
    arr.forEach((value, i) => {
        ninesOut = parseInt(value) * (aux ? 2 : 1); // false = 1 vs true = 2
        ninesOut = ninesOut > 9 ? ninesOut - 9 : ninesOut;
        sum = sum + ninesOut;
        aux = !aux;
        ninesOut = 0;
    });

    let digit = 10 - (sum % 10);
    if (digit === 10)
        digit = 0;

    const field = $("#nv-field-generator-rg-rj");
    const cookie = getCookie(`${NAME_COOKIE_GENERATOR_RG_RJ}`) === "true";
    const rg = cookie
        ? `${arr[0]}${arr[1]}.${arr[2]}${arr[3]}${arr[4]}.${arr[5]}${arr[6]}${arr[7]}-${digit}`
        : `${arr.join("")}${digit}`

    field.val(rg).text(rg);
}

function setCookieGeneratorRgRj() {
  	const checkbox = $(`#${NAME_COOKIE_GENERATOR_RG_RJ}`);
  	checkbox.change(() => {
    		setCookie(`${NAME_COOKIE_GENERATOR_RG_RJ}`, checkbox.prop("checked"));
        formatRgRj(checkbox.prop("checked"));
  	})
  	checkbox.attr("checked", getCookie(`${NAME_COOKIE_GENERATOR_RG_RJ}`) === "true");
}

function formatRgRj(format) {
    const field = $("#nv-field-generator-rg-rj");
    const rg = format
        ? `${field.val().substr(0, 2)}.${field.val().substr(2, 3)}.${field.val().substr(5, 3)}-${field.val().substr(8, 1)}`
        : field.val().replace(/[^0-9]/g,"");

    field.val(rg).text(rg);
}
