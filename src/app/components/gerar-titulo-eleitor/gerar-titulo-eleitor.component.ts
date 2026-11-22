import { SNIPPETS } from 'src/app/shared/snippets';
import { passoDv } from 'src/app/shared/tabela-dv/tabela-dv.component';
import { Component, OnInit } from '@angular/core';
import { GeradorService } from 'src/app/services/gerador.service';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-gerar-titulo-eleitor',
    templateUrl: './gerar-titulo-eleitor.component.html',
})
export class GerarTituloEleitorComponent implements OnInit {
    readonly snippets = SNIPPETS['titulo'];
    readonly passo1 = passoDv('10234567'.split(''), '10234567'.split('').map(Number), [ 2, 3, 4, 5, 6, 7, 8, 9 ]);
    readonly dv1 = this.passo1.resto === 10 ? 0 : this.passo1.resto;
    readonly passo2 = passoDv([ '0', '3', String(this.dv1) ], [ 0, 3, this.dv1 ], [ 7, 8, 9 ]);
    readonly dv2 = this.passo2.resto === 10 ? 0 : this.passo2.resto;
    readonly ufs = [
        [ '01', 'SP' ], [ '02', 'MG' ], [ '03', 'RJ' ], [ '04', 'RS' ], [ '05', 'BA' ], [ '06', 'PR' ], [ '07', 'CE' ],
        [ '08', 'PE' ], [ '09', 'SC' ], [ '10', 'GO' ], [ '11', 'MA' ], [ '12', 'PB' ], [ '13', 'PA' ], [ '14', 'ES' ],
        [ '15', 'PI' ], [ '16', 'RN' ], [ '17', 'AL' ], [ '18', 'MT' ], [ '19', 'MS' ], [ '20', 'DF' ], [ '21', 'SE' ],
        [ '22', 'AM' ], [ '23', 'RO' ], [ '24', 'AC' ], [ '25', 'AP' ], [ '26', 'RR' ], [ '27', 'TO' ], [ '28', 'Exterior' ],
    ];
    estado: string = '01';
    tituloEleitor: string = '';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private title: Title,
        private meta: Meta
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar Título de Eleitor' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'gerar titulo de eleitor, gerador titulo eleitor, gerar documento titulo eleitor',
            },
        ]);

        this.title.setTitle('Gerador de Título de Eleitor - 4DevTools');
    }
    gerarTituloEleitor() {
        this.tituloEleitor = this.service.gerarTituloEleitor(this.estado);
    }

    gerarCopiar() {
        copy(this.tituloEleitor);
        this.toastr.success('Copiado!');
    }

    copiar() {
        copy(this.tituloEleitor);
        this.toastr.success('Copiado!');
    }

    ngOnInit(): void {
        this.gerarTituloEleitor();
    }
}
