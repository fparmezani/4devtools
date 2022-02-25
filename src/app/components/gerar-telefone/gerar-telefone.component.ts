import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/model/pessoa';
import { GeradorService } from 'src/app/services/gerador.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-gerar-telefone',
    templateUrl: './gerar-telefone.component.html',
})
export class GerarTelefoneComponent implements OnInit {
    telefone: string = '';
    URLGERADORBRASILEIRO = 'https://geradorbrasileiro.com/api/';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private http: HttpClient,
        private titleService: Title
    ) {
        this.titleService.setTitle('Gerador de Telefone');
    }

    ngOnInit(): void {
        this.gerarTelefone();
    }

    gerarTelefone() {
        this.http.get<Pessoa>(`${this.URLGERADORBRASILEIRO}faker/pessoa?limit=1`).subscribe((response: any) => {
            let telefone = response.values[0].telefone;
            this.telefone = telefone;
        });
    }

    gerarCopiar() {
        this.gerarTelefone();
        this.copiar();
    }

    copiar() {
        copy(this.telefone);
        this.toastr.success('Copiado!');
    }
}
