import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-telegram',
    templateUrl: './telegram.component.html',
})
export class TelegramComponent implements OnInit {
    usuario: string = '';
    URL: string = '';

    constructor(private toastr: ToastrService, private title: Title, private meta: Meta) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar Link para Telegram' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'gerar link, gerador link, gerar link para Telegram, gerar link Telegram',
            },
        ]);

        this.title.setTitle('Gerador de Link para Telegram - 4DevTools');
    }

    ngOnInit(): void {}

    gerarLink() {
        if (this.usuario == '') this.usuario = 'Olá';
        this.URL = `https://t.me/${this.usuario}`;
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
