import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoa';
import { GeradorService } from 'src/app/services/gerador.service';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-gerar-endereco',
    templateUrl: './gerar-endereco.component.html',
})
export class GerarEnderecoComponent implements OnInit {
    pessoa: Pessoa = new Pessoa();
    URLGERADORBRASILEIRO = 'https://geradorbrasileiro.com/api/';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private http: HttpClient,
        private titleService: Title
    ) {
        this.titleService.setTitle('Gerador de Endereços');
    }

    gerarPessoa() {
        this.http.get<Pessoa>(`${this.URLGERADORBRASILEIRO}faker/pessoa?limit=1`).subscribe((response: any) => {
            this.pessoa = response.values[0];
        });
    }

    copiarConteudo(value: string) {
        copy(value);
        this.toastr.success('Copiado!');
    }

    ngOnInit(): void {
        this.gerarPessoa();
    }
}
