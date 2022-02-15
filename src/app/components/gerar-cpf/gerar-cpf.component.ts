import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { GeradorService } from 'src/app/services/gerador.service';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-gerar-cpf',
    templateUrl: './gerar-cpf.component.html',
})
export class GerarCpfComponent implements OnInit {
    cpf: string = '';
    cpfState: string = 'XX';
    formataCPF: boolean = true;

    constructor(private geradorService: GeradorService, private toastr: ToastrService, private titleService: Title) {
        this.titleService.setTitle('Gerador de CPF');
    }

    ngOnInit(): void {
        this.gerarCpf();
    }

    gerarCpf() {
        this.cpf = this.geradorService.gerarCpf(this.cpfState, this.formataCPF);
    }

    toggleFormat() {
        if (this.formataCPF) {
            this.cpf = this.cpf.replace(/[^0-9]/g, '');
        } else {
            this.cpf = this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
    }

    gerarCopiar() {
        this.gerarCpf();
        this.copiar();
        this.toastr.success('Copiado!');
    }

    copiar() {
        copy(this.cpf);
        this.toastr.success('Copiado!');
    }
}
