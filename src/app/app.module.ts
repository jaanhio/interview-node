import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent, modalForex } from './app.component';
import { DataService } from './data.service';

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    modalForex
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents:[
    AppComponent,
    modalForex
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
