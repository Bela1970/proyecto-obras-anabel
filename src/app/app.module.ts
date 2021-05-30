import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { ObraService } from './obra.service';
import { ObrasComponent } from './obras/obras.component';
import { AppRoutingModule } from './app-routing.module';
import { ObraComponent } from './obra/obra.component';
import { PiloteComponent } from './pilote/pilote.component';
import { CostesComponent } from './costes/costes.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { InformacionComponent } from './informacion/informacion.component';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  declarations: [
    AppComponent,
    ObrasComponent,
    ObraComponent,
    PiloteComponent,
    CostesComponent,
    ResultadoComponent
  ],
  bootstrap: [AppComponent],
  providers: [ObraService, {provide: APP_BASE_HREF, useValue: '/misObras'}

  ]
})
export class AppModule {}
