import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputsComponent } from './inputs/inputs.component';
import { FormsModule } from '@angular/forms';
// import { MatSliderModule } from "@angular/material"; 


@NgModule({
  declarations: [
    AppComponent,
    InputsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
    // MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
