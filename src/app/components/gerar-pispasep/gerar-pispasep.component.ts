import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-pispasep',
    templateUrl: './gerar-pispasep.component.html',
})
export class GerarPisPasepComponent implements OnInit {
    pispasep: string = '';
    formatarPISPASEP: boolean = true;

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private title: Title,
        private meta: Meta
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar PIS/PASEP' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'gerar pis pasep, gerador pis pasep, gerar documento pis pasep',
            },
        ]);

        this.title.setTitle('Gerador de PIS/PASEP');
    }

    ngOnInit(): void {
        this.gerarPisPasep();
    }

    gerarPisPasep() {
        this.pispasep = this.service.gerarPisPasep();
    }

    toggleFormat() {
        if (this.formatarPISPASEP) {
            this.pispasep = this.pispasep.replace(/[^0-9]/g, '');
        } else {
            this.pispasep = this.pispasep.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4');
        }
    }
    gerarCopiar() {
        this.gerarPisPasep();
        this.copiar();
        this.toastr.success('Copiado!');
    }

    copiar() {
        copy(this.pispasep);
        this.toastr.success('Copiado!');
    }
}
