import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CpfComponent } from './components/cpf/cpf.component';

@NgModule({
    declarations: [ AppComponent, CpfComponent ],
    imports: [ BrowserModule, AppRoutingModule, FormsModule ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
