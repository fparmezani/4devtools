import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/model/pessoa';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-nome',
    templateUrl: './gerar-nome.component.html',
})
export class GerarNomeComponent implements OnInit {
    nome: string = '';
    URLGERADORBRASILEIRO = 'https://geradorbrasileiro.com/api/';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private http: HttpClient,
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

        this.title.setTitle('Gerador de Nome');
    }

    ngOnInit(): void {
        this.gerarNome();
    }

    gerarNome() {
        this.nome = this.service.gerarPisPasep();
        this.http.get<Pessoa>(`${this.URLGERADORBRASILEIRO}faker/pessoa?limit=1`).subscribe((response: any) => {
            let nome = response.values[0].nome;
            this.nome = nome;
        });
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
