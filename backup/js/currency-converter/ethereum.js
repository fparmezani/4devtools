let brlToEth = 0;
registerBi();

$(document).ready(() => {
  $("#eth-to-brl").val(1);
  getInfoEthereum();
  countdown();
});

function countdown() {
  let i = 0;
  const go = (() => {
    if (i === 10) {
      i = 0;
      getInfoEthereum();
    } else {
      i++;
    }
    setTimeout(go, 1000);
  })
  go();
}

$("#eth-to-brl").keyup(() => {
  const aux = $("#eth-to-brl").val() || 0;
  const value = parseFloat(brlToEth) * parseFloat(aux);
  $("#eth-in-brl").text(format(value));
});

function getInfoEthereum() {
  const getInfoEthereum = $.get({
    url: "https://www.mercadobitcoin.net/api/ETH/ticker/"
  }).then((data) => {
    brlToEth = data.ticker.last;
    const aux = $("#eth-to-brl").val() || 0;
    const value = parseFloat(brlToEth) * parseFloat(aux);
    $("#eth-in-brl").text(format(value));
  });
}

function format(brl) {
  return parseFloat(brl).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
