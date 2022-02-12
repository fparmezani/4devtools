import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerarCpfComponent } from './components/gerar-cpf/gerar-cpf.component';
import { GerarCnpjComponent } from './components/gerar-cnpj/gerar-cnpj.component';
import { ValidarCpfComponent } from './components/validar-cpf/validar-cpf.component';
import { ValidarCnpjComponent } from './components/validar-cnpj/validar-cnpj.component';
import { GerarPessoaComponent } from './components/gerar-pessoa/gerar-pessoa.component';
import { GerarCartaodecreditoComponent } from './components/gerar-cartaodecredito/gerar-cartaodecredito.component';
import { ContatoComponent } from './shared/contato/contato.component';
import { TermoUsoComponent } from './shared/termo-uso/termo-uso.component';
import { PoliticaPrivacidadeComponent } from './shared/politica-privacidade/politica-privacidade.component';
import { SobreComponent } from './shared/sobre/sobre.component';
import { VersaoComponent } from './shared/versao/versao.component';
import { GerarCnhComponent } from './components/gerar-cnh/gerar-cnh.component';
import { GerarPisPasepComponent } from './components/gerar-pispasep/gerar-pispasep.component';

const routes: Routes = [
    { path: '', component: GerarCpfComponent },
    { path: 'gerar-cpf', component: GerarCpfComponent },
    { path: 'gerar-cnpj', component: GerarCnpjComponent },
    { path: 'gerar-pessoa', component: GerarPessoaComponent },
    { path: 'gerar-cartaodecredito', component: GerarCartaodecreditoComponent },
    { path: 'gerar-cnh', component: GerarCnhComponent },
    { path: 'gerar-pispasep', component: GerarPisPasepComponent },

    { path: 'validar-cpf', component: ValidarCpfComponent },
    { path: 'validar-cnpj', component: ValidarCnpjComponent },

    { path: 'contato', component: ContatoComponent },
    { path: 'termo-de-uso', component: TermoUsoComponent },
    { path: 'politica-de-privacidade', component: PoliticaPrivacidadeComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'versao', component: VersaoComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
