$(document).ready(() => {
    $(".mask-pis-pasep").mask("000.00000.00-0");
});

$("#nv-validate-pis-pasep").keyup(() => {
    validatePisPasep();
})

function validatePisPasep() {
    let pis = $("#nv-validate-pis-pasep").val();
    pis = pis.replace(/\D/g, "");

    if (pis.length < 11) {
        responseValidatePisPasep();
        return;
    }

    const last = window.sessionStorage.getItem("nv-session-validate-pis-pasep");
    if (last !== pis) {
        registerBi();
        window.sessionStorage.setItem("nv-session-validate-pis-pasep", pis);
    }

    const arrNumbers = pis.split("");

    const n1 = parseInt(arrNumbers[0]) * 3;
    const n2 = parseInt(arrNumbers[1]) * 2;
    const n3 = parseInt(arrNumbers[2]) * 9;
    const n4 = parseInt(arrNumbers[3]) * 8;
    const n5 = parseInt(arrNumbers[4]) * 7;
    const n6 = parseInt(arrNumbers[5]) * 6;
    const n7 = parseInt(arrNumbers[6]) * 5;
    const n8 = parseInt(arrNumbers[7]) * 4;
    const n9 = parseInt(arrNumbers[8]) * 3;
    const n10 = parseInt(arrNumbers[9]) * 2;

    const sum = n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + n10;

    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) {
        digit = 0;
    }

    responseValidatePisPasep(parseInt(arrNumbers[10]) === digit ? "valid" : "invalid");
}

function responseValidatePisPasep(response) {
    const div = $("#nv-div-validate-pis-pasep");
    const spanIcon = $("#nv-span-icon-validate-pis-pasep");
    const spanText = $("#nv-span-text-validate-pis-pasep");

    div.removeClass("has-success has-error");
    spanIcon.removeClass("fa fa-check fa-close");
    spanText.html("");

    if (response === "valid") {
        div.addClass("has-success");
        spanIcon.addClass("fa fa-check");
        spanText.html("PIS/PASEP <strong>válido!</strong>");
    }

    if (response === "invalid") {
        div.addClass("has-error");
        spanIcon.addClass("fa fa-close");
        spanText.html("PIS/PASEP <strong>inválido!</strong>");
    }
}
