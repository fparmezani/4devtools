import { Injectable } from '@angular/core';
import { Banner } from '../model/banner';
import { DDD } from '../model/DDD';
import { Operadora } from '../model/operadora';

@Injectable({
    providedIn: 'root',
})
export class GeradorService {
    DDDs: DDD[] = [];
    operadoras: Operadora[] = [];
    dominios: string[] = [];
    banners: any[] = [];

    constructor() {
        this.banners = [
            { nome: 'Visa', value: [ 4 ] },
            { nome: 'MasterCard', value: [ 51, 52, 53, 54, 55 ] },
            { nome: 'Elo', value: [ 636368, 438935, 504175, 451416 ] },
            { nome: 'Discover', value: [ 6011, 622, 65 ] },
            { nome: 'JCB', value: [ 35 ] },
        ];

        this.operadoras = [
            { nome: 'Vivo', value: [ 967, 971, 972, 995, 996, 997, 998, 999 ] },
            { nome: 'Claro', value: [ 968, 973, 974, 975, 976, 991, 992, 993, 994 ] },
            { nome: 'Tim', value: [ 969, 979, 980, 981, 982, 983 ] },
            { nome: 'Oi', value: [ 984, 985, 986, 987, 988, 989 ] },
        ];

        this.DDDs = [
            { nome: 'AC', value: [ 68 ] },
            { nome: 'AL', value: [ 82 ] },
            { nome: 'AM', value: [ 92, 97 ] },
            { nome: 'AP', value: [ 96 ] },
            { nome: 'BA', value: [ 71, 73, 74, 75, 77 ] },
            { nome: 'CE', value: [ 85, 88 ] },
            { nome: 'DF', value: [ 61 ] },
            { nome: 'ES', value: [ 27, 28 ] },
            { nome: 'GO', value: [ 62, 64 ] },
            { nome: 'MA', value: [ 98, 99 ] },
            { nome: 'MG', value: [ 31, 32, 33, 34, 35, 37, 38 ] },
            { nome: 'MS', value: [ 67 ] },
            { nome: 'MT', value: [ 65, 66 ] },
            { nome: 'PA', value: [ 91, 93, 94 ] },
            { nome: 'PB', value: [ 83 ] },
            { nome: 'PE', value: [ 81, 87 ] },
            { nome: 'PI', value: [ 86, 89 ] },
            { nome: 'PR', value: [ 41, 42, 43, 44, 45, 46 ] },
            { nome: 'RJ', value: [ 21, 22, 24 ] },
            { nome: 'RN', value: [ 84 ] },
            { nome: 'RO', value: [ 69 ] },
            { nome: 'RR', value: [ 95 ] },
            { nome: 'RS', value: [ 51, 53, 54, 55 ] },
            { nome: 'SC', value: [ 47, 48, 49 ] },
            { nome: 'SE', value: [ 79 ] },
            { nome: 'SP', value: [ 11, 12, 13, 14, 15, 16, 17, 18, 19 ] },
            { nome: 'TO', value: [ 63 ] },
        ];

        this.dominios = [ 'hotmail.com', 'gmail.com', 'uol.com.br', 'terra.com.br', 'ig.com', '4devtools.com' ];
    }

