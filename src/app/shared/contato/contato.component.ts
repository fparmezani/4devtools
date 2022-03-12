import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
})
export class ContatoComponent implements OnInit {
    nome: string = '';
    email: string = '';
    mensagem: string = '';

    constructor(private meta: Meta, private title: Title, private _http: HttpClient, private toastr: ToastrService) {
        this.meta.addTags([
            { name: 'description', content: 'Contato' },
            { name: 'author', content: 'Fernando Parmezani' },
            { name: 'keywords', content: 'gerar cpf, gerador cpf, gerar documento cpf' },
        ]);

        this.title.setTitle('Contato da Empresa');
    }

    ngOnInit(): void {}

    sendMessage() {
        const obj = {
            nome: this.nome,
            email: this.email,
            mensagem: this.mensagem,
        };

        return this._http.post('sendmail', obj);
        this.toastr.success('Email enviado com sucesso');
        this.nome = '';
        this.email = '';
        this.mensagem = '';
    }
}
