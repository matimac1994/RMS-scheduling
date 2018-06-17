import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {ScheduleService} from "./services/schedule.service";
import {RouterModule} from "@angular/router";
import {routes} from "./routing";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { RmsChartComponent } from './components/rms-chart/rms-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RmsChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
