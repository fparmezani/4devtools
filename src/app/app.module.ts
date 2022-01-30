import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { ToastrModule } from 'ngx-toastr';

import { CpfComponent } from './components/cpf/cpf.component';
import { CnpjComponent } from './components/cnpj/cnpj.component';

@NgModule({
    declarations: [ AppComponent, CpfComponent, CnpjComponent ],
    imports: [ BrowserModule, AppRoutingModule, FormsModule, ToastrModule.forRoot() ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
