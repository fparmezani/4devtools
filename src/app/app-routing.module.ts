import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GerarCpfComponent } from './components/gerar-cpf/gerar-cpf.component';
import { GerarCnpjComponent } from './components/gerar-cnpj/gerar-cnpj.component';
import { GerarPessoaComponent } from './components/gerar-pessoa/gerar-pessoa.component';
import { GerarCartaodecreditoComponent } from './components/gerar-cartaodecredito/gerar-cartaodecredito.component';
import { ContatoComponent } from './shared/contato/contato.component';
import { TermoUsoComponent } from './shared/termo-uso/termo-uso.component';
import { PoliticaPrivacidadeComponent } from './shared/politica-privacidade/politica-privacidade.component';
import { SobreComponent } from './shared/sobre/sobre.component';
import { VersaoComponent } from './shared/versao/versao.component';
import { GerarCnhComponent } from './components/gerar-cnh/gerar-cnh.component';
import { GerarPisPasepComponent } from './components/gerar-pispasep/gerar-pispasep.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { GeradorCpfComponent } from './Views/gerador-cpf/gerador-cpf.component';
import { GerarNomeComponent } from './components/gerar-nome/gerar-nome.component';
import { GerarRenavamComponent } from './components/gerar-renavam/gerar-renavam.component';
import { GerarEnderecoComponent } from './components/gerar-endereco/gerar-endereco.component';
import { GerarSenhaComponent } from './components/gerar-senha/gerar-senha.component';
import { GerarTelefoneComponent } from './components/gerar-telefone/gerar-telefone.component';
import { GerarTituloEleitorComponent } from './components/gerar-titulo-eleitor/gerar-titulo-eleitor.component';
import { GeradorCnpjComponent } from './Views/gerador-cnpj/gerador-cnpj.component';
import { GeradorCnhComponent } from './Views/gerador-cnh/gerador-cnh.component';
import { BuyMeACoffeComponent } from './shared/buy-me-a-coffe/buy-me-a-coffe.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { CpfComponent } from './blog/cpf/cpf.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'gerar-cpf', component: GeradorCpfComponent },
    { path: 'gerar-cnpj', component: GeradorCnpjComponent },
    { path: 'gerar-pessoa', component: GerarPessoaComponent },
    { path: 'gerar-cartaodecredito', component: GerarCartaodecreditoComponent },
    { path: 'gerar-cnh', component: GeradorCnhComponent },
    { path: 'gerar-pispasep', component: GerarPisPasepComponent },
    { path: 'gerar-nome', component: GerarNomeComponent },
    { path: 'gerar-renavam', component: GerarRenavamComponent },
    { path: 'gerar-endereco', component: GerarEnderecoComponent },
    { path: 'gerar-senha', component: GerarSenhaComponent },
    { path: 'gerar-telefone', component: GerarTelefoneComponent },
    { path: 'gerar-titulo-eleitor', component: GerarTituloEleitorComponent },

    { path: 'contato', component: ContatoComponent },
    { path: 'termo-de-uso', component: TermoUsoComponent },
    { path: 'politica-de-privacidade', component: PoliticaPrivacidadeComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'versao', component: VersaoComponent },
    { path: 'buy-me-a-coffe', component: BuyMeACoffeComponent },

    { path: 'blog/cpf', component: CpfComponent },
    //Wild Card Route for 404 request
    {
        path: '**',
        pathMatch: 'full',
        component: PagenotfoundComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
