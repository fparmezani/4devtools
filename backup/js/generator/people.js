$(document).ready(() => {
    setCookieGeneratorPeople();
    getPeople(false);
});

$('#nv-new-generator-people').click(() => {
    getPeople(false);
});

$('.nv-btn-textarea-copy-name').click(() => {
    copy('#nv-field-name');
});
$('.nv-btn-textarea-copy-birthday').click(() => {
    copy('#nv-field-birthday');
});
$('.nv-btn-textarea-copy-cpf').click(() => {
    copy('#nv-field-cpf');
});
$('.nv-btn-textarea-copy-rg').click(() => {
    copy('#nv-field-rg');
});
$('.nv-btn-textarea-copy-cns').click(() => {
    copy('#nv-field-cns');
});
$('.nv-btn-textarea-copy-voter-registration').click(() => {
    copy('#nv-field-voter-registration');
});
$('.nv-btn-textarea-copy-pis-pasep').click(() => {
    copy('#nv-field-pis-pasep');
});
$('.nv-btn-textarea-copy-cnh').click(() => {
    copy('#nv-field-cnh');
});
$('.nv-btn-textarea-copy-renavam').click(() => {
    copy('#nv-field-renavam');
});
$('.nv-btn-textarea-copy-mom').click(() => {
    copy('#nv-field-mom');
});
$('.nv-btn-textarea-copy-dad').click(() => {
    copy('#nv-field-dad');
});
$('.nv-btn-textarea-copy-credit-card').click(() => {
    copy('#nv-field-credit-card');
});
$('.nv-btn-textarea-copy-expiration-date').click(() => {
    copy('#nv-field-expiration-date');
});
$('.nv-btn-textarea-copy-cvv').click(() => {
    copy('#nv-field-cvv');
});
$('.nv-btn-textarea-copy-cep').click(() => {
    copy('#nv-field-cep');
});
$('.nv-btn-textarea-copy-street').click(() => {
    copy('#nv-field-street');
});
$('.nv-btn-textarea-copy-neighborhood').click(() => {
    copy('#nv-field-neighborhood');
});
$('.nv-btn-textarea-copy-city').click(() => {
    copy('#nv-field-city');
});
$('.nv-btn-textarea-copy-state').click(() => {
    copy('#nv-field-state');
});
$('.nv-btn-textarea-copy-email').click(() => {
    copy('#nv-field-email');
});
$('.nv-btn-textarea-copy-password').click(() => {
    copy('#nv-field-password');
});
$('.nv-btn-textarea-copy-cellphone').click(() => {
    copy('#nv-field-cellphone');
});
$('.nv-btn-textarea-copy-telephone').click(() => {
    copy('#nv-field-telephone');
});

$(document).keypress((e) => {
    const keycode = e.keyCode ? e.keyCode : e.which;

    if (keycode === 13) {
        getPeople(true);
    }
});

function getPeople(copyField = false) {
    if ($('#nv-new-generator-people').is(':disabled')) {
        return; // used for enter
    }

    disabledButtons(true);

    const data = {
        sex: $('#nv-type-sex').val(),
        state: $('#nv-state-cep').val(),
    };

    const search = $.get({
        url: `${getBaseUrlApi()}/api/generator-people`,
        data: data,
    }).then((data) => {
        registerBi();

        data.birthday = randomBirthday();
        data.cpf = getRandomCpf(data.cep.state);
        data.rg = getRandomRgSp();
        data.cns = getRandomCns();
        data.voterRegistration = getVoterRegistration(data.cep.state);
        data.pisPasep = getPisPasep();
        data.cnh = getCnh();
        data.renavam = getRenavam();

        data.creditCard = getRandomCreditCard();

        data.email = getEmail(data.people);
        data.password = getRandomPassword();
        data.cellphone = getRandomCellphone(data.cep.state);
        data.telephone = getRandomTelephone(data.cep.state);

        fillPeople(data);

        if (copyField) {
            copy('#nv-field-name');
        }
    });
}

function fillPeople(data) {
    autosize($('#nv-field-name').val(data.people));
    $('#nv-field-birthday').val(data.birthday);
    $('#nv-field-cpf').val(data.cpf);
    $('#nv-field-rg').val(data.rg);
    autosize($('#nv-field-cns').val(data.cns));
    $('#nv-field-voter-registration').val(data.voterRegistration);
    $('#nv-field-pis-pasep').val(data.pisPasep);
    $('#nv-field-cnh').val(data.cnh);
    $('#nv-field-renavam').val(data.renavam);

    autosize($('#nv-field-mom').val(data.mom));
    autosize($('#nv-field-dad').val(data.dad));

    autosize($('#nv-field-credit-card').val(data.creditCard.number));
    $('#nv-field-expiration-date').val(data.creditCard.expirationDate);
    $('#nv-field-cvv').val(data.creditCard.cvv);

    const format = (cep) => `${cep.substring(0, 5)}-${cep.substring(5, 8)}`;
    const street = data.cep.type ? `${data.cep.type} ${data.cep.street}` : '';
    $('#nv-field-cep').val(format(data.cep.cep));
    autosize($('#nv-field-street').val(street));
    autosize($('#nv-field-neighborhood').val(data.cep.neighborhood));
    $('#nv-field-city').val(data.cep.city);
    $('#nv-field-state').val(data.cep.state);

    autosize($('#nv-field-email').val(data.email));
    $('#nv-field-password').val(data.password);
    $('#nv-field-cellphone').val(data.cellphone);
    $('#nv-field-telephone').val(data.telephone);

    disabledButtons(false);
}

