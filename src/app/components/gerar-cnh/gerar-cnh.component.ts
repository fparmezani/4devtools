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
    ) {}

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
