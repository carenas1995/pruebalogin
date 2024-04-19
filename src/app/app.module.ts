import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalModule } from './pages/principal.module';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrincipalModule,
    ToastModule,
    DialogModule,
    TableModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
