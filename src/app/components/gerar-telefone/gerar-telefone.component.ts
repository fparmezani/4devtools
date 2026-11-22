import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-telefone',
    templateUrl: './gerar-telefone.component.html',
})
export class GerarTelefoneComponent implements OnInit {
    telefone: string = '';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private title: Title,
        private meta: Meta
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar Telefone' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'gerar telefone, gerador telefone, gerar telefone',
            },
        ]);

        this.title.setTitle('Gerador de Telefone - 4DevTools');
    }

    ngOnInit(): void {
        this.gerarTelefone();
    }

    gerarTelefone() {
        this.telefone = this.service.gerarCelular(null);
    }

    gerarCopiar() {
        this.gerarTelefone();
        this.copiar();
    }

    copiar() {
        copy(this.telefone);
        this.toastr.success('Copiado!');
    }
}
