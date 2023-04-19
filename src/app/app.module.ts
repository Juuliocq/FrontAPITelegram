import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { ControleComponent } from './componentes/controle/controle.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    ControleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
