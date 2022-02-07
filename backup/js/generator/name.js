$(document).ready(() => {
    setCookieGeneratorName();
    getName();
});

$("#nv-new-generator-name").click(() => {
	  getName();
});

$("#nv-new-generator-copy-name").click(() => {
    getName(true);
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getName(true);
    }
});

function getName(copyField = false) {
    if ($("#nv-new-generator-name").is(":disabled")) return; // used for enter

    disabledButtons(true);

    const sex = $("#nv-type-sex").val();
    const data = sex !== "x"
        ? { "sex": sex }
        : null;

    const search = $.get({
        url: `${getBaseUrlApi()}/api/generator-name`,
        data: data
    }).then((data) => {
        registerBi();
        fillName(data);
        if (copyField) copy(".nv-field-copy");
    });
}

function fillName(data) {
    disabledButtons(false);

    const field = $("#nv-field-generator-name");
    field.val(data.fullname);

    autosize(field);
}

function disabledButtons(enable) {
    $("#nv-new-generator-name, #nv-new-generator-copy-name").prop("disabled", enable);
    $(".nv-btn-copy").prop("disabled", enable);
}

function setCookieGeneratorName() {
    const sex = $("#nv-type-sex");
    sex.change(() => setCookie(sex.attr("id"), sex.val()))
    sex.val(getCookie(sex.attr("id")) || "x");
}
