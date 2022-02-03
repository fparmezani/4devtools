let brlToEur = 0;
registerBi();

$(document).ready(() => {
  $("#eur-to-brl").val(1);
  getInfoEuro();
  countdown();
});

function countdown() {
  let i = 0;
  const go = (() => {
    if (i === 10) {
      i = 0;
      getInfoEuro();
    } else {
      i++;
    }
    setTimeout(go, 1000);
  })
  go();
}

$("#eur-to-brl").keyup(() => {
  const aux = $("#eur-to-brl").val() || 0;
  const value = parseFloat(brlToEur) * parseFloat(aux);
  $("#eur-in-brl").text(format(value));
});

function getInfoEuro() {
  const getInfoEuro = $.get({
    url: "https://economia.awesomeapi.com.br/all/EUR-BRL"
  }).then((data) => {
    brlToEur = data.EUR.bid;
    const aux = $("#eur-to-brl").val() || 0;
    const value = parseFloat(brlToEur) * parseFloat(aux);
    $("#eur-in-brl").text(format(value));
  });
}

function format(brl) {
  return parseFloat(brl).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
