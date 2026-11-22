import { Component, Input } from '@angular/core';

export interface PassoDv {
    rotulos: string[];
    valores: number[];
    pesos: number[];
    produtos: number[];
    soma: number;
    resto: number;
}

/** Monta um passo do cálculo de dígito verificador (soma ponderada e resto da divisão por 11). */
export function passoDv(rotulos: string[], valores: number[], pesos: number[], modulo = 11): PassoDv {
    const produtos = pesos.map((p, i) => valores[i] * p);
    const soma = produtos.reduce((a, b) => a + b, 0);
    return { rotulos: rotulos.slice(0, pesos.length), valores: valores.slice(0, pesos.length), pesos, produtos, soma, resto: soma % modulo };
}

/** Tabela "dígito / peso / produto" usada no passo a passo das páginas dos geradores. */
@Component({
    selector: 'app-tabela-dv',
    template: `
        <div class="doc-table-wrap">
            <table class="doc-table doc-table-num">
                <tbody>
                    <tr><th>{{ rotulo }}</th><td *ngFor="let r of passo.rotulos">{{ r }}</td></tr>
                    <tr *ngIf="mostrarValor"><th>Valor</th><td *ngFor="let v of passo.valores">{{ v }}</td></tr>
                    <tr><th>Peso</th><td *ngFor="let p of passo.pesos">{{ p }}</td></tr>
                    <tr><th>Produto</th><td *ngFor="let p of passo.produtos">{{ p }}</td></tr>
                </tbody>
            </table>
        </div>
    `,
})
export class TabelaDvComponent {
    @Input() passo!: PassoDv;
    @Input() rotulo = 'Dígito';
    @Input() mostrarValor = false;
}
