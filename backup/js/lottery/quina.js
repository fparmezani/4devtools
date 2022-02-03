$(document).ready(() => {
    setCookieQuina();
    getQuina();
});

$("#nv-new-quina").click(() => {
    getQuina();
});

$("#nv-new-copy-quina").click(() => {
  	getQuina();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getQuina();
        copy(".nv-field-copy");
    }
});

function getQuina() {
    registerBi();

    let arr = [];

    while (arr.length < $("#quant-quina").val()) {
        let number = getRandomNumber();
        if (!arr.includes(number)) {
            arr.push(number);
        }
    }

    arr = arr.sort((a, b) => a - b);

    arr.forEach((value, i) => {
        arr[i] = `${value}  `;
    });

    arr = arr.join("");

    const field = $("#nv-field-quina");
    field.val(arr);

    autosize(field);
}

function getRandomNumber() {
    const number = Math.floor((Math.random() * 80) + 1);
    return number < 10 ? `0${number}` : number;
}

function setCookieQuina() {
    const quant = $("#quant-quina");
    quant.change(() => setCookie(quant.attr("id"), quant.val()))
    quant.val(getCookie(quant.attr("id")) || "5");
}
