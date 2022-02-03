$(document).ready(() => {
    $(".mask-cnh").mask("00000000000");
});

$("#nv-validate-cnh").keyup(() => {
    validateCnh();
})

function validateCnh() {
    let cnh = $("#nv-validate-cnh").val();
    cnh = cnh.replace(/\D/g, "");

    if (cnh.length < 11) {
        responseValidateCnh();
        return;
    }

    const last = window.sessionStorage.getItem("nv-session-validate-cnh");
    if (last !== cnh) {
        registerBi();
        window.sessionStorage.setItem("nv-session-validate-cnh", cnh);
    }

    // validate repeat numbers
    if (cnh.match(/(\d)\1{10}/)) {
        responseValidateCnh("invalid");
        return;
    }

    const arrNumbers = cnh.split("");

    const n1 = parseInt(arrNumbers[0]);
    const n2 = parseInt(arrNumbers[1]);
    const n3 = parseInt(arrNumbers[2]);
    const n4 = parseInt(arrNumbers[3]);
    const n5 = parseInt(arrNumbers[4]);
    const n6 = parseInt(arrNumbers[5]);
    const n7 = parseInt(arrNumbers[6]);
    const n8 = parseInt(arrNumbers[7]);
    const n9 = parseInt(arrNumbers[8]);
    const dv1 = parseInt(arrNumbers[9]);
    const dv2 = parseInt(arrNumbers[10]);

    let aux = 0;

    const sumDv1 = n1 * 9 + n2 * 8 + n3 * 7 + n4 * 6 + n5 * 5 + n6 * 4 + n7 * 3 + n8 * 2 + n9 * 1;
    let dv1Valid = sumDv1 % 11;
    if (dv1Valid >= 10) {
        dv1Valid = 0;
        aux = 2;
    }

    const sumDv2 = n1 * 1 + n2 * 2 + n3 * 3 + n4 * 4 + n5 * 5 + n6 * 6 + n7 * 7 + n8 * 8 + n9 * 9;
    let dv2Valid = sumDv2 % 11;
    dv2Valid = dv2Valid >= 10
        ? 0
        : dv2Valid - aux;

    if (dv1 !== dv1Valid || dv2 !== dv2Valid) {
        responseValidateCnh("invalid");
        return;
    }

    responseValidateCnh("valid");
}

function responseValidateCnh(response) {
    const div = $("#nv-div-validate-cnh");
    const spanIcon = $("#nv-span-icon-validate-cnh");
    const spanText = $("#nv-span-text-validate-cnh");

    div.removeClass("has-success has-error");
    spanIcon.removeClass("fa fa-check fa-close");
    spanText.html("");

    if (response === "valid") {
        div.addClass("has-success");
        spanIcon.addClass("fa fa-check");
        spanText.html("CNH <strong>válida!</strong>");
    }

    if (response === "invalid") {
        div.addClass("has-error");
        spanIcon.addClass("fa fa-close");
        spanText.html("CNH <strong>inválida!</strong>");
    }
}
