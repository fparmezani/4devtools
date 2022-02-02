import { Component, OnInit } from '@angular/core';
import { GeradorService } from 'src/app/services/gerador.service';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from 'src/app/model/pessoa';

@Component({
    selector: 'app-gerar-pessoa',
    templateUrl: './gerar-pessoa.component.html',
})
export class GerarPessoaComponent implements OnInit {
    sexo: string = '';
    estado: string = 'SP';

    pessoa: Pessoa = new Pessoa();
    dataNascimento: string = '';
    URLGERADORBRASILEIRO = 'https://geradorbrasileiro.com/api/';

    constructor(private service: GeradorService, private toastr: ToastrService, private http: HttpClient) {}

    gerarPessoa() {
        this.http.get<Pessoa>(`${this.URLGERADORBRASILEIRO}faker/pessoa?limit=1`).subscribe((response: any) => {
            this.pessoa = response.values[0];
            
            this.pessoa.cpf = this.service.gerarCpf(this.estado, true);
            this.pessoa.cnh = this.service.gerarCnh();
            this.pessoa.renavan = this.service.gerarRenavan();
            this.pessoa.pispasep = this.service.gerarPisPasep();
            this.pessoa.cartaodecredito = this.service.gerarCartaoCredito();

        });
    }

    ngOnInit(): void {
        this.gerarPessoa();
    }
}