function disabledButtons(value) {
    $('#nv-new-generator-people').prop('disabled', value);
}

function randomBirthday() {
    let month = '0' + (Math.floor(Math.random() * 12) + 1).toString();
    month = month.substr(month.length - 2);

    const arrMonth31Days = [ '01', '03', '05', '07', '08', '10', '12' ];
    const arrMonth30Days = [ '04', '06', '09', '11' ];
    const randomDay = $.inArray(month, arrMonth31Days) !== -1 ? 31 : $.inArray(month, arrMonth30Days) !== -1 ? 30 : 28;

    let day = '0' + (Math.floor(Math.random() * randomDay) + 1).toString();
    day = day.substr(day.length - 2);

    const year = new Date().getFullYear() - Math.floor(Math.random() * 90) - 1;

    return `${day}/${month}/${year}`;
}

function getRandomCpf(state) {
    const n1 = Math.round(Math.random() * 9);
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);
    const n9 = getStatesCpf(state);

    let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - mod(d1, 11);
    if (d1 >= 10) {
        d1 = 0;
    }

    let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - mod(d2, 11);
    if (d2 >= 10) {
        d2 = 0;
    }

    return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
}

function getStatesCpf(state) {
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
    }

    return number;
}

function mod(dividend, divider) {
    return Math.round(dividend - Math.floor(dividend / divider) * divider);
}

function getRandomRgSp() {
    const n1 = Math.floor(Math.random() * 4 + 1);
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);

    const sum = n1 * 2 + n2 * 3 + n3 * 4 + n4 * 5 + n5 * 6 + n6 * 7 + n7 * 8 + n8 * 9;
    let digit = 11 - sum % 11;

    if (digit === 11) {
        digit = 0;
    }

    if (digit === 10) {
        digit = 'X';
    }

    return `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}-${digit}`;
}

function getRandomCns() {
    let cns = 0;

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
}

function getVoterRegistration(stateParam) {
    const n1 = Math.round(Math.random() * 9);
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);

    const state = getStatesVoterRegistration(stateParam);
    const stateSplit = state.split('');

    const n9 = stateSplit[0];
    const n10 = stateSplit[1];

    let d1 = n1 * 2 + n2 * 3 + n3 * 4 + n4 * 5 + n5 * 6 + n6 * 7 + n7 * 8 + n8 * 9;
    d1 = d1 % 11;
    d1 = validateRestOfDivision(d1, state);

    let d2 = n9 * 7 + n10 * 8 + d1 * 9;
    d2 = d2 % 11;
    d2 = validateRestOfDivision(d2, state);

    return `${n1}${n2}${n3}${n4} ${n5}${n6}${n7}${n8} ${n9}${n10}${d1}${d2}`;
}

function getStatesVoterRegistration(state) {
    const obj = {
        AC: '24',
        AL: '17',
        AM: '22',
        AP: '25',
        BA: '05',
        CE: '07',
        DF: '20',
        ES: '14',
        GO: '10',
        MA: '11',
        MG: '02',
        MS: '19',
        MT: '18',
        PA: '13',
        PB: '12',
        PE: '08',
        PI: '15',
        PR: '06',
        RJ: '03',
        RN: '16',
        RO: '23',
        RR: '26',
        RS: '04',
        SC: '09',
        SE: '21',
        SP: '01',
        TO: '27',
    };

    return obj[state];
}

function validateRestOfDivision(dv, state) {
    if (dv === 10) {
        return 0;
    }

    if (dv === 0) {
        // para os títulos emitidos em São Paulo ou Minas Gerais...
        if (state === '01' || state === '02') {
            return 1;
        }
    }

    return dv;
}

