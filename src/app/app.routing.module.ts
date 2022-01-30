import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpfComponent } from './components/cpf/cpf.component';
import { CnpjComponent } from './components/cnpj/cnpj.component';

const routes: Routes = [
    { path: 'gerador-cpf', component: CpfComponent },
    { path: 'gerador-cnpj', component: CnpjComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
