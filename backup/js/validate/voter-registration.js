$(document).ready(() => {
    $(".mask-voter-registration").mask("0000 0000 00000");
});

$("#nv-validate-voter-registration").keyup(() => {
    validateVoterRegistration();
});

function validateVoterRegistration() {
    let number = $("#nv-validate-voter-registration").val();
    number = number.replace(/\D/g, "");

    if (!isValidLength(number)) {
        responseValidateVoterRegistration();
        return;
    }

    registrationBi(number);

    if (!isValidRepeatNumbers(number) ||
        !isValidState(number) ||
        !isValidFirstDigit(number) ||
        !isValidSecondDigit(number)) {
        responseValidateVoterRegistration("invalid");
        return;
    }

    responseValidateVoterRegistration("valid");
}

function isValidLength(number) {
    if (number.length < 12) {
        return false;
    }

    return true;
}

function registrationBi(number) {
    const last = window.sessionStorage.getItem("nv-session-validate-voter-registration");

    if (last !== number) {
        registerBi();
        window.sessionStorage.setItem("nv-session-validate-voter-registration", number);
    }
}

function isValidRepeatNumbers(number) {
    if (number.match(/(\d)\1{12}/)) {
        return false;
    }

    return true;
}

function isValidState(number) {
    const stateValid = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
    const validateState = state => $.inArray(parseInt(state), stateValid) !== -1
    const state = number.substr(number.length - 4, 2);

    if (!validateState(state)) {
        return false;
    }

    return true;
}

function isValidFirstDigit(number) {
    const arrNumbers = number.split("").splice(0, number.length - 4).reverse();
    const state = number.substr(number.length - 4, 2);
    const digitInformed = parseInt(number.substr(number.length - 2, 1));

    let sum = 0;
    let aux = 9;

    arrNumbers.forEach((item, i) => {
        sum = sum + (parseInt(item) * aux);
        aux--;
    });

    let digitValid = sum % 11;
    digitValid = validateRestOfDivision(digitValid, state);

    if (digitValid !== digitInformed) {
        return false;
    }

    return true;
}

function isValidSecondDigit(number) {
    const arrNumbers =  number.split("").splice(number.length - 4, 3).reverse();
    const state = number.substr(number.length - 4, 2);
    const digitInformed = parseInt(number.substr(number.length - 1, 1));

    let sum = 0;
    let aux = 9;

    arrNumbers.forEach((item, i) => {
        sum = sum + (parseInt(item) * aux);
        aux--;
    });

    let digitValid = sum % 11;
    digitValid = validateRestOfDivision(digitValid, state);

    if (digitValid !== digitInformed) {
        return false;
    }

    return true;
}

function validateRestOfDivision(dv, state) {
    if (dv === 10) {
        return 0;
    }

    if (dv === 0) {
        // para os títulos emitidos em São Paulo ou Minas Gerais...
        if (state === "01" || state === "02") {
            return 1;
        }
    }

    return dv;
}

function responseValidateVoterRegistration(response) {
    const div = $("#nv-div-validate-voter-registration");
    const spanIcon = $("#nv-span-icon-validate-voter-registration");
    const spanText = $("#nv-span-text-validate-voter-registration");

    div.removeClass("has-success has-error");
    spanIcon.removeClass("fa fa-check fa-close");
    spanText.html("");

    if (response === "valid") {
        div.addClass("has-success");
        spanIcon.addClass("fa fa-check");
        spanText.html("Título de Eleitor <strong>válido!</strong>");
    }

    if (response === "invalid") {
        div.addClass("has-error");
        spanIcon.addClass("fa fa-close");
        spanText.html("Título de Eleitor <strong>inválido!</strong>");
    }
}
