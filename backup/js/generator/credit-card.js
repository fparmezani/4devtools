const NAME_COOKIE_GENERATOR_CREDIT_CARD = "nv-cookie-generator-credit-card";

$(document).ready(() => {
    setCookieGeneratorCreditCard();
    getCreditCard();
});

$("#nv-new-generator-credit-card").click(() => {
    getCreditCard();
});

$("#nv-new-generator-copy-credit-card").click(() => {
    getCreditCard();
    copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy-2").click(() => {
    copy(".nv-field-copy-2");
});

$(".nv-btn-textarea-copy-3").click(() => {
    copy(".nv-field-copy-3");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getCreditCard();
        copy(".nv-field-copy");
    }
});

function getCreditCard() {
    registerBi();

    const arr = getBanner();
    const length = 16 - arr.length;
    for (var i = 1; i < length; i++) {
        arr.push(Math.round(Math.random() * 9))
    }

    let sum = 0;
    let aux = true;
    let ninesOut = 0;
    arr.forEach((value, i) => {
        ninesOut = parseInt(value) * (aux ? 2 : 1); // false = 1 vs true = 2
        ninesOut = ninesOut > 9 ? ninesOut - 9 : ninesOut;
        sum = sum + ninesOut;
        aux = !aux;
        ninesOut = 0;
    });

    let digit = 10 - (sum % 10);
    if (digit == 10)
        digit = 0;

    const fieldNumber = $("#nv-field-number");
    const cookie = getCookie(`${NAME_COOKIE_GENERATOR_CREDIT_CARD}`) === "true";
    const card = cookie
        ? `${arr[0]}${arr[1]}${arr[2]}${arr[3]} ${arr[4]}${arr[5]}${arr[6]}${arr[7]} ${arr[8]}${arr[9]}${arr[10]}${arr[11]} ${arr[12]}${arr[13]}${arr[14]}${digit}`
        : `${arr.join("")}${digit}`;
    fieldNumber.val(card).text(card);

    const fieldCvv = $("#nv-field-cvv");
    const cvv = randomCvv();
    fieldCvv.val(cvv).text(cvv);

    const fieldExpirationDate = $("#nv-field-expiration-date");
    const date = randomExpirationDate();
    fieldExpirationDate.val(date).text(date);
}

function getBanner() {
    let jsonNumbers = {
        "visa": [4],
        "mastercard": [51, 52, 53, 54, 55],
        "elo": [636368, 438935, 504175, 451416],
        "discover": [6011, 622, 65],
        "jcb": [35]
    };

    const auxRandom = [];
    for (banner in jsonNumbers) {
        jsonNumbers[banner].map(value => auxRandom.push(value));
    }
    jsonNumbers["random"] = auxRandom;

    const state = $("#nv-banner-card").val();
    const arrNumber = jsonNumbers[state];

    let number = arrNumber[Math.floor(Math.random() * arrNumber.length)];
    number = number.toString().split("");
    number = number.map(Number);

    return number;
}

function randomExpirationDate() {
    let month = "0" + (Math.floor(Math.random() * 12) + 1).toString();
    month = month.substr(month.length - 2);

    const arrMonth31Days = ["01", "03", "05", "07", "08", "10", "12"];
    const arrMonth30Days = ["04", "06", "09", "11"];
    const randomDay = $.inArray(month, arrMonth31Days) !== -1
        ? 31
        : $.inArray(month, arrMonth30Days) !== -1
        ? 30
        : 28;

    let day = "0" + (Math.floor(Math.random() * randomDay) + 1).toString();
    day = day.substr(day.length - 2);

    const year = new Date().getFullYear() + Math.floor(Math.random() * 10) + 1;

    return `${day}/${month}/${year}`;
}

function randomCvv() {
    let random = Math.floor(Math.random() * 999) + 1;
    let cvv = "00" + random.toString();
    return cvv.substr(cvv.length - 3);
}

function setCookieGeneratorCreditCard() {
  	const checkbox = $(`#${NAME_COOKIE_GENERATOR_CREDIT_CARD}`);
  	checkbox.change(() => {
    		setCookie(`${NAME_COOKIE_GENERATOR_CREDIT_CARD}`, checkbox.prop("checked"));
        formatCreditCard(checkbox.prop("checked"));
  	})
  	checkbox.attr("checked", getCookie(`${NAME_COOKIE_GENERATOR_CREDIT_CARD}`) === "true");

    const banner = $("#nv-banner-card");
    banner.change(() => setCookie(banner.attr("id"), banner.val()));
    banner.val(getCookie(banner.attr("id")) || "random");
}

function formatCreditCard(format) {
    const field = $("#nv-field-number");
    const card = format
        ? `${field.val().substr(0, 4)} ${field.val().substr(4, 4)} ${field.val().substr(8, 4)} ${field.val().substr(12, 4)}`
        : field.val().replace(/[^a-zA-Z0-9]/g,"");

    field.val(card).text(card);
}
