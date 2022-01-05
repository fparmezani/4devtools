import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpfComponent } from './components/cpf/cpf.component';

const routes: Routes = [ { path: 'gerar-cpf', component: CpfComponent } ];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
