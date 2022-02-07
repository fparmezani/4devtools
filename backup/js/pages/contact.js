document.addEventListener('wpcf7invalid', function(event) {
    contactAlert(
        "Todos os campos são obrigatórios!",
        "Por favor, preencha todos os campos para enviar sua mensagem!",
        "error"
    );
}, false);

document.addEventListener('wpcf7spam', function(event) {
    contactAlert(
        "Possível spam detectado...",
        "A mensagem não foi enviado porque uma possível atividade de spam foi detectada.",
        "error"
    );
}, false);

document.addEventListener('wpcf7mailsent', function(event) {
    contactAlert(
        "Mensagem enviada!",
        "Sua mensagem foi enviada com sucesso e será respondida em breve! Obrigado (:",
        "success"
    );
}, false);

document.addEventListener('wpcf7mailfailed', function(event) {
    contactAlert(
        "Algo deu errado...",
        "Ocorreu um erro inesperado. Por favor, tente novamente!",
        "error"
    );
}, false);

function contactAlert(title, msg, icon) {
    swal({
        title: `${title}`,
        text: `${msg}`,
        icon: `${icon}`,
        button: "Fechar",
        closeOnEsc: false
    });
}
