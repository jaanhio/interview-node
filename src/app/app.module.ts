import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataService } from './data.service';

//Angular Material
import {MatDialogModule} from '@angular/material/dialog';
import { ForexComponent } from './modal/forex/forex.component';

@NgModule({
  declarations: [
    AppComponent,
    ForexComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatDialogModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
