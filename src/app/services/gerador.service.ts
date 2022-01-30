import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GeradorService {
    constructor() {}
    gerarCpf(stateCpf: string, formataCPF: boolean) {
        const n1 = Math.round(Math.random() * 9);
        const n2 = Math.round(Math.random() * 9);
        const n3 = Math.round(Math.random() * 9);
        const n4 = Math.round(Math.random() * 9);
        const n5 = Math.round(Math.random() * 9);
        const n6 = Math.round(Math.random() * 9);
        const n7 = Math.round(Math.random() * 9);
        const n8 = Math.round(Math.random() * 9);
        const n9 = this.getStatesCpf(stateCpf);
        let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
        d1 = 11 - d1 % 11;
        if (d1 >= 10) d1 = 0;
        let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
        d2 = 11 - d2 % 11;
        if (d2 >= 10) d2 = 0;

        const cpf = formataCPF
            ? `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`
            : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;

        return cpf;
    }

    getStatesCpf(stateCpf: string) {
        const state = stateCpf == null || stateCpf == '' ? 'XX' : stateCpf;

        let number = 0;

        switch (state) {
            case 'RS':
                number = 0;
                break;
            case 'DF':
            case 'GO':
            case 'MT':
            case 'MS':
            case 'TO':
                number = 1;
                break;
            case 'AC':
            case 'AP':
            case 'AM':
            case 'PA':
            case 'RO':
            case 'RR':
                number = 2;
                break;
            case 'CE':
            case 'MA':
            case 'PI':
                number = 3;
                break;
            case 'AL':
            case 'PB':
            case 'PE':
            case 'RN':
                number = 4;
                break;
            case 'BA':
            case 'SE':
                number = 5;
                break;
            case 'MG':
                number = 6;
                break;
            case 'ES':
            case 'RJ':
                number = 7;
                break;
            case 'SP':
                number = 8;
                break;
            case 'PR':
            case 'SC':
                number = 9;
                break;
            case 'XX':
                number = Math.round(Math.random() * 9);
                break;
        }

        return number;
    }

    gerarCNPJ(formataCNPJ: boolean) {
        const n1 = Math.round(Math.random() * 9);
        const n2 = Math.round(Math.random() * 9);
        const n3 = Math.round(Math.random() * 9);
        const n4 = Math.round(Math.random() * 9);
        const n5 = Math.round(Math.random() * 9);
        const n6 = Math.round(Math.random() * 9);
        const n7 = Math.round(Math.random() * 9);
        const n8 = Math.round(Math.random() * 9);
        const n9 = 0;
        const n10 = 0;
        const n11 = 0;
        const n12 = 1;
        let d1 =
            n12 * 2 +
            n11 * 3 +
            n10 * 4 +
            n9 * 5 +
            n8 * 6 +
            n7 * 7 +
            n6 * 8 +
            n5 * 9 +
            n4 * 2 +
            n3 * 3 +
            n2 * 4 +
            n1 * 5;
        d1 = 11 - d1 % 11;
        if (d1 >= 10) d1 = 0;
        let d2 =
            d1 * 2 +
            n12 * 3 +
            n11 * 4 +
            n10 * 5 +
            n9 * 6 +
            n8 * 7 +
            n7 * 8 +
            n6 * 9 +
            n5 * 2 +
            n4 * 3 +
            n3 * 4 +
            n2 * 5 +
            n1 * 6;
        d2 = 11 - d2 % 11;
        if (d2 >= 10) d2 = 0;

        const cookie = formataCNPJ;
        const cnpj = cookie
            ? `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`
            : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;

        return cnpj;
    }

    getCookie() {}

    setCookie() {}
}
