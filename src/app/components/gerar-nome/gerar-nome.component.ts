import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-nome',
    templateUrl: './gerar-nome.component.html',
})
export class GerarNomeComponent implements OnInit {
    nome: string = '';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private title: Title,
        private meta: Meta
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar de Nome de Pessoa Física' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'gerar nome, gerar de nome, gerador nome, gerar de nome, gerar nome pessoa física',
            },
        ]);
        this.title.setTitle('Gerador de Nome - 4DevTools');
    }

    ngOnInit(): void {
        this.gerarNome();
    }

    gerarNome() {
        this.nome = this.service.gerarNome();
    }

    gerarCopiar() {
        this.gerarNome();
        this.copiar();
    }

    copiar() {
        copy(this.nome);
        this.toastr.success('Copiado!');
    }
}
