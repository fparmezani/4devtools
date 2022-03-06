import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

/* Components */
import { GerarCpfComponent } from './components/gerar-cpf/gerar-cpf.component';
import { GerarCnpjComponent } from './components/gerar-cnpj/gerar-cnpj.component';
import { GerarPessoaComponent } from './components/gerar-pessoa/gerar-pessoa.component';
import { GerarCartaodecreditoComponent } from './components/gerar-cartaodecredito/gerar-cartaodecredito.component';
import { GerarCnhComponent } from './components/gerar-cnh/gerar-cnh.component';
import { GerarPisPasepComponent } from './components/gerar-pispasep/gerar-pispasep.component';
import { GerarNomeComponent } from './components/gerar-nome/gerar-nome.component';
import { GerarEnderecoComponent } from './components/gerar-endereco/gerar-endereco.component';
import { GerarSenhaComponent } from './components/gerar-senha/gerar-senha.component';
import { GerarTituloEleitorComponent } from './components/gerar-titulo-eleitor/gerar-titulo-eleitor.component';
import { GerarTelefoneComponent } from './components/gerar-telefone/gerar-telefone.component';

/* Views */
import { GeradorCpfComponent } from './Views/gerador-cpf/gerador-cpf.component';
import { GeradorCnpjComponent } from './Views/gerador-cnpj/gerador-cnpj.component';
import { GeradorCnhComponent } from './Views/gerador-cnh/gerador-cnh.component';

/* Shared */
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { ContatoComponent } from './shared/contato/contato.component';
import { VejatambemComponent } from './shared/vejatambem/vejatambem.component';
import { GerarRenavamComponent } from './components/gerar-renavam/gerar-renavam.component';
import { BuyMeACoffeComponent } from './shared/buy-me-a-coffe/buy-me-a-coffe.component';
import { DollarComponent } from './components/dollar/dollar.component';
import { DigitOnlyModule } from '@uiowa/digit-only';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { EuroComponent } from './components/euro/euro.component';
import { BitcoinComponent } from './components/bitcoin/bitcoin.component';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
        GerarCpfComponent,
        GerarCnpjComponent,
        GerarPessoaComponent,
        GerarCartaodecreditoComponent,
        GerarCnhComponent,
        GerarPisPasepComponent,
        GeradorCpfComponent,
        GeradorCnpjComponent,
        GeradorCnhComponent,
        GerarNomeComponent,
        GerarEnderecoComponent,
        GerarSenhaComponent,
        GerarTituloEleitorComponent,
        GerarTelefoneComponent,
        GerarRenavamComponent,
        GerarEnderecoComponent,
        GerarSenhaComponent,
        GerarTelefoneComponent,
        VejatambemComponent,
        ContatoComponent,
        DashboardComponent,
        BuyMeACoffeComponent,
        DollarComponent,
        EuroComponent,
        BitcoinComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        BrowserAnimationsModule,
        DigitOnlyModule,
    ],
    providers: [ DatePipe, { provide: LOCALE_ID, useValue: 'pt-BR' } ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
