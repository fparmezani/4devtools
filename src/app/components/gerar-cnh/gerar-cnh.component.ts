import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-cnh',
    templateUrl: './gerar-cnh.component.html',
})
export class GerarCnhComponent implements OnInit {
    cnh: string = '';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private meta: Meta,
        private title: Title
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar Carteira Nacional de Habilitação' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content:
                    'gerar cnh, gerar carteira nacional de habilitação, gerador carteira nacional de habilitação, gerar documento carteira nacional de habilitação',
            },
        ]);

        this.title.setTitle('Gerador de CNH - Carteira Nacional de Habilitação');
    }

    ngOnInit(): void {
        this.gerarCnh();
    }

    gerarCnh() {
        this.cnh = this.service.gerarCnh();
    }

    gerarCopiar() {
        this.gerarCnh();
        this.copiar();
        this.toastr.success('Copiado!');
    }

    copiar() {
        copy(this.cnh);
        this.toastr.success('Copiado!');
    }
}
