import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-aviso',
    templateUrl: './aviso.component.html',
})
export class AvisoComponent implements OnInit {
    constructor(private meta: Meta, private title: Title) {
        this.meta.addTags([
            { name: 'description', content: 'Aviso de Segurança' },
            { name: 'author', content: 'Fernando Parmezani' },
            { name: 'keywords', content: 'gerar cpf, gerador cpf, gerar documento cpf' },
        ]);

        this.title.setTitle('Aviso de Segurança');
    }

    ngOnInit(): void {}
}
