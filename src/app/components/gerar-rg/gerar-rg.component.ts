import { SNIPPETS } from 'src/app/shared/snippets';
import { passoDv } from 'src/app/shared/tabela-dv/tabela-dv.component';
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
    readonly snippets = SNIPPETS['rg'];
    readonly passo = passoDv('24678131'.split(''), '24678131'.split('').map(Number), [ 2, 3, 4, 5, 6, 7, 8, 9 ]);
    readonly dvNumero = 11 - this.passo.resto;
    readonly dv = this.dvNumero === 10 ? 'X' : this.dvNumero === 11 ? '0' : String(this.dvNumero);
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
