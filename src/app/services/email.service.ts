'use strict';
const nodemailer = require('nodemailer');

async function main() {
    let transporter = nodemailer.createTransport({
        host: 'mail.4devtools.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'contato@4devtools.com', // generated ethereal user
            pass: 'Fernando@39', // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
