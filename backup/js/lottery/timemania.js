$(document).ready(() => {
    getTimemania();
});

$("#nv-new-timemania").click(() => {
    getTimemania();
});

$("#nv-new-copy-timemania").click(() => {
  	getTimemania();
  	copy(".nv-field-copy");
});

$(".nv-btn-textarea-copy").click(() => {
    copy(".nv-field-copy");
});

$(document).keypress((e) => {
    const keycode = (e.keyCode ? e.keyCode : e.which);

    if (keycode === 13) {
        getTimemania();
        copy(".nv-field-copy");
    }
});

function getTimemania() {
    registerBi();

    let arr = [];

    while (arr.length < 7) {
        let number = getRandomNumber();
        if (!arr.includes(number)) {
            arr.push(number);
        }
    }

    arr = arr.sort((a, b) => a - b);

    arr.forEach((value, i) => {
        arr[i] = `${value}  `;
    });

    arr = arr.join("");

    const month = getRandomTeam();
    arr = `${arr}-  Time do coração: ${month}`;

    const field = $("#nv-field-timemania");
    field.val(arr);

    autosize(field);
}

function getRandomNumber() {
    const number = Math.floor((Math.random() * 80) + 1);
    return number < 10 ? `0${number}` : number;
}

function getRandomTeam() {
    const arr = [
        "ABC/RN",
        "América/MG",
        "América/RJ",
        "América/RN",
        "Americano/RJ",
        "Atlético/GO",
        "Atlético/MG",
        "Atlético/PR",
        "Avai/SC",
        "Bahia/BA",
        "Bangu/RJ",
        "Barueri/SP",
        "Botafogo/PB",
        "Botafogo/RJ",
        "Bragantino/SP",
        "Brasiliense/DF",
        "Ceará/CE",
        "Corinthians/SP",
        "Coritiba/PR",
        "CRB/AL",
        "Criciúma/SC",
        "Cruzeiro/MG",
        "CSA/AL",
        "Desportiva/ES",
        "Figueirense/SC",
        "Flamengo/RJ",
        "Fluminense/RJ",
        "Fortaleza/CE",
        "Gama/DF",
        "Goiás/GO",
        "Grêmio/RS",
        "Guarani/SP",
        "Inter Limeira/SP",
        "Internacional/RS",
        "Ipatinga/MG",
        "Ituano/SP",
        "Ji-Paraná/RO",
        "Joinville/SC",
        "Juventude/RS",
        "Juventus/SP",
        "Londrina/PR",
        "Marília/SP",
        "Mixto/MT",
        "Moto Clube/MA",
        "Nacional/AM",
        "Náutico/PE",
        "Olaria/RJ",
        "Operário/MS",
        "Palmas/TO",
        "Palmeiras/SP",
        "Paraná/PR",
        "Paulista/SP",
        "Paysandú/PA",
        "Ponte Preta/SP",
        "Port Desport/SP",
        "Remo/PA",
        "Rio Branco/AC",
        "Rio Branco/ES",
        "River/PI",
        "Roraima/RR",
        "Samp Corrêa/MA",
        "Santa Cruz/PE",
        "Santo André/SP",
        "Santos/SP",
        "São Caetano/SP",
        "São Paulo/SP",
        "S Raimundo/AM",
        "Sergipe/SE",
        "Sport/PE",
        "Treze/PB",
        "Tuna Luso/PA",
        "Uberlândia/MG",
        "U Barbarense/SP",
        "União S João/SP",
        "Vasco Da Gama/RJ",
        "Vila Nova/GO",
        "Villa Nova/MG",
        "Vitória/BA",
        "XV Piracicaba/SP",
        "Ypiranga/AP"
    ];
    const index = Math.floor((Math.random() * 80));
    return arr[index];
}