    gerarCpf(stateCpf: string, formataCPF: boolean) {
        const n1 = Math.round(Math.random() * 9);
        const n2 = Math.round(Math.random() * 9);
        const n3 = Math.round(Math.random() * 9);
        const n4 = Math.round(Math.random() * 9);
        const n5 = Math.round(Math.random() * 9);
        const n6 = Math.round(Math.random() * 9);
        const n7 = Math.round(Math.random() * 9);
        const n8 = Math.round(Math.random() * 9);
        const n9 = this.gerarEstadosCpf(stateCpf);
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

    gerarRenavan() {
        const n1 = Math.round(Math.random() * 9);
        const n2 = Math.round(Math.random() * 9);
        const n3 = Math.round(Math.random() * 9);
        const n4 = Math.round(Math.random() * 9);
        const n5 = Math.round(Math.random() * 9);
        const n6 = Math.round(Math.random() * 9);
        const n7 = Math.round(Math.random() * 9);
        const n8 = Math.round(Math.random() * 9);
        const n9 = Math.round(Math.random() * 9);
        const n10 = Math.round(Math.random() * 9);

        const sum = n10 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 2 + n1 * 3;
        let dv = 11 - sum % 11;

        if (dv >= 10) {
            dv = 0;
        }

        const renavam = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${dv}`;
        return renavam;
    }

    gerarEstadosCpf(stateCpf: string) {
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

    gerarAniversario() {
        let month = '0' + (Math.floor(Math.random() * 12) + 1).toString();
        month = month.substr(month.length - 2);

        const arrMonth31Days = [ '01', '03', '05', '07', '08', '10', '12' ];
        const arrMonth30Days = [ '04', '06', '09', '11' ];
        const randomDay =
            $.inArray(month, arrMonth31Days) !== -1 ? 31 : $.inArray(month, arrMonth30Days) !== -1 ? 30 : 28;

        let day = '0' + (Math.floor(Math.random() * randomDay) + 1).toString();
        day = day.substr(day.length - 2);

        const year = new Date().getFullYear() - Math.floor(Math.random() * 90) - 1;

        return `${day}/${month}/${year}`;
    }

    gerarCns() {
        let cns = '0';

        while (cns.length !== 15) {
            let n1 = Math.floor(Math.random() * 3 + 1);
            if (n1 === 3) {
                n1 = Math.floor(Math.random() * 3 + 7);
            }

            const n2 = Math.floor(Math.random() * 99999 + 1);
            const n3 = Math.floor(Math.random() * 99999 + 1);
            cns = n1 + ('0' + n2).slice(-5) + ('0' + n3).slice(-5);

            let soma =
                Number(cns.substring(0, 1)) * 15 +
                Number(cns.substring(1, 2)) * 14 +
                Number(cns.substring(2, 3)) * 13 +
                Number(cns.substring(3, 4)) * 12 +
                Number(cns.substring(4, 5)) * 11 +
                Number(cns.substring(5, 6)) * 10 +
                Number(cns.substring(6, 7)) * 9 +
                Number(cns.substring(7, 8)) * 8 +
                Number(cns.substring(8, 9)) * 7 +
                Number(cns.substring(9, 10)) * 6 +
                Number(cns.substring(10, 11)) * 5;

            let resto = soma % 11;

            let dv = 11 - resto;
            dv = dv === 11 ? 0 : dv;

            if (dv === 10) {
                soma =
                    Number(cns.substring(0, 1)) * 15 +
                    Number(cns.substring(1, 2)) * 14 +
                    Number(cns.substring(2, 3)) * 13 +
                    Number(cns.substring(3, 4)) * 12 +
                    Number(cns.substring(4, 5)) * 11 +
                    Number(cns.substring(5, 6)) * 10 +
                    Number(cns.substring(6, 7)) * 9 +
                    Number(cns.substring(7, 8)) * 8 +
                    Number(cns.substring(8, 9)) * 7 +
                    Number(cns.substring(9, 10)) * 6 +
                    Number(cns.substring(10, 11)) * 5 +
                    2;
                resto = soma % 11;
                dv = 11 - resto;
                cns += '001' + String(dv);
            } else {
                cns += '000' + String(dv);
            }

            if (cns.length === 15) {
                return `${cns.substr(0, 3)} ${cns.substr(3, 4)} ${cns.substr(7, 4)} ${cns.substr(11, 4)}`;
            }
        }
        return '';
    }

    gerarPisPasep() {
        const n1 = Math.round(Math.random() * 9);
        const n2 = Math.round(Math.random() * 9);
        const n3 = Math.round(Math.random() * 9);
        const n4 = Math.round(Math.random() * 9);
        const n5 = Math.round(Math.random() * 9);
        const n6 = Math.round(Math.random() * 9);
        const n7 = Math.round(Math.random() * 9);
        const n8 = Math.round(Math.random() * 9);
        const n9 = Math.round(Math.random() * 9);
        const n10 = Math.round(Math.random() * 9);

        const sum = n1 * 3 + n2 * 2 + n3 * 9 + n4 * 8 + n5 * 7 + n6 * 6 + n7 * 5 + n8 * 4 + n9 * 3 + n10 * 2;

        let digit = 11 - sum % 11;
        if (digit === 10 || digit === 11) {
            digit = 0;
        }

        return `${n1}${n2}${n3}.${n4}${n5}${n6}${n7}${n8}.${n9}${n10}-${digit}`;
    }

    gerarCnh() {
        let cnh = '';

        while (true) {
            const n1 = Math.round(Math.random() * 9);
            const n2 = Math.round(Math.random() * 9);
            const n3 = Math.round(Math.random() * 9);
            const n4 = Math.round(Math.random() * 9);
            const n5 = Math.round(Math.random() * 9);
            const n6 = Math.round(Math.random() * 9);
            const n7 = Math.round(Math.random() * 9);
            const n8 = Math.round(Math.random() * 9);
            const n9 = Math.round(Math.random() * 9);

            let aux = 0;

            const sumDv1 = n1 * 9 + n2 * 8 + n3 * 7 + n4 * 6 + n5 * 5 + n6 * 4 + n7 * 3 + n8 * 2 + n9 * 1;
            let dv1 = sumDv1 % 11;
            if (dv1 >= 10) {
                dv1 = 0;
                aux = 2;
            }

            const sumDv2 = n1 * 1 + n2 * 2 + n3 * 3 + n4 * 4 + n5 * 5 + n6 * 6 + n7 * 7 + n8 * 8 + n9 * 9;
            let dv2 = sumDv2 % 11;
            dv2 = dv2 >= 10 ? 0 : dv2 - aux;

            // gambi because life is like this... ¯\_(ツ)_/¯
            if (dv2 < 0) {
                continue;
            }

            cnh = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${dv1}${dv2}`;

            break;
        }

        return cnh;
    }

