import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/model/pessoa';
import { GeradorService } from 'src/app/services/gerador.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-gerar-senha',
    templateUrl: './gerar-senha.component.html',
})
export class GerarSenhaComponent implements OnInit {
    senha: string = '';
    URLGERADORBRASILEIRO = 'https://geradorbrasileiro.com/api/';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private http: HttpClient,
        private titleService: Title
    ) {
        this.titleService.setTitle('Gerador de Nome');
    }

    ngOnInit(): void {
        this.gerarSenha();
    }

    gerarSenha() {
        this.http.get<Pessoa>(`${this.URLGERADORBRASILEIRO}faker/pessoa?limit=1`).subscribe((response: any) => {
            let senha = response.values[0].senha;
            this.senha = senha;
        });
    }

    gerarCopiar() {
        this.gerarSenha();
        this.copiar();
    }

    copiar() {
        copy(this.senha);
        this.toastr.success('Copiado!');
    }
}
