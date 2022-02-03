$("#nv-new-generator-link-telegram").click(() => {
    generatorLinkTelegram();
});

$(".nv-btn-refresh-link-telegram").click(() => {
    refreshGeneratorLinkTelegram();
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

function generatorLinkTelegram() {
    const username = $("#nv-generator-link-telegram-username").val();

    if (username.length === 0) {
        responseInvalidUsername();
        return;
    }

    registerBi();

    const link = `https://t.me/${username}`;
    $("#nv-generator-link-telegram-link").val(link);

    toggleLinkTelegram();
}

function toggleLinkTelegram() {
    $("#nv-generator-link-telegram-wrapper-data").toggle();
    $("#nv-generator-link-telegram-wrapper-link").toggle();

    $("#nv-new-generator-link-telegram").toggle();
    $(".nv-btn-copy").toggle();
    $(".nv-btn-refresh-link-telegram").toggle();
}

function refreshGeneratorLinkTelegram() {
    $("#nv-generator-link-telegram-username").val("")

    toggleLinkTelegram();
}

function responseInvalidUsername() {
    toastr.error("", "Digite um nome de usuário!", {
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
