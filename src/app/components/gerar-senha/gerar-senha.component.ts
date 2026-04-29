import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { GeradorService } from 'src/app/services/gerador.service';

@Component({
    selector: 'app-gerar-senha',
    templateUrl: './gerar-senha.component.html',
})
export class GerarSenhaComponent implements OnInit {
    senha: string = '';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private title: Title,
        private meta: Meta
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar Senha' },
            { name: 'author', content: 'Fernando Parmezani' },
            { name: 'keywords', content: 'gerar senha, gerador senha, gerar documento senha' },
        ]);
        this.title.setTitle('Gerador de Senha - 4DevTools');
    }

    ngOnInit(): void {
        this.gerarSenha();
    }

    gerarSenha() {
        this.senha = this.service.gerarPassword();
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
