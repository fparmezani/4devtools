import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-whatsapp',
    templateUrl: './whatsapp.component.html',
})
export class WhatsappComponent implements OnInit {
    numero: string = '';
    mensagem: string = '';

    URL: string = '';

    public celularMask: Array<any>;

    constructor(private toastr: ToastrService, private title: Title, private meta: Meta) {
        this.celularMask = [
            '(',
            /[1-9]/,
            /[1-9]/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
        ];

        this.meta.addTags([
            { name: 'description', content: 'Gerar Link para WhatsApp' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'gerar link, gerador link, gerar link para whatsapp, gerar link whatsapp',
            },
        ]);

        this.title.setTitle('Gerador de Link para WhatsApp - 4DevTools');
    }

    ngOnInit(): void {}

    gerarLink() {
        if (this.mensagem == '') this.mensagem = 'Olá';
        this.URL = `https://api.whatsapp.com/send?phone=55${this.numero
            .replace('(', '')
            .replace(')', '')
            .replace(' ', '')
            .replace('-', '')}&text=${this.mensagem}`;
    }

    gerarCopiar() {
        this.gerarLink();
        this.copiar();
    }

    copiar() {
        copy(this.URL);
        this.toastr.success('Copiado!');
    }
}
