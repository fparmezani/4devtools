$(document).ready(() => {
    setCookieGeneratorPassword();
    getPassword();
});

$("#nv-new-generator-password").click(() => {
    getPassword();
});

$("#nv-new-generator-copy-password").click(() => {
  	getPassword();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getPassword();
        copy(".nv-field-copy");
    }
});

function getPassword() {
    registerBi();

    const capital = "ABCDEFGHIJKLMNOPQRSTUVYXWZ";
    const small = "abcdefghijklmnopqrstuvyxwz";
    const numbers = "0123456789";
    const symbols = "!@#$%&*()_+=";

    const lengthFilter = $("#length-password");
    const capitalFilter = $("#capital-password");
    const smallFilter = $("#small-password");
    const numbersFilter = $("#numbers-password");
    const symbolsFilter = $("#symbols-password");

    let charSelected = "";
    if (capitalFilter.prop("checked")) charSelected = charSelected.concat(capital);
    if (smallFilter.prop("checked")) charSelected = charSelected.concat(small);
    if (numbersFilter.prop("checked")) charSelected = charSelected.concat(numbers);
    if (symbolsFilter.prop("checked")) charSelected = charSelected.concat(symbols);

    const lengthCharSelected = charSelected.length;
    let password = "";
    for (let i = 0; i < lengthFilter.val(); i++) {
        let random = Math.round(Math.random() * lengthCharSelected);
        password = password.concat(charSelected.charAt(random));
    }

    const field = $("#nv-field-generator-password");
    field.val(password).text(password);

    autosize(field);
}

function setCookieGeneratorPassword() {
    const lengthFilter = $("#length-password");
    const capitalFilter = $("#capital-password");
    const smallFilter = $("#small-password");
    const numbersFilter = $("#numbers-password");
    const symbolsFilter = $("#symbols-password");

    const getCookiePassword = name => getCookie(name) ? getCookie(name) === "true" : "true"; // se ainda não existir, seta para true
    const setCookieCheckbox = name => {
      if ($(".checkbox-password:checked").length !== 0) {
          setCookie(name.attr("id"), name.prop("checked"));
      } else {
          name.prop("checked", true);
      }
    }

  	lengthFilter.change(() => setCookie(lengthFilter.attr("id"), lengthFilter.val()))
    lengthFilter.val(getCookie(lengthFilter.attr("id")) || 20);

  	capitalFilter.change(() => setCookieCheckbox(capitalFilter))
    capitalFilter.attr("checked", getCookiePassword(capitalFilter.attr("id")));

  	smallFilter.change(() => setCookieCheckbox(smallFilter))
    smallFilter.attr("checked", getCookiePassword(smallFilter.attr("id")));

    numbersFilter.change(() => setCookieCheckbox(numbersFilter))
    numbersFilter.attr("checked", getCookiePassword(numbersFilter.attr("id")));

  	symbolsFilter.change(() => setCookieCheckbox(symbolsFilter))
    symbolsFilter.attr("checked", getCookiePassword(symbolsFilter.attr("id")));
}
