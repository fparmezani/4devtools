$(document).ready(() => {
    getLotomania();
});

$("#nv-new-lotomania").click(() => {
    getLotomania();
});

$("#nv-new-copy-lotomania").click(() => {
    getLotomania();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getLotomania();
        copy(".nv-field-copy");
    }
});

function getLotomania() {
    registerBi();

    let arr = [];

    while (arr.length < 50) {
        let number = getRandomNumber();
        if (!arr.includes(number)) {
            arr.push(number);
        }
    }

    arr = arr.sort((a, b) => a - b);

    arr.forEach((value, i) => {
        if (i === 9 || i === 19 || i === 29 || i === 39) {
            arr[i] = `${value}  \n`;
        } else {
            arr[i] = `${value}  `;
        }
        if (value === 100) arr[i] = "00";
    });

    arr = arr.join("");

    const field = $("#nv-field-lotomania");
    field.val(arr);

    autosize(field);
}

function getRandomNumber() {
    const number = Math.floor((Math.random() * 100) + 1);
    return number < 10 ? `0${number}` : number;
}
