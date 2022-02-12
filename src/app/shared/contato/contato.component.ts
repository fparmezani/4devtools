import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
})
export class ContatoComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    // sendEmail() {
    //     const client = new SMTPClient({
    //         user: 'contato@4devtools.com',
    //         password: 'Fernando@39',
    //         host: 'mail.4devtools.com',
    //         ssl: true,
    //     });

    //     const message = {
    //         text: 'i hope this works',
    //         from: 'you <username@your-email.com>',
    //         to: 'someone <someone@your-email.com>, another <another@your-email.com>',
    //         cc: 'else <else@your-email.com>',
    //         subject: 'testing emailjs',
    //         attachments: [
    //             { data: '<html>i <i>hope</i> this works!</html>', alternative: true },
    //             { path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip' },
    //         ],
    //         content: '',
    //     };

    //     client.send(message, function(err, message) {
    //         console.log(err || message);
    //     });
    // }
}
