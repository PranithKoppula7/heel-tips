import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThirdPartyModule } from './components/third-party.module';
import { ClassesComponent } from './components/classes/classes.component';

import { MainLayoutComponent } from './layouts/main-layout.component';
import { AuthService } from './shared/auth.service';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ClassesComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ThirdPartyModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
    
  ],
  // providers: [AuthService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
