import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { MatButtonModule, MatTooltipModule } from "@angular/material";

import { AppComponent } from './app.component';
import { WorkComponent } from './work.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkComponent,
  ],
  imports: [
    BrowserModule, FormsModule, BrowserAnimationsModule, MatButtonModule, MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
