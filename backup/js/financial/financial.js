$(document).ready(() => {
  getInfoDolarEuroLibra(); // awesomeapi (atualizado a cada 3m)
  getInfoBitcoin(); // mercadobitcoin (atualizado a cada busca)
  getInfoEthereum(); // mercadobitcoin (atualizado a cada busca)

  let i = 0;
  const go = (() => {
    if (i === 100) {
      i = 0;
    } else {
      i++;
    }

    if (i === 99) {
      getInfoDolarEuroLibra();
      getInfoBitcoin();
      getInfoEthereum();
    }

    setTimeout(go, 100);
  })
  go();
})

function getInfoDolarEuroLibra() {
  const getInfoDolarEuroLibra = $.get({
    url: "https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,GBP-BRL"
  }).then((data) => {
    const format = value => parseFloat(value).toLocaleString("pt-BR", { style: "currency" , currency: "BRL" });
    $("#nv-financial-info-dolar").text(format(data.USD.bid));
    $("#nv-financial-info-euro").text(format(data.EUR.bid));
    $("#nv-financial-info-libra").text(format(data.GBP.bid));
  });
}

function getInfoBitcoin() {
  const getInfoBitcoin = $.get({
    url: "https://www.mercadobitcoin.net/api/BTC/ticker/"
  }).then((data) => {
    const format = value => parseFloat(value).toLocaleString("pt-BR", { style: "currency" , currency: "BRL" });
    $("#nv-financial-info-bitcoin").text(format(data.ticker.last));
  });
}

function getInfoEthereum() {
  const getInfoEthereum = $.get({
    url: "https://www.mercadobitcoin.net/api/ETH/ticker/"
  }).then((data) => {
    const format = value => parseFloat(value).toLocaleString("pt-BR", { style: "currency" , currency: "BRL" });
    $("#nv-financial-info-ethereum").text(format(data.ticker.last));
  });
}
