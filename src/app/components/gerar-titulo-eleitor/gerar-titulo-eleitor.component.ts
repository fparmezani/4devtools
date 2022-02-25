import { Component, OnInit } from '@angular/core';
import { GeradorService } from 'src/app/services/gerador.service';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-gerar-titulo-eleitor',
    templateUrl: './gerar-titulo-eleitor.component.html',
})
export class GerarTituloEleitorComponent implements OnInit {
    estado: string = '01';
    tituloEleitor: string = '';

    constructor(private service: GeradorService, private toastr: ToastrService, private titleService: Title) {
        this.titleService.setTitle('Gerador de Pessoas');
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
