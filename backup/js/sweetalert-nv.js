function donation() {
    const random = Math.floor(Math.random() * 100);

    if (random !== 99) {
        return;
    }

    const msg = donationsMessage();

    // https://sweetalert.js.org/guides/
    swal({
        title: `${msg.title}`,
        text: `${msg.text}`,
        icon: "warning",
        button: "Fechar",
        closeOnEsc: false
    });

    registerDonation();
}

function donationsMessage() {
    const arr = [
        {
            "title": "Olá, você pode ajudar!?",
            "text": `O Gerador NV tem o proposito de facilitar seu trabalho no cotidiano!

            Se você pode fazer uma doação que não comprometa o seu orçamento estará ajudando a manter essa ferramenta no ar com qualidade.

            Chave Pix para colaboração: ADD_CHAVE_PIX_AQUI

            Desde já obrigado por utilizar o Gerador NV <3`
        }, {
            "title": "Precisamos da sua ajuda!",
            "text": `Ajude o Gerador NV a crescer! Fazendo um donativo você estará ajudando a desenvolver novas funcionalidades e melhorias.

            Não importa o valor contribuido, qualquer doação ajudará!

            Faça um Pix: ADD_CHAVE_PIX_AQUI

            Obrigado por utilizar o Gerador NV (:`
        }, {
            "title": "Você pode contribuir!?",
            "text": `Você pode realizar uma doação que não comprometa o seu orçamento? Se sim, considere a chance de realizar esta contribuição!

            Seu donativo ajudará muito no crescimento da ferramenta!

            Chave Pix para doação: ADD_CHAVE_PIX_AQUI

            Agradecemos por utilizar o Gerador NV <3`
        }
    ];

    const random = Math.floor(Math.random() * arr.length);
    return arr[random];
}

function registerDonation() {
    $.post({url: `${getBaseUrlApi()}/api/donation/register`});
}
