import { Component, OnInit } from '@angular/core';
import { GeradorService } from 'src/app/services/gerador.service';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-gerar-pessoa',
    templateUrl: './gerar-pessoa.component.html',
})
export class GerarPessoaComponent implements OnInit {
    sexo: string = '';
    estado: string = 'SP';

    nome: string = '';
    dataNascimento: string = '';

    constructor(private service: GeradorService, private toastr: ToastrService) {}

    gerarPessoa() {
        this.nome = this.service.ger;
    }

    ngOnInit(): void {}
}
