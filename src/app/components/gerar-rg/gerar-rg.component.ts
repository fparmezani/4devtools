import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { GeradorService } from 'src/app/services/gerador.service';
import * as copy from 'copy-to-clipboard';

@Component({
    selector: 'app-gerar-rg',
    templateUrl: './gerar-rg.component.html',
})
export class GerarRgComponent implements OnInit {
    numero: string = '';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private meta: Meta,
        private title: Title
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar RG' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'gerar rg, gerador rg, gerar documento rg',
            },
        ]);

        this.title.setTitle('Gerador de RG - 4DevTools');
    }

    ngOnInit(): void {
        this.gerarRg();
    }

    gerarRg() {
        this.numero = this.service.gerarRg();
    }

    gerarCopiar() {
        this.gerarRg();
        this.copiar();
        this.toastr.success('Copiado!');
    }

    copiar() {
        copy(this.numero);
        this.toastr.success('Copiado!');
    }
}
