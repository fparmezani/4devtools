import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/model/pessoa';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-pessoa',
    templateUrl: './gerar-pessoa.component.html',
})
export class GerarPessoaComponent implements OnInit {
    estado: string = 'SP';
    pessoa: Pessoa = new Pessoa();

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private title: Title,
        private meta: Meta
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar Pessoa Física' },
            { name: 'author', content: 'Fernando Parmezani' },
            { name: 'keywords', content: 'gerar pessoa, gerador pessoa, gerar documento pessoa física' },
        ]);
        this.title.setTitle('Gerador de Pessoas - 4DevTools');
    }

    ngOnInit(): void {
        this.gerarPessoa();
    }

    gerarPessoa() {
        this.pessoa = this.service.gerarPessoaCompleta(this.estado);
    }

    copiarConteudo(value: string) {
        copy(value);
        this.toastr.success('Copiado!');
    }
}
