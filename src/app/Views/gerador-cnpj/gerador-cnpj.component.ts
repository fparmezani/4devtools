import { Component } from '@angular/core';
import { SNIPPETS } from 'src/app/shared/snippets';
import { passoDv } from 'src/app/shared/tabela-dv/tabela-dv.component';

const EXEMPLO = '12ABC34501DE';
const valor = (c: string) => c.charCodeAt(0) - 48;
const dv = (resto: number) => (resto < 2 ? 0 : 11 - resto);

@Component({
    selector: 'app-gerador-cnpj',
    templateUrl: './gerador-cnpj.component.html',
})
export class GeradorCnpjComponent {
    readonly snippets = SNIPPETS['cnpj'];

    readonly regexNumerico = '^\\d{2}\\.?\\d{3}\\.?\\d{3}\\/?\\d{4}-?\\d{2}$';
    readonly regexAlfanumerico = '^[0-9A-Z]{2}\\.?[0-9A-Z]{3}\\.?[0-9A-Z]{3}\\/?[0-9A-Z]{4}-?\\d{2}$';

    readonly passo1 = passoDv(EXEMPLO.split(''), EXEMPLO.split('').map(valor), [ 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]);
    readonly dv1 = dv(this.passo1.resto);
    readonly passo2 = passoDv(
        [ ...EXEMPLO.split(''), String(this.dv1) ],
        [ ...EXEMPLO.split('').map(valor), this.dv1 ],
        [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
    );
    readonly dv2 = dv(this.passo2.resto);

    readonly letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => ({ letra: l, valor: valor(l) }));
}
