import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-renavam',
    templateUrl: './gerar-renavam.component.html',
})
export class GerarRenavamComponent implements OnInit {
    renavam: string = '';

    constructor(private service: GeradorService, private toastr: ToastrService, private titleService: Title) {
        this.titleService.setTitle('Gerador de Nome');
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
