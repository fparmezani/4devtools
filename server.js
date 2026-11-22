const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const nodemailer = require('nodemailer');
var forceSsl = require('force-ssl-heroku');

const app = express();
app.use(forceSsl);

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist', '4DevTools', 'browser');

// Rotas pré-renderizadas no build (cada uma tem seu próprio index.html com conteúdo e SEO).
const PRERENDERED = new Set(
    fs.readFileSync(path.join(__dirname, 'prerender-routes.txt'), 'utf8')
        .split(/\r?\n/)
        .map((r) => r.trim())
        .filter(Boolean)
);

// HTML "casca" do Angular (sem pré-render), usado para a página 404.
const SHELL = fs.existsSync(path.join(DIST, 'index.original.html'))
    ? path.join(DIST, 'index.original.html')
    : path.join(DIST, 'index.html');

// /gerar-cpf/ -> /gerar-cpf (uma única URL por página)
app.use((req, res, next) => {
    if (req.method === 'GET' && req.path.length > 1 && req.path.endsWith('/')) {
        const query = req.url.slice(req.path.length);
        return res.redirect(301, req.path.replace(/\/+$/, '') + query);
    }
    next();
});

// Páginas pré-renderizadas
app.get('*', (req, res, next) => {
    if (!PRERENDERED.has(req.path)) {
        return next();
    }
    const file = req.path === '/' ? path.join(DIST, 'index.html') : path.join(DIST, req.path, 'index.html');
    res.set('Cache-Control', 'no-cache');
    res.sendFile(file);
});

// Arquivos estáticos (JS, CSS, imagens, ads.txt, robots.txt, sitemap.xml)
app.use(express.static(DIST, { index: false, redirect: false }));

// Qualquer outra URL: 404 real (o Angular exibe a página "não encontrada" com noindex)
app.get('*', (req, res) => {
    res.status(404).sendFile(SHELL);
});

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta: ' + PORT);
});

const sendMail = (user, callback) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fparmezani@gmail.com',
            pass: 'hiljvnblkbrezuij',
        },
    });

    const mailOptions = {
        from: `"${user.nome}", "${user.email}"`,
        to: `fparmezani@gmail.com`,
        subject: 'Contato 4DevTools',
        html: `${user.mensagem}`,
    };
    transporter.sendMail(mailOptions, callback);
};

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post('/sendmail', (req, res) => {
    let user = req.body;
    sendMail(user, (err, info) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({ error: 'Failed to send email' + err });
        } else {
            console.log('Email has been sent');
            res.send('Email has been sent');
        }
    });
});
