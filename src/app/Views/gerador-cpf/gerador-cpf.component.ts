import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-gerador-cpf',
    templateUrl: './gerador-cpf.component.html',
})
export class GeradorCpfComponent implements OnInit {
    constructor(private meta: Meta, private title: Title) {
        this.meta.addTags([
            { name: 'description', content: 'Gerador de CPF para Desenvolvedores' },
            { name: 'author', content: 'Fernando Parmezani' },
            { name: 'keywords', content: 'gerar cpf, gerador cpf, gerar documento cpf' },
        ]);

        this.title.setTitle('Gerador de CPF');
    }
    ngOnInit(): void {}
}
