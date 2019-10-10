import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/main/main.component';
import { FooterComponent } from './layout/main/footer/footer.component';
import { HeaderComponent } from './layout/main/header/header.component';
import { MenuComponent } from './layout/main/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { GuardService } from './services/guard.service';
import { FilesComponent } from './components/files/files.component';
import { CleanComponent } from './layout/clean/clean.component';
import { LoggerComponent } from './components/logger/logger.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
    FilesComponent,
    CleanComponent,
    LoggerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
  ],
  providers: [
    GuardService,
    DataService,
    AuthService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
