import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-renavam',
    templateUrl: './gerar-renavam.component.html',
})
export class GerarRenavamComponent implements OnInit {
    renavam: string = '';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private title: Title,
        private meta: Meta
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar Renavam' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'gerar renavam, gerador renavam, gerar documento renavam',
            },
        ]);

        this.title.setTitle('Gerador de Renavam');
    }

    ngOnInit(): void {
        this.gerarRenavam();
    }

    gerarRenavam() {
        this.renavam = this.service.gerarRenavan();
    }

    gerarCopiar() {
        this.gerarRenavam();
        this.copiar();
    }

    copiar() {
        copy(this.renavam);
        this.toastr.success('Copiado!');
    }
}
