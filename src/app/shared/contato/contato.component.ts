import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
})
export class ContatoComponent implements OnInit {
    corpo: string = '';

    constructor(private _http: HttpClient) {}

    ngOnInit(): void {}

    sendMessage() {
        return this._http.post('sendmail', this.corpo);
    }
}
