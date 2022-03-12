import { Component, OnInit } from '@angular/core';
import { GeradorService } from 'src/app/services/gerador.service';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-gerar-cnpj',
    templateUrl: './gerar-cnpj.component.html',
})
export class GerarCnpjComponent implements OnInit {
    cnpj: string = '';
    cnpjState: string = 'XX';
    formataCNPJ: boolean = true;

    constructor(private service: GeradorService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.gerarCNPJ();
    }

    gerarCNPJ() {
        this.cnpj = this.service.gerarCNPJ(this.formataCNPJ);
    }

    toggleFormat() {
        if (this.formataCNPJ) {
            this.cnpj = this.cnpj.replace(/[^0-9]/g, '');
        } else {
            this.cnpj = this.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
    }

    gerarCopiar() {
        this.gerarCNPJ();
        this.copiar();
        this.toastr.success('Copiado!');
    }

    copiar() {
        this.toastr.success('Copiado!');
        copy(this.cnpj);
    }
}
