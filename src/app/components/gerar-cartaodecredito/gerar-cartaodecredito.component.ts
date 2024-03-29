import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-cartaodecredito',
    templateUrl: './gerar-cartaodecredito.component.html',
})
export class GerarCartaodecreditoComponent implements OnInit {
    numero = '';
    cvv: string = '';
    dataValidade: string = '';
    flag: string = '';
    banners: any[] = [];

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private meta: Meta,
        private title: Title
    ) {
        this.meta.addTags([
            { name: 'description', content: 'DashBoard' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'gerar cartao de credito, gerador cartao de credito, gerar documento catão de crédito',
            },
        ]);

        this.title.setTitle('Gerado de Cartão de Crédito - 4DevTools');

        this.banners = [
            { name: 'visa', value: [ 4 ] },
            { name: 'mastercard', value: [ 51, 52, 53, 54, 55 ] },
            { name: 'elo', value: [ 636368, 438935, 504175, 451416 ] },
            { name: 'discover', value: [ 6011, 622, 65 ] },
            { name: 'jcb', value: [ 35 ] },
        ];
    }

    ngOnInit(): void {
        this.gerarCartaoDeCredito();
    }

    gerarCartaoDeCredito() {
        this.numero = this.service.gerarCartaoDeCredito(this.flag);
        this.dataValidade = this.service.gerarDataValidade();
        this.cvv = this.service.gerarCvv();
    }

    gerarCopiar() {
        this.service.gerarCartaoDeCredito(this.flag);
        this.copiar();
        this.toastr.success('Copiado!');
    }

    copiar() {
        this.toastr.success('Copiado!');
        copy(this.numero);
    }
}