function getPisPasep() {
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

function getCnh() {
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

function getRenavam() {
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

function getRandomCreditCard() {
    const arr = getBanner();
    const length = 16 - arr.length;
    for (var i = 1; i < length; i++) {
        arr.push(Math.round(Math.random() * 9));
    }

    let sum = 0;
    let aux = true;
    let ninesOut = 0;
    arr.forEach((value, i) => {
        ninesOut = parseInt(value) * (aux ? 2 : 1); // false = 1 vs true = 2
        ninesOut = ninesOut > 9 ? ninesOut - 9 : ninesOut;
        sum = sum + ninesOut;
        aux = !aux;
        ninesOut = 0;
    });

    let digit = 10 - sum % 10;
    if (digit == 10) {
        digit = 0;
    }

    const creditCard = {
        number: `${arr[0]}${arr[1]}${arr[2]}${arr[3]} ${arr[4]}${arr[5]}${arr[6]}${arr[7]} ${arr[8]}${arr[9]}${arr[10]}${arr[11]} ${arr[12]}${arr[13]}${arr[14]}${digit}`,
        cvv: randomCvv(),
        expirationDate: randomExpirationDate(),
    };

    return creditCard;
}

function getBanner() {
    let jsonNumbers = {
        visa: [ 4 ],
        mastercard: [ 51, 52, 53, 54, 55 ],
        elo: [ 636368, 438935, 504175, 451416 ],
        discover: [ 6011, 622, 65 ],
        jcb: [ 35 ],
    };

    const arrNumber = [];
    for (banner in jsonNumbers) {
        jsonNumbers[banner].map((value) => arrNumber.push(value));
    }

    let number = arrNumber[Math.floor(Math.random() * arrNumber.length)];
    number = number.toString().split('');
    number = number.map(Number);

    return number;
}

function randomCvv() {
    let random = Math.floor(Math.random() * 999) + 1;
    let cvv = '00' + random.toString();
    return cvv.substr(cvv.length - 3);
}

function randomExpirationDate() {
    let month = '0' + (Math.floor(Math.random() * 12) + 1).toString();
    month = month.substr(month.length - 2);

    const arrMonth31Days = [ '01', '03', '05', '07', '08', '10', '12' ];
    const arrMonth30Days = [ '04', '06', '09', '11' ];
    const randomDay = $.inArray(month, arrMonth31Days) !== -1 ? 31 : $.inArray(month, arrMonth30Days) !== -1 ? 30 : 28;

    let day = '0' + (Math.floor(Math.random() * randomDay) + 1).toString();
    day = day.substr(day.length - 2);

    const year = new Date().getFullYear() + Math.floor(Math.random() * 10) + 1;

    return `${day}/${month}/${year}`;
}

function getEmail(people) {
    const names = people.split(' ');
    const removeAccents = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const firstName = removeAccents(names[0]);
    const lastName = removeAccents(names[names.length - 1]);

    return `${firstName}.${lastName}@geradornv.com.br`;
}

function getRandomPassword() {
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

function getRandomCellphone(state) {
    const ddd = getDDD(state);
    const operator = getOperatorCellphone();

    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);

    return `(${ddd}) ${operator}${n3}${n4}-${n5}${n6}${n7}${n8}`;
}

function getDDD(state) {
    const ddds = {
        AC: [ 68 ],
        AL: [ 82 ],
        AM: [ 92, 97 ],
        AP: [ 96 ],
        BA: [ 71, 73, 74, 75, 77 ],
        CE: [ 85, 88 ],
        DF: [ 61 ],
        ES: [ 27, 28 ],
        GO: [ 62, 64 ],
        MA: [ 98, 99 ],
        MG: [ 31, 32, 33, 34, 35, 37, 38 ],
        MS: [ 67 ],
        MT: [ 65, 66 ],
        PA: [ 91, 93, 94 ],
        PB: [ 83 ],
        PE: [ 81, 87 ],
        PI: [ 86, 89 ],
        PR: [ 41, 42, 43, 44, 45, 46 ],
        RJ: [ 21, 22, 24 ],
        RN: [ 84 ],
        RO: [ 69 ],
        RR: [ 95 ],
        RS: [ 51, 53, 54, 55 ],
        SC: [ 47, 48, 49 ],
        SE: [ 79 ],
        SP: [ 11, 12, 13, 14, 15, 16, 17, 18, 19 ],
        TO: [ 63 ],
    };

    const dddState = ddds[state];
    return dddState[Math.floor(Math.random() * dddState.length)];
}

function getOperatorCellphone() {
    const operators = {
        Vivo: [ 967, 971, 972, 995, 996, 997, 998, 999 ],
        Claro: [ 968, 973, 974, 975, 976, 991, 992, 993, 994 ],
        Tim: [ 969, 979, 980, 981, 982, 983 ],
        Oi: [ 984, 985, 986, 987, 988, 989 ],
    };

    const keys = Object.keys(operators);
    const random = operators[keys[(keys.length * Math.random()) << 0]];
    return random[Math.floor(Math.random() * random.length)];
}

function getRandomTelephone(state) {
    const ddd = getDDD(state);

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

function setCookieGeneratorPeople() {
    const sex = $('#nv-type-sex');
    sex.change(() => setCookie(sex.attr('id'), sex.val()));
    sex.val(getCookie(sex.attr('id')) || 'x');

    const state = $('#nv-state-cep');
    state.change(() => setCookie(state.attr('id'), state.val()));
    state.val(getCookie(state.attr('id')) || 'XX');
}
