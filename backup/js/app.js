$(document).ready(() => {
    // cookieConsent();
    helloWorldNv();

    const theme = localStorage.getItem("nv-theme");
    theme !== "dark"
        ? renderThemeLight() // null or light
        : renderThemeDark(); // only dark
});

$(".nv-btn-cookie-consent").click(() => {
    const banner = $(".nv-cookie-consent-banner");
    banner.fadeOut(0);

    localStorage.setItem("cookie-consent-hide", true);
});

function cookieConsent() {
  const hide = localStorage.getItem("cookie-consent-hide");

  if (!hide) {
      setTimeout(() => {
          const banner = $(".nv-cookie-consent-banner");
          banner.fadeIn(1000);
      }, 8000);
  }
}

if (sessionStorage.getItem("painel-mensagem") !== "none") {
    $(".left-sidebar").css("top", $(".rg-mensagem").height());
}
$(".rg-mensagem").css("display", sessionStorage.getItem("painel-mensagem"));
$(".rg-btn-fechar-mensagem").click(() => {
    sessionStorage.setItem("painel-mensagem", "none");
    $(".rg-mensagem").css("display", "none");
    $(".left-sidebar").css("top", 0);
});

function functionalityIdentification() {
    const split = window.location.pathname.split("/");
    const host = window.location.host;
    let identification = "";

    host === "localhost"
        ? identification = split[split.length - 2]
        : identification = split[1];

    return identification;
}

function getBaseUrlApi() {
    const host = window.location.host;
    return host === "localhost"
        ? "http://localhost/projects/gitlab/gerador-nv/wp-json"
        : "https://geradornv.com.br/wp-json"
}

function registerBi() {
    const identification = functionalityIdentification();

    $.post({
        url: `${getBaseUrlApi()}/api/bi/register`,
        data: { "identification": identification }
    });

    // donation();
}

$(".nv-btn-share-whatsapp").click((e) => {
    const msg = encodeURIComponent(`Olá, acabei de ver essa ferramenta e quero compartilhar com você! Confira: ${window.location.href}`);
    $(".nv-btn-share-whatsapp").attr("href", `https://api.whatsapp.com/send?text=${msg}`);
    registerShare("whatsapp");
});

$(".nv-btn-share-facebook").click((e) => {
    const url = encodeURIComponent(window.location.href);
    $(".nv-btn-share-facebook").attr("href", `https://www.facebook.com/sharer/sharer.php?u=${url}`);
    registerShare("facebook");
});

$(".nv-btn-share-linkedin").click((e) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const summary = encodeURIComponent("Olá, acabei de ver essa ferramenta e quero compartilhar com você!");
    $(".nv-btn-share-linkedin").attr("href", `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}$summary=${summary}`);
    registerShare("linkedin");
});

$(".nv-btn-share-twitter").click((e) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Acabei de ver essa ferramenta e quero compartilhar com vocês! Confira:");
    $(".nv-btn-share-twitter").attr("href", `https://twitter.com/intent/tweet?url=${url}&text=${text}`);
    registerShare("twitter");
});

$(".nv-btn-share-telegram").click((e) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Olá, acabei de ver essa ferramenta e quero compartilhar com você! Confira:");
    $(".nv-btn-share-telegram").attr("href", `https://telegram.me/share/url?url=${url}&text=${text}`);
    registerShare("telegram");
});

function registerShare(app) {
    const identification = functionalityIdentification();

    $.post({
        url: `${getBaseUrlApi()}/api/share/register`,
        data: { "app": app, "identification": identification }
    });

    // thankShareAlert();
}

function thankShareAlert() {
    swal({
        title: "Obrigado por compartilhar",
        text: `Esse gesto simples significa muito para o Gerador NV!

        Obrigado por compartilhar esta ferramenta, esperamos que ela seja útil para a pessoa que recebeu assim como foi para você.`,
        button: "Fechar"
    });
}

$(".nv-btn-copy").click(() => {
    copy(".nv-field-copy");
});

$(".nv-btn-pix-copy").click(() => {
    copy(".nv-textarea-key-pix");
});

function copy(identification) {
    $(identification).select();
    let successful = document.execCommand("copy");
    window.getSelection().removeAllRanges();
    toastr.success("", "Copiado com sucesso!", {
        "positionClass": "toast-bottom-right",
        timeOut: 1500,
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

function helloWorldNv() {
    const str = String.raw`
  _____                    _              _   ___      __
 / ____|                  | |            | \ | \ \    / /
| |  __  ___ _ __ __ _  __| | ___  _ __  |  \| |\ \  / /
| | |_ |/ _ \ '__/ _' |/ _' |/ _ \| '__| | . ' | \ \/ /
| |__| |  __/ | | (_| | (_| | (_) | |    | |\  |  \  /
 \_____|\___|_|  \__,_|\__,_|\___/|_|    |_| \_|   \/

>> olá, obrigado pela visita, volte sempre!
>> se achar algum bug, nós avisa? :porfavorzinho:
>> página para contato: https://geradornv.com.br/contato/
  `;
    console.log(str.replaceAll("'", "`"));
}

function setCookie(name, value) {
    const expires_days = 7;

  	let data = new Date();
  	data.setDate(data.getDate() + expires_days);
  	let cookie = name + "=" + escape(value) + "; expires=" + data;
    document.cookie = cookie;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

$(".nv-theme-btn").click(() => {
    const themeDark = $("body").hasClass("theme-dark");
    themeDark
        ? renderThemeLight()
        : renderThemeDark();
});

function renderThemeLight() {
    localStorage.setItem("nv-theme", "light");
    $("body").removeClass("theme-dark");
    $("body").addClass("theme-light");
    $("h1, h2, h3, h4, h5, h6").css("color", "#455a64");
}

function renderThemeDark() {
    localStorage.setItem("nv-theme", "dark");
    $("body").removeClass("theme-light");
    $("body").addClass("theme-dark");
    $("h1, h2, h3, h4, h5, h6").css("color", "#eceeef");
}
