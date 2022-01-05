import { Component, OnInit } from '@angular/core';
import copy from 'copy-text-to-clipboard';
import { generate } from 'gerador-validador-cpf';

@Component({
    selector: 'app-cpf',
    templateUrl: './cpf.component.html',
    styleUrls: [ './cpf.component.css' ],
})
export class CpfComponent implements OnInit {
    cpf: string = '';

    constructor() {}

    ngOnInit(): void {}

    gerarCPF() {
        this.cpf = generate({ format: true });
    }

    copyTo() {
        copy(this.cpf);
    }
}
