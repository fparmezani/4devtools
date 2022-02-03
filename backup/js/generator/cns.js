const NAME_COOKIE_GENERATOR_CNS = "nv-cookie-generator-cns";

$(document).ready(() => {
    setCookieGeneratorCns();
    getCns();
});

$("#nv-new-generator-cns").click(() => {
    getCns();
});

$("#nv-new-generator-copy-cns").click(() => {
    getCns();
	  copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getCns();
        copy(".nv-field-copy");
    }
});

function getCns() {
    registerBi();

    let cns = 0;
    while (cns.length !== 15) {
        let n1 = Math.floor((Math.random() * 3) + 1);
        if (n1 === 3)
            n1 = Math.floor((Math.random() * 3) + 7);
        const n2 = Math.floor((Math.random() * 99999) + 1);
        const n3 = Math.floor((Math.random() * 99999) + 1);
        cns = n1 + ("0" + n2).slice(-5) + ("0" + n3).slice(-5);
        let soma = (((Number(cns.substring(0, 1))) * 15) +
            ((Number(cns.substring(1, 2))) * 14) +
            ((Number(cns.substring(2, 3))) * 13) +
            ((Number(cns.substring(3, 4))) * 12) +
            ((Number(cns.substring(4, 5))) * 11) +
            ((Number(cns.substring(5, 6))) * 10) +
            ((Number(cns.substring(6, 7))) * 9) +
            ((Number(cns.substring(7, 8))) * 8) +
            ((Number(cns.substring(8, 9))) * 7) +
            ((Number(cns.substring(9, 10))) * 6) +
            ((Number(cns.substring(10, 11))) * 5));
        let resto = soma % 11;
        let dv = 11 - resto;
        dv = (dv === 11) ? 0 : dv;
        if (dv === 10) {
            soma = (((Number(cns.substring(0, 1))) * 15) +
                ((Number(cns.substring(1, 2))) * 14) +
                ((Number(cns.substring(2, 3))) * 13) +
                ((Number(cns.substring(3, 4))) * 12) +
                ((Number(cns.substring(4, 5))) * 11) +
                ((Number(cns.substring(5, 6))) * 10) +
                ((Number(cns.substring(6, 7))) * 9) +
                ((Number(cns.substring(7, 8))) * 8) +
                ((Number(cns.substring(8, 9))) * 7) +
                ((Number(cns.substring(9, 10))) * 6) +
                ((Number(cns.substring(10, 11))) * 5) + 2);
            resto = soma % 11;
            dv = 11 - resto;
            cns += "001" + String(dv);
        } else {
            cns += "000" + String(dv);
        }
        if (cns.length === 15) {
            const field = $("#nv-field-generator-cns");
            const cookie = getCookie(`${NAME_COOKIE_GENERATOR_CNS}`) === "true";
            const cnsReturn = cookie
                ? `${cns.substr(0, 3)} ${cns.substr(3, 4)} ${cns.substr(7, 4)} ${cns.substr(11, 4)}`
                : cns;

            field.val(cnsReturn).text(cnsReturn);
        }
    }
}

function setCookieGeneratorCns() {
  	const checkbox = $(`#${NAME_COOKIE_GENERATOR_CNS}`);
  	checkbox.change(() => {
    		setCookie(`${NAME_COOKIE_GENERATOR_CNS}`, checkbox.prop("checked"));
        formatCns(checkbox.prop("checked"));
  	})
  	checkbox.attr("checked", getCookie(`${NAME_COOKIE_GENERATOR_CNS}`) === "true");
}

function formatCns(format) {
    const field = $("#nv-field-generator-cns");
    const cns = format
        ? `${field.val().substr(0, 3)} ${field.val().substr(3, 4)} ${field.val().substr(7, 4)} ${field.val().substr(11, 4)}`
        : field.val().replace(/[^0-9]/g,"");

    field.val(cns).text(cns);
}
