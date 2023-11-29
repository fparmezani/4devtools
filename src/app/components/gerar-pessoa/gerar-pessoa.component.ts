import { Component, OnInit } from '@angular/core';
import { GeradorService } from 'src/app/services/gerador.service';
import * as copy from 'copy-to-clipboard';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CartaoCredito, Pessoa } from 'src/app/model/pessoa';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-gerar-pessoa',
    templateUrl: './gerar-pessoa.component.html',
})
export class GerarPessoaComponent implements OnInit {
    sexo: string = '';
    estado: string = 'SP';
    flag: string = '';
    pessoa: Pessoa = new Pessoa();
    dataNascimento: string = '';
    URLGERADORBRASILEIRO = 'https://geradorbrasileiro.com/api/';

    numeroCartaoCredito: string = '';
    dataValidadeCartaoCredito: string = '';
    cvvCartaoCredito: string = '';

    constructor(
        private service: GeradorService,
        private toastr: ToastrService,
        private http: HttpClient,
        private title: Title,
        private meta: Meta
    ) {
        this.meta.addTags([
            { name: 'description', content: 'Gerar Pessoa Física' },
            { name: 'author', content: 'Fernando Parmezani' },
            {
                name: 'keywords',
                content: 'gerar pessoa, gerador pessoa, gerar documento pessoa física',
            },
        ]);

        this.title.setTitle('Gerador de Pessoas - 4DevTools');
    }

    gerarPessoa() {
        this.http.get<Pessoa>(`${this.URLGERADORBRASILEIRO}faker/pessoa?limit=1`).subscribe((response: any) => {

            let stateNumber = this.getIdStateBySigla(this.estado);

            this.pessoa = response.values[0];
            this.pessoa.cpf = this.service.gerarCpf(this.estado, true);
            this.pessoa.cnh = this.service.gerarCnh();
            this.pessoa.renavan = this.service.gerarRenavan();
            this.pessoa.pispasep = this.service.gerarPisPasep();
            this.pessoa.cartaodecredito = new CartaoCredito();
            this.pessoa.cartaodecredito.numero = this.service.gerarCartaoDeCredito('');
            this.pessoa.cartaodecredito.cvv = this.service.gerarCvv();
            this.pessoa.cartaodecredito.dataValidade = this.service.gerarDataValidade();
            this.pessoa.cns = this.service.gerarCns();
            this.pessoa.tituloEleitor = this.service.gerarTituloEleitor(stateNumber);
        });
    }

    getIdStateBySigla(state: string) : any {
        let estados = [
            { nome: 'AC', value: '24' },
            { nome: 'AL', value: '17' },
            { nome: 'AM', value: '22' },
            { nome: 'AP', value: '25' },
            { nome: 'BA', value: '05' },
            { nome: 'CE', value: '07' },
            { nome: 'DF', value: '20' },
            { nome: 'ES', value: '14' },
            { nome: 'GO', value: '10' },
            { nome: 'MA', value: '11' },
            { nome: 'MG', value: '02' },
            { nome: 'MS', value: '19' },
            { nome: 'MT', value: '18' },
            { nome: 'PA', value: '13' },
            { nome: 'PB', value: '12' },
            { nome: 'PE', value: '08' },
            { nome: 'PI', value: '15' },
            { nome: 'PR', value: '06' },
            { nome: 'RJ', value: '03' },
            { nome: 'RN', value: '16' },
            { nome: 'RO', value: '23' },
            { nome: 'RR', value: '26' },
            { nome: 'RS', value: '04' },
            { nome: 'SC', value: '09' },
            { nome: 'SE', value: '21' },
            { nome: 'SP', value: '01' },
            { nome: 'TO', value: '27' },
        ];
        return estados.find((x) => x.nome == state)?.value;
    }

    copiarConteudo(value: string) {
        copy(value);
        this.toastr.success('Copiado!');
    }

    ngOnInit(): void {
        this.gerarPessoa();
    }
}
