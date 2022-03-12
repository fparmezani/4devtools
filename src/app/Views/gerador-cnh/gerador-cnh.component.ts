import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-gerador-cnh',
    templateUrl: './gerador-cnh.component.html',
})
export class GeradorCnhComponent implements OnInit {
    constructor(private meta: Meta, private title: Title) {
        this.meta.addTags([
            { name: 'description', content: 'DashBoard' },
            { name: 'author', content: 'Fernando Parmezani' },
            { name: 'keywords', content: 'gerar cnh, gerador cnh, gerar documento cnh' },
        ]);
    }

    ngOnInit(): void {}
}
