$(document).ready(() => {
    setCookieLuckyDay();
    getLuckyDay();
});

$("#nv-new-lucky-day").click(() => {
    getLuckyDay();
});

$("#nv-new-copy-lucky-day").click(() => {
  	getLuckyDay();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getLuckyDay();
        copy(".nv-field-copy");
    }
});

function getLuckyDay() {
    registerBi();

    let arr = [];

    while (arr.length < $("#quant-lucky-day").val()) {
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

    const month = getRandomMonth();
    arr = `${arr}-  Mês da Sorte: ${month}`;

    const field = $("#nv-field-lucky-day");
    field.val(arr);

    autosize(field);
}

function getRandomNumber() {
    const number = Math.floor((Math.random() * 31) + 1);
    return number < 10 ? `0${number}` : number;
}

function getRandomMonth() {
    const arr = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];
    const index = Math.floor((Math.random() * 12));
    return arr[index];
}

function setCookieLuckyDay() {
    const quant = $("#quant-lucky-day");
    quant.change(() => setCookie(quant.attr("id"), quant.val()))
    quant.val(getCookie(quant.attr("id")) || "7");
}
