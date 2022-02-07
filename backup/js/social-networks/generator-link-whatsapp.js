$(document).ready(() => {
    $(".mask-cellphone").mask("(00) 00000-0000");
});

$("#nv-new-generator-link-whatsapp").click(() => {
    generatorLinkWhatsApp();
});

$(".nv-btn-refresh-link-whatsapp").click(() => {
    refreshGeneratorLinkWhatsApp();
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

function generatorLinkWhatsApp() {
    const number = $("#nv-generator-link-whatsapp-number").val().replace(/\D/g, "");

    if (number.length < 11) {
        responseInvalidNumber();
        return;
    }

    registerBi();

    const message = $("#nv-generator-link-whatsapp-message").val();

    const link = `https://api.whatsapp.com/send?phone=55${number}&text=${encodeURIComponent(message)}`;
    $("#nv-generator-link-whatsapp-link").val(link);

    toggleLinkWhatsApp();
}

function toggleLinkWhatsApp() {
    $("#nv-generator-link-whatsapp-wrapper-data").toggle();
    $("#nv-generator-link-whatsapp-wrapper-link").toggle();

    $("#nv-new-generator-link-whatsapp").toggle();
    $(".nv-btn-copy").toggle();
    $(".nv-btn-refresh-link-whatsapp").toggle();
}

function refreshGeneratorLinkWhatsApp() {
    $("#nv-generator-link-whatsapp-number").val("")
    $("#nv-generator-link-whatsapp-message").val("")

    toggleLinkWhatsApp();
}

function responseInvalidNumber() {
    toastr.error("", "Digite um número válido!", {
        "positionClass": "toast-bottom-right",
        timeOut: 3000,
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false
    });
}
