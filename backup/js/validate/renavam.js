$(document).ready(() => {
    $(".mask-renavam").mask("00000000000");
});

$("#nv-validate-renavam").keyup(() => {
    validateRenavam();
})

function validateRenavam() {
    let renavam = $("#nv-validate-renavam").val();
    renavam = renavam.replace(/\D/g, "");

    if (renavam.length < 11) {
        responseValidateRenavam();
        return;
    }

    const last = window.sessionStorage.getItem("nv-session-validate-renavam");
    if (last !== renavam) {
        registerBi();
        window.sessionStorage.setItem("nv-session-validate-renavam", renavam);
    }

    // validate repeat numbers
    if (renavam.match(/(\d)\1{10}/)) {
        responseValidateRenavam("invalid");
        return;
    }

    const arrNumbers = renavam.split("");

    const n1 = parseInt(arrNumbers[0]);
    const n2 = parseInt(arrNumbers[1]);
    const n3 = parseInt(arrNumbers[2]);
    const n4 = parseInt(arrNumbers[3]);
    const n5 = parseInt(arrNumbers[4]);
    const n6 = parseInt(arrNumbers[5]);
    const n7 = parseInt(arrNumbers[6]);
    const n8 = parseInt(arrNumbers[7]);
    const n9 = parseInt(arrNumbers[8]);
    const n10 = parseInt(arrNumbers[9]);
    const digitInformed = parseInt(arrNumbers[10]);

    const sum = n10 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 2 + n1 * 3;
    let digitValid = 11 - sum % 11;

    if (digitValid >= 10) {
        digitValid = 0;
    }

    if (digitValid !== digitInformed) {
        responseValidateRenavam("invalid");
        return;
    }

    responseValidateRenavam("valid");
}

function responseValidateRenavam(response) {
    const div = $("#nv-div-validate-renavam");
    const spanIcon = $("#nv-span-icon-validate-renavam");
    const spanText = $("#nv-span-text-validate-renavam");

    div.removeClass("has-success has-error");
    spanIcon.removeClass("fa fa-check fa-close");
    spanText.html("");

    if (response === "valid") {
        div.addClass("has-success");
        spanIcon.addClass("fa fa-check");
        spanText.html("Renavam <strong>válido!</strong>");
    }

    if (response === "invalid") {
        div.addClass("has-error");
        spanIcon.addClass("fa fa-close");
        spanText.html("Renavam <strong>inválido!</strong>");
    }
}
