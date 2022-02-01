import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { ToastrModule } from 'ngx-toastr';

import { GerarCpfComponent } from './components/gerar-cpf/gerar-cpf.component';
import { GerarCnpjComponent } from './components/gerar-cnpj/gerar-cnpj.component';
import { GerarPessoaComponent } from './components/gerar-pessoa/gerar-pessoa.component';

@NgModule({
    declarations: [ AppComponent, GerarCpfComponent, GerarCnpjComponent, GerarPessoaComponent ],
    imports: [ BrowserModule, AppRoutingModule, FormsModule, ToastrModule.forRoot() ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
