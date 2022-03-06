import { Component, OnInit } from '@angular/core';
import { Cotacao } from 'src/app/model/cotacao';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { CotacaoService } from 'src/app/services/cotacao.service';
import { Timestamp } from 'rxjs';

@Component({
    selector: 'app-euro',
    templateUrl: './euro.component.html',
    styleUrls: [ './euro.component.css' ],
})
export class EuroComponent implements OnInit {
    quantidade: string = '1';
    euro: number = 1;
    euroVenda: number = 1;
    euroMaximo: number = 1;
    euroMinimo: number = 1;
    date_created: string = '';
    variacao: number = 1;
    euroLocale: string = '';
    euroConvert: number = 1;
    cotacao = new Cotacao();

    constructor(private service: CotacaoService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.service.getCotacao('EUR').subscribe((response) => {
            this.euro = +Number(response.EURBRL.bid).toFixed(4);
            this.euroVenda = +Number(response.EURBRL.ask).toFixed(4);
            this.euroMaximo = +Number(response.EURBRL.high).toFixed(4);
            this.euroMinimo = +Number(response.EURBRL.low).toFixed(4);
            this.variacao = +Number(response.EURBRL.varBid).toFixed(4);
            this.date_created = new Date(response.EURBRL.create_date).toLocaleDateString();
            this.convert();
        });
    }

    convert(): void {
        this.euroConvert = this.euro * parseFloat(this.quantidade);
    }
    copiar() {
        copy(this.euroConvert.toFixed(4));
        this.toastr.success('Copiado!');
    }
}