    getRenavam() {
        const n1 = Math.round(Math.random() * 9);
        const n2 = Math.round(Math.random() * 9);
        const n3 = Math.round(Math.random() * 9);
        const n4 = Math.round(Math.random() * 9);
        const n5 = Math.round(Math.random() * 9);
        const n6 = Math.round(Math.random() * 9);
        const n7 = Math.round(Math.random() * 9);
        const n8 = Math.round(Math.random() * 9);
        const n9 = Math.round(Math.random() * 9);
        const n10 = Math.round(Math.random() * 9);

        const sum = n10 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 2 + n1 * 3;
        let dv = 11 - sum % 11;

        if (dv >= 10) {
            dv = 0;
        }
        return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${dv}`;
    }

    gerarBandeira(flag: string) {
        const auxRandom = [];

        const bannerFlag = flag === '' ? Math.floor(Math.random() * this.banners.length) : parseInt(flag);

        this.banners.map((banner) => {
            auxRandom.push(banner.value);
        });

        const arrNumber = this.banners[bannerFlag];

        let number = arrNumber.value[Math.floor(Math.random() * arrNumber.value.length)];
        number = number.toString().split('');
        number = number.map(Number);

        return number;
    }

    gerarCartaoDeCredito(flag: string) {
        const arr = this.gerarBandeira(flag);
        const length = 16 - arr.length;

        for (var i = 1; i < length; i++) {
            arr.push(Math.round(Math.random() * 9));
        }

        let sum = 0;
        let aux = true;
        let ninesOut = 0;

        for (i = 0; i < arr.length; i++) {
            ninesOut = parseInt(arr[i]) * (aux ? 2 : 1); // false = 1 vs true = 2
            ninesOut = ninesOut > 9 ? ninesOut - 9 : ninesOut;
            sum = sum + ninesOut;
            aux = !aux;
            ninesOut = 0;
        }

        let digit = 10 - sum % 10;
        if (digit == 10) digit = 0;

        var creditcard = `${arr[0]}${arr[1]}${arr[2]}${arr[3]} ${arr[4]}${arr[5]}${arr[6]}${arr[7]} ${arr[8]}${arr[9]}${arr[10]}${arr[11]} ${arr[12]}${arr[13]}${arr[14]}${digit}`;

        return creditcard;
    }
    gerarDataValidade() {
        let month = '0' + (Math.floor(Math.random() * 12) + 1).toString();
        month = month.substr(month.length - 2);

        const arrMonth31Days = [ '01', '03', '05', '07', '08', '10', '12' ];
        const arrMonth30Days = [ '04', '06', '09', '11' ];
        const randomDay = arrMonth31Days.includes(month) ? 31 : arrMonth30Days.includes(month) ? 30 : 28;
        let day = '0' + (Math.floor(Math.random() * randomDay) + 1).toString();
        day = day.substr(day.length - 2);
        const year = new Date().getFullYear() + Math.floor(Math.random() * 10) + 1;
        return `${day}/${month}/${year}`;
    }
    gerarCvv() {
        let random = Math.floor(Math.random() * 999) + 1;
        let cvv = '00' + random.toString();
        return cvv.substr(cvv.length - 3);
    }

    gerarEmail(people: string): string {
        const names = people.split(' ');

        const firstName = this.removeAccents(names[0]);
        const lastName = this.removeAccents(names[names.length - 1]);
        const dominio = this.gerarDominio();
        return `${firstName}.${lastName}@${dominio}`;
    }

    gerarDominio() {
        return this.dominios[Math.floor(Math.random() * this.dominios.length)];
    }

    removeAccents(value: string) {
        return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    gerarPassword() {
        const capital = 'ABCDEFGHIJKLMNOPQRSTUVYXWZ';
        const small = 'abcdefghijklmnopqrstuvyxwz';
        const numbers = '0123456789';
        const symbols = '!@#$%&*()_+=';

        const stringForPassword = `${capital}${small}${numbers}${symbols}`;

        const lengthCharSelected = stringForPassword.length;
        let password = '';
        for (let i = 0; i < 12; i++) {
            let random = Math.round(Math.random() * lengthCharSelected);
            password = password.concat(stringForPassword.charAt(random));
        }

        return password;
    }

    gerarCelular(estado: any) {
        const ddd = this.gerarDDD(estado);
        const operator = this.gerarOperatoraCelular();

        const n3 = Math.round(Math.random() * 9);
        const n4 = Math.round(Math.random() * 9);
        const n5 = Math.round(Math.random() * 9);
        const n6 = Math.round(Math.random() * 9);
        const n7 = Math.round(Math.random() * 9);
        const n8 = Math.round(Math.random() * 9);

        return `(${ddd}) ${operator}${n3}${n4}-${n5}${n6}${n7}${n8}`;
    }

    gerarDDD(estado: number) {
        let arrNumber: any = [];

        this.DDDs.forEach((ddd) => {
            arrNumber.push(ddd.value);
        });

        // let number = arrNumber[Math.floor(Math.random() * arrNumber.length)];

        const ddd = this.DDDs[Math.floor(Math.random() * this.DDDs.length)];
        return arrNumber[Math.floor(Math.random() * ddd.value.length)];

        // return dddState[Math.floor(Math.random() * dddState)];
    }

    gerarOperatoraCelular() {
        let arrNumber: any = [];

        this.operadoras.forEach((operadora) => {
            arrNumber.push(operadora.value);
        });

        return arrNumber[Math.floor(Math.random() * arrNumber.length)];
    }

    gerarTelefone(estado: any) {
        const ddd = this.gerarDDD(estado);

        const n1 = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
        const n2 = Math.round(Math.random() * 9);
        const n3 = Math.round(Math.random() * 9);
        const n4 = Math.round(Math.random() * 9);
        const n5 = Math.round(Math.random() * 9);
        const n6 = Math.round(Math.random() * 9);
        const n7 = Math.round(Math.random() * 9);
        const n8 = Math.round(Math.random() * 9);

        return `(${ddd}) ${n1}${n2}${n3}${n4}-${n5}${n6}${n7}${n8}`;
    }

    gerarTituloEleitor(state: string) {
        if (state === '') {
            state = '01';
        }

        const n1 = Math.round(Math.random() * 9);
        const n2 = Math.round(Math.random() * 9);
        const n3 = Math.round(Math.random() * 9);
        const n4 = Math.round(Math.random() * 9);
        const n5 = Math.round(Math.random() * 9);
        const n6 = Math.round(Math.random() * 9);
        const n7 = Math.round(Math.random() * 9);
        const n8 = Math.round(Math.random() * 9);

        const states = state.split('');
        const n9 = parseInt(states[0]);
        const n10 = parseInt(states[1]);

        let d1 = n1 * 2 + n2 * 3 + n3 * 4 + n4 * 5 + n5 * 6 + n6 * 7 + n7 * 8 + n8 * 9;
        d1 = d1 % 11;
        d1 = this.validateRestOfDivision(d1, state);

        let d2 = n9 * 7 + n10 * 8 + d1 * 9;
        d2 = d2 % 11;
        d2 = this.validateRestOfDivision(d2, state);

        const numero = `${n1}${n2}${n3}${n4} ${n5}${n6}${n7}${n8} ${n9}${n10}${d1}${d2}`;

        return numero;
    }

    validateRestOfDivision(dv: number, state: string) {
        if (dv === 10) {
            return 0;
        }

        if (dv === 0) {
            if (state === '01' || state === '02') {
                return 1;
            }
        }

        return dv;
    }

    getCookie() {}

    setCookie() {}

    /* MATH */
    mod(dividend: number, divider: number): number {
        return Math.round(dividend - Math.floor(dividend / divider) * divider);
    }
}
