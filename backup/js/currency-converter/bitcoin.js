let brlToBtc = 0;
registerBi();

$(document).ready(() => {
  $("#btc-to-brl").val(1);
  getInfoBitcoin();
  countdown();
});

function countdown() {
  let i = 0;
  const go = (() => {
    if (i === 10) {
      i = 0;
      getInfoBitcoin();
    } else {
      i++;
    }
    setTimeout(go, 1000);
  })
  go();
}

$("#btc-to-brl").keyup(() => {
  const aux = $("#btc-to-brl").val() || 0;
  const value = parseFloat(brlToBtc) * parseFloat(aux);
  $("#btc-in-brl").text(format(value));
});

function getInfoBitcoin() {
  const getInfoBitcoin = $.get({
    url: "https://www.mercadobitcoin.net/api/BTC/ticker/"
  }).then((data) => {
    brlToBtc = data.ticker.last;
    const aux = $("#btc-to-brl").val() || 0;
    const value = parseFloat(brlToBtc) * parseFloat(aux);
    $("#btc-in-brl").text(format(value));
  });
}

function format(brl) {
  return parseFloat(brl).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
