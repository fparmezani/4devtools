$(document).ready(() => {
    setCookieGeneratorTelephone();
    getTelephone();
});

$("#nv-new-generator-telephone").click(() => {
    getTelephone();
});

$("#nv-new-generator-copy-telephone").click(() => {
  	getTelephone();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getTelephone();
        copy(".nv-field-copy");
    }
});

function getTelephone() {
    registerBi();

    const ddd = getDDDTelephone();

    const n1 = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);

    const field = $("#nv-field-generator-telephone");
    const telephone = `(${ddd}) ${n1}${n2}${n3}${n4}-${n5}${n6}${n7}${n8}`;

    field.val(telephone).text(telephone);
}

function getDDDTelephone() {
    const ddds = {
        "AC": [68],
        "AL": [82],
        "AM": [92, 97],
        "AP": [96],
        "BA": [71, 73, 74, 75, 77],
        "CE": [85, 88],
        "DF": [61],
        "ES": [27, 28],
        "GO": [62, 64],
        "MA": [98, 99],
        "MG": [31, 32, 33, 34, 35, 37, 38],
        "MS": [67],
        "MT": [65, 66],
        "PA": [91, 93, 94],
        "PB": [83],
        "PE": [81, 87],
        "PI": [86, 89],
        "PR": [41, 42, 43, 44, 45, 46],
        "RJ": [21, 22, 24],
        "RN": [84],
        "RO": [69],
        "RR": [95],
        "RS": [51, 53, 54, 55],
        "SC": [47, 48, 49],
        "SE": [79],
        "SP": [11, 12, 13, 14, 15, 16, 17, 18, 19],
        "TO": [63]
    };

    const state = $("#ddd-states").val();

    if (state === "XX") {
        const keys = Object.keys(ddds);
        const random = ddds[keys[keys.length * Math.random() << 0]];
        return random[Math.floor(Math.random() * random.length)];
    }

    const dddState = ddds[state];
    return dddState[Math.floor(Math.random() * dddState.length)];
}

function setCookieGeneratorTelephone() {
    const states = $("#ddd-states");
    states.change(() => setCookie(states.attr("id"), states.val()))
    states.val(getCookie(states.attr("id")) || "XX");
}
