let brlToUsd = 0;
registerBi();

$(document).ready(() => {
  $("#usd-to-brl").val(1);
  getInfoDolar();
  countdown();
});

function countdown() {
  let i = 0;
  const go = (() => {
    if (i === 10) {
      i = 0;
      getInfoDolar();
    } else {
      i++;
    }
    setTimeout(go, 1000);
  })
  go();
}

$("#usd-to-brl").keyup(() => {
  const aux = $("#usd-to-brl").val() || 0;
  const value = parseFloat(brlToUsd) * parseFloat(aux);
  $("#usd-in-brl").text(format(value));
});

function getInfoDolar() {
  const getInfoDolar = $.get({
    url: "https://economia.awesomeapi.com.br/all/USD-BRL"
  }).then((data) => {
    brlToUsd = data.USD.bid;
    const aux = $("#usd-to-brl").val() || 0;
    const value = parseFloat(brlToUsd) * parseFloat(aux);
    $("#usd-in-brl").text(format(value));
  });
}

function format(brl) {
  return parseFloat(brl).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
