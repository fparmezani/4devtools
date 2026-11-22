import { Component } from '@angular/core';
import { SNIPPETS } from 'src/app/shared/snippets';
import { passoDv } from 'src/app/shared/tabela-dv/tabela-dv.component';

const BASE = '456789123'.split('');

@Component({
    selector: 'app-gerador-cnh',
    templateUrl: './gerador-cnh.component.html',
})
export class GeradorCnhComponent {
    readonly snippets = SNIPPETS['cnh'];
    readonly regex = '^\d{11}$';

    readonly passo1 = passoDv(BASE, BASE.map(Number), [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]);
    readonly dv1 = this.passo1.resto >= 10 ? 0 : this.passo1.resto;
    readonly passo2 = passoDv(BASE, BASE.map(Number), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
    readonly dv2 = this.passo2.resto >= 10 ? 0 : this.passo2.resto;
}
