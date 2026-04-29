import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Endereco } from 'src/app/model/pessoa';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-endereco',
    templateUrl: './gerar-endereco.component.html',
})
export class GerarEnderecoComponent implements OnInit {
    endereco: Endereco = new Endereco();

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private title: Title,
        private meta: Meta
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar Endereço' },
            { name: 'author', content: 'Fernando Parmezani' },
            { name: 'keywords', content: 'gerar endereço, gerador endereço, gerar endereço pessoa física' },
        ]);
        this.title.setTitle('Gerador de Endereços - 4DevTools');
    }

    ngOnInit(): void {
        this.gerarEndereco();
    }

    gerarEndereco() {
        this.endereco = this.service.gerarEndereco();
    }

    copiarConteudo(value: string) {
        copy(value);
        this.toastr.success('Copiado!');
    }
}
