import { Component, OnInit } from '@angular/core';
import { GeradorService } from 'src/app/services/gerador.service';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-gerar-cnpj',
    templateUrl: './gerar-cnpj.component.html',
})
export class GerarCnpjComponent implements OnInit {
    cnpj = '';
    formataCNPJ = true;
    alfanumerico = false;

    constructor(private service: GeradorService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.gerarCNPJ();
    }

    gerarCNPJ() {
        this.cnpj = this.alfanumerico
            ? this.service.gerarCNPJAlfanumerico(this.formataCNPJ)
            : this.service.gerarCNPJ(this.formataCNPJ);
    }

    toggleFormat() {
        // (click) dispara antes do ngModel atualizar: formataCNPJ ainda tem o valor anterior.
        const semMascara = this.cnpj.replace(/[^0-9A-Z]/g, '');
        this.cnpj = this.formataCNPJ
            ? semMascara
            : semMascara.replace(/^(.{2})(.{3})(.{3})(.{4})(.{2})$/, '$1.$2.$3/$4-$5');
    }

    gerarCopiar() {
        this.gerarCNPJ();
        this.copiar();
    }

    copiar() {
        copy(this.cnpj);
        this.toastr.success('Copiado!');
    }
}
