import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-gerador-cnpj',
    templateUrl: './gerador-cnpj.component.html',
})
export class GeradorCnpjComponent implements OnInit {
    constructor(private meta: Meta, private title: Title) {
        this.meta.addTags([
            { name: 'description', content: 'DashBoard' },
            { name: 'author', content: 'Fernando Parmezani' },
            { name: 'keywords', content: 'gerar cnpj, gerador cnpj, gerar documento cnpj' },
        ]);
    }

    ngOnInit(): void {}
}
