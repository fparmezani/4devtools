$(document).ready(() => {
    setCookieDuplaSena();
    getDuplaSena();
});

$("#nv-new-dupla-sena").click(() => {
    getDuplaSena();
});

$("#nv-new-copy-dupla-sena").click(() => {
  	getDuplaSena();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy-2").click(() => {
    copy(".nv-field-copy-2");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getDuplaSena();
        copy(".nv-field-copy");
    }
});

function getDuplaSena() {
    registerBi();

    const field1 = $("#nv-field-dupla-sena-1");
    const field2 = $("#nv-field-dupla-sena-2");

    const sorcerer1 = getNumbers();
    const sorcerer2 = getNumbers();

    field1.val(sorcerer1);
    field2.val(sorcerer2);

    autosize(field1);
    autosize(field2);
}

function getNumbers() {
    let arr = [];

    while (arr.length < $("#quant-dupla-sena").val()) {
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

    return arr;
}

function getRandomNumber() {
    const number = Math.floor((Math.random() * 50) + 1);
    return number < 10 ? `0${number}` : number;
}

function setCookieDuplaSena() {
    const quant = $("#quant-dupla-sena");
    quant.change(() => setCookie(quant.attr("id"), quant.val()))
    quant.val(getCookie(quant.attr("id")) || "6");
}
