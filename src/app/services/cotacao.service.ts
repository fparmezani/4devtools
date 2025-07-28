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
        const request = this.URL + '/' + moeda + '?token=7b9cf009de479ad708a7e084d89e53521422c0c006a73587f4cbf69e2c5dee75';
        return this.http.get<Cotacao>(request);
    }
}
