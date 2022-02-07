let brlToGbp = 0;
registerBi();

$(document).ready(() => {
  $("#gbp-to-brl").val(1);
  getInfoLibra();
  countdown();
});

function countdown() {
  let i = 0;
  const go = (() => {
    if (i === 10) {
      i = 0;
      getInfoLibra();
    } else {
      i++;
    }
    setTimeout(go, 1000);
  })
  go();
}

$("#gbp-to-brl").keyup(() => {
  const aux = $("#gbp-to-brl").val() || 0;
  const value = parseFloat(brlToGbp) * parseFloat(aux);
  $("#gbp-in-brl").text(format(value));
});

function getInfoLibra() {
  const getInfoLibra = $.get({
    url: "https://economia.awesomeapi.com.br/all/GBP-BRL"
  }).then((data) => {
    brlToGbp = data.GBP.bid;
    const aux = $("#gbp-to-brl").val() || 0;
    const value = parseFloat(brlToGbp) * parseFloat(aux);
    $("#gbp-in-brl").text(format(value));
  });
}

function format(brl) {
  return parseFloat(brl).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
