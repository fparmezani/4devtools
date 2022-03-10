const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const nodemailer = require('nodemailer');

const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist/for-dev-tools'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/for-dev-tools/index.html');
});

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta: ' + PORT);
});

const sendMail = (user, callback) => {
    const transporter = nodemailer.createTransport({
        host: 'gmail',
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
            res.send({ error: 'Failed to send email' });
        } else {
            console.log('Email has been sent');
            res.send(info);
        }
    });
});
