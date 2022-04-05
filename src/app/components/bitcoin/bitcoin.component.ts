import { Component, OnInit } from '@angular/core';
import { Cotacao } from 'src/app/model/cotacao';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { CotacaoService } from 'src/app/services/cotacao.service';
import { Timestamp } from 'rxjs';

@Component({
    selector: 'app-bitcoin',
    templateUrl: './bitcoin.component.html',
    styleUrls: [ './bitcoin.component.css' ],
})
export class BitcoinComponent implements OnInit {
    quantidade: string = '1';
    bitcoin: number = 1;
    bitcoinVenda: number = 1;
    bitcoinMaximo: number = 1;
    bitcoinMinimo: number = 1;
    date_created: string = '';
    variacao: number = 1;
    bitcoinLocale: string = '';
    bitcoinConvert: number = 1;
    cotacao = new Cotacao();

    constructor(private service: CotacaoService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.service.getCotacao('BTC-BRL').subscribe((response) => {
            console.log(response);

            this.bitcoin = +Number(response.BTC.bid).toFixed(2) * 1000;
            this.bitcoinVenda = +Number(response.BTC.ask).toFixed(2) * 1000;
            this.bitcoinMaximo = +Number(response.BTC.high).toFixed(2) * 1000;
            this.bitcoinMinimo = +Number(response.BTC.low).toFixed(2) * 1000;
            this.variacao = +Number(response.BTC.varBid).toFixed(2) * 1000;
            this.date_created = new Date(response.BTC.create_date).toLocaleDateString();
            this.convert();
        });
    }

    convert(): void {
        this.bitcoinConvert = this.bitcoin * parseFloat(this.quantidade);
    }
    copiar() {
        copy(this.bitcoinConvert.toFixed(4));
        this.toastr.success('Copiado!');
    }
}
