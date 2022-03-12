import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
})
export class ContatoComponent implements OnInit {
    nome: string = '';
    email: string = '';
    mensagem: string = '';

    constructor(private _http: HttpClient, private toastr: ToastrService) {}

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
