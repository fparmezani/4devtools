import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { GerarCpfComponent } from './components/gerar-cpf/gerar-cpf.component';
import { GerarCnpjComponent } from './components/gerar-cnpj/gerar-cnpj.component';
import { GerarPessoaComponent } from './components/gerar-pessoa/gerar-pessoa.component';
import { GerarCartaodecreditoComponent } from './components/gerar-cartaodecredito/gerar-cartaodecredito.component';
import { VejatambemComponent } from './shared/vejatambem/vejatambem.component';
import { GerarCnhComponent } from './components/gerar-cnh/gerar-cnh.component';
import { GerarPisPasepComponent } from './components/gerar-pispasep/gerar-pispasep.component';
import { ContatoComponent } from './shared/contato/contato.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        GerarCpfComponent,
        GerarCnpjComponent,
        GerarPessoaComponent,
        GerarCartaodecreditoComponent,
        GerarCnhComponent,
        GerarPisPasepComponent,
        VejatambemComponent,
        ContatoComponent,
        DashboardComponent,
    ],
    imports: [ BrowserModule, AppRoutingModule, FormsModule, ToastrModule.forRoot(), HttpClientModule ],
    providers: [ DatePipe ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
