import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerarCpfComponent } from './components/gerar-cpf/gerar-cpf.component';
import { GerarCnpjComponent } from './components/gerar-cnpj/gerar-cnpj.component';
import { ValidarCpfComponent } from './components/validar-cpf/validar-cpf.component';
import { ValidarCnpjComponent } from './components/validar-cnpj/validar-cnpj.component';
import { GerarPessoaComponent } from './components/gerar-pessoa/gerar-pessoa.component';

const routes: Routes = [
    { path: '', component: GerarCpfComponent },
    { path: 'gerar-cpf', component: GerarCpfComponent },
    { path: 'gerar-cnpj', component: GerarCnpjComponent },
    { path: 'gerar-pessoa', component: GerarPessoaComponent },
    { path: 'validar-cpf', component: ValidarCpfComponent },
    { path: 'validar-cnpj', component: ValidarCnpjComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
