$(document).ready(() => {
    setCookieMegaSena();
    getMegaSena();
});

$("#nv-new-mega-sena").click(() => {
    getMegaSena();
});

$("#nv-new-copy-mega-sena").click(() => {
  	getMegaSena();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getMegaSena();
        copy(".nv-field-copy");
    }
});

function getMegaSena() {
    registerBi();

    let arr = [];

    while (arr.length < $("#quant-mega-sena").val()) {
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

    const field = $("#nv-field-mega-sena");
    field.val(arr);

    autosize(field);
}

function getRandomNumber() {
    const number = Math.floor((Math.random() * 60) + 1);
    return number < 10 ? `0${number}` : number;
}

function setCookieMegaSena() {
    const quant = $("#quant-mega-sena");
    quant.change(() => setCookie(quant.attr("id"), quant.val()))
    quant.val(getCookie(quant.attr("id")) || "6");
}
