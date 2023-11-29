import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotacao } from '../model/cotacao';

@Injectable({
    providedIn: 'root',
})
export class CotacaoService {
    URL = 'https://economia.awesomeapi.com.br/last';
    constructor(private http: HttpClient) {}

    getCotacao(moeda: string): Observable<Cotacao> {
        const request = this.URL + '/' + moeda;
        return this.http.get<Cotacao>(request);
    }
}
