import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
})
export class ContatoComponent implements OnInit {
    nome: string = '';
    email: string = '';
    mensagem: string = '';

    constructor(private _http: HttpClient) {}

    ngOnInit(): void {}

    sendMessage() {
        const obj = {
            nome: this.nome,
            email: this.email,
            mensagem: this.mensagem,
        };

        return this._http.post('sendmail', obj);
    }
}
