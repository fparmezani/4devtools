import { Component, OnInit } from '@angular/core';
import { Cotacao } from 'src/app/model/cotacao';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { CotacaoService } from 'src/app/services/cotacao.service';
import { Timestamp } from 'rxjs';

@Component({
    selector: 'app-dollar',
    templateUrl: './dollar.component.html',
    styleUrls: [ './dollar.component.css' ],
})
export class DollarComponent implements OnInit {
    quantidade: string = '1';
    dollar: number = 1;
    dollarVenda: number = 1;
    dollarMaximo: number = 1;
    dollarMinimo: number = 1;
    date_created: string = '';
    variacao: number = 1;
    dollarLocale: string = '';
    dollarConvert: number = 1;
    cotacao = new Cotacao();

    constructor(private service: CotacaoService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.service.getCotacao('USD-BRL').subscribe((response) => {
            this.dollar = +Number(response.USDBRL.bid).toFixed(4);
            this.dollarVenda = +Number(response.USDBRL.ask).toFixed(4);
            this.dollarMaximo = +Number(response.USDBRL.high).toFixed(4);
            this.dollarMinimo = +Number(response.USDBRL.low).toFixed(4);
            this.variacao = +Number(response.USDBRL.varBid).toFixed(4);
            this.date_created = new Date(response.USDBRL.create_date).toLocaleDateString();
            this.convert();
        });
    }

    convert(): void {
        console.log('dollar', this.dollar);
        console.log('quantidade', this.quantidade);
        this.dollarConvert = this.dollar * parseFloat(this.quantidade);
    }
    copiar() {
        copy(this.dollarConvert.toFixed(4));
        this.toastr.success('Copiado!');
    }
}
