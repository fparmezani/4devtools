import { Component } from '@angular/core';
import { SNIPPETS } from 'src/app/shared/snippets';

@Component({
    selector: 'app-gerador-cpf',
    templateUrl: './gerador-cpf.component.html',
})
export class GeradorCpfComponent {
    readonly regexFormatado = '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$';
    readonly regexNumeros = '^\\d{11}$';
    readonly regexAmbos = '^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$';

    readonly regioes = [
        { digito: 0, estados: 'RS' },
        { digito: 1, estados: 'DF, GO, MS, MT e TO' },
        { digito: 2, estados: 'AC, AM, AP, PA, RO e RR' },
        { digito: 3, estados: 'CE, MA e PI' },
        { digito: 4, estados: 'AL, PB, PE e RN' },
        { digito: 5, estados: 'BA e SE' },
        { digito: 6, estados: 'MG' },
        { digito: 7, estados: 'ES e RJ' },
        { digito: 8, estados: 'SP' },
        { digito: 9, estados: 'PR e SC' },
    ];

    readonly snippets = SNIPPETS['cpf'];
}
