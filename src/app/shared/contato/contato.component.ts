import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
})
export class ContatoComponent implements OnInit {
    constructor(private meta: Meta, private title: Title) {
        this.meta.addTags([
            { name: 'description', content: 'Entre em contato com o 4DevTools via WhatsApp para dúvidas, sugestões ou parcerias.' },
            { name: 'author', content: 'Fernando Parmezani' },
            { name: 'keywords', content: '4devtools contato, suporte 4devtools' },
        ]);

        this.title.setTitle('Contato — 4DevTools');
    }

    ngOnInit(): void {}
}
