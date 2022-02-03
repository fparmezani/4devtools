$(document).ready(() => {
    setCookieLotofacil();
    getLotofacil();
});

$("#nv-new-lotofacil").click(() => {
    getLotofacil();
});

$("#nv-new-copy-lotofacil").click(() => {
  	getLotofacil();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getLotofacil();
        copy(".nv-field-copy");
    }
});

function getLotofacil() {
    registerBi();

    let arr = [];

    while (arr.length < $("#quant-lotofacil").val()) {
        let number = getRandomNumber();
        if (!arr.includes(number)) {
            arr.push(number);
        }
    }

    arr = arr.sort((a, b) => a - b);

    arr.forEach((value, i) => {
        if (i === 4 || i === 9 || i === 14) {
            arr[i] = `${value}  \n`;
        } else {
            arr[i] = `${value}  `;
        }
    });

    arr = arr.join("");

    const field = $("#nv-field-lotofacil");
    field.val(arr);

    autosize(field);
}

function getRandomNumber() {
    const number = Math.floor((Math.random() * 25) + 1);
    return number < 10 ? `0${number}` : number;
}

function setCookieLotofacil() {
    const quant = $("#quant-lotofacil");
    quant.change(() => setCookie(quant.attr("id"), quant.val()))
    quant.val(getCookie(quant.attr("id")) || "15");
}
