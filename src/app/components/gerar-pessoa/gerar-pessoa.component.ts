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

    nome: string = '';
    dataNascimento: string = '';
    URLGERADORBRASILEIRO = 'https://geradorbrasileiro.com/api/';

    constructor(private service: GeradorService, private toastr: ToastrService, private http: HttpClient) {}

    gerarPessoa() {
        this.http.get<Pessoa>(`${this.URLGERADORBRASILEIRO}faker/pessoa?limit=1`).subscribe((response: any) => {
            this.nome = response.values[0].nome;
        });
    }

    ngOnInit(): void {
        this.gerarPessoa();
    }
}
