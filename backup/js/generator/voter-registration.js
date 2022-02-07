const NAME_COOKIE_GENERATOR_VOTER_REGISTRATION = "nv-cookie-generator-voter-registration";

$(document).ready(() => {
    setCookieGeneratorVoterRegistration();
    getVoterRegistration();
});

$("#nv-new-generator-voter-registration").click(() => {
    getVoterRegistration();
});

$("#nv-new-generator-copy-voter-registration").click(() => {
  	getVoterRegistration();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getVoterRegistration();
        copy(".nv-field-copy");
    }
});

function getVoterRegistration() {
    registerBi();

    const n1 = Math.round(Math.random() * 9);
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);

    const state = $("#states-voter-registration").val().split("");
    const n9 = state[0];
    const n10 = state[1];

    let d1 = n1 * 2 + n2 * 3 + n3 * 4 + n4 * 5 + n5 * 6 + n6 * 7 + n7 * 8 + n8 * 9;
    d1 = d1 % 11;
    d1 = validateRestOfDivision(d1);

    let d2 = n9 * 7 + n10 * 8 + d1 * 9;
    d2 = d2 % 11;
    d2 = validateRestOfDivision(d2);

    const field = $("#nv-field-generator-voter-registration");
    const cookie = getCookie(`${NAME_COOKIE_GENERATOR_VOTER_REGISTRATION}`) === "true";
    const number = cookie
        ? `${n1}${n2}${n3}${n4} ${n5}${n6}${n7}${n8} ${n9}${n10}${d1}${d2}`
        : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${d1}${d2}`;

    field.val(number).text(number);
}

function validateRestOfDivision(dv) {
    if (dv === 10) {
        return 0;
    }

    if (dv === 0) {
        const state = $("#states-voter-registration").val();

        // para os títulos emitidos em São Paulo ou Minas Gerais...
        if (state === "01" || state === "02") {
            return 1;
        }
    }

    return dv;
}

function setCookieGeneratorVoterRegistration() {
  	const checkbox = $(`#${NAME_COOKIE_GENERATOR_VOTER_REGISTRATION}`);
  	checkbox.change(() => {
    		setCookie(`${NAME_COOKIE_GENERATOR_VOTER_REGISTRATION}`, checkbox.prop("checked"));
        formatVoterRegistration(checkbox.prop("checked"));
  	})
  	checkbox.attr("checked", getCookie(`${NAME_COOKIE_GENERATOR_VOTER_REGISTRATION}`) === "true");

    const states = $("#states-voter-registration");
    states.change(() => setCookie(states.attr("id"), states.val()))
    states.val(getCookie(states.attr("id")) || "01");
}

function formatVoterRegistration(format) {
    const field = $("#nv-field-generator-voter-registration");
    const number = format
        ? `${field.val().substring(0, 4)} ${field.val().substring(4, 8)} ${field.val().substring(8, 12)}`
        : field.val().replace(/[^0-9]/g,"");

    field.val(number).text(number);
}
