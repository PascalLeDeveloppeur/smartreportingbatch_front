import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RequestToSmartReportingBatchService } from './service/RequestToSmartReportingBatch.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './main/login-form/login-form.component';
import { RegisterFormComponent } from './main/register-form/register-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [RequestToSmartReportingBatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
