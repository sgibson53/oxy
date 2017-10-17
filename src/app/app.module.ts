import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { WellsProvider } from '../providers/well/well';
import { WellModalComponent } from '../components/well-modal/well-modal'
import { AddWellModalComponent } from '../components/add-well-modal/add-well-modal';

import { HttpModule } from '@angular/http';
import { OAuthService } from 'angular-oauth2-oidc';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../dev/in-memory-data/in-memory-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    WellModalComponent,
    AddWellModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    WellModalComponent,
    AddWellModalComponent
  ],
  providers: [
    OAuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WellsProvider
  ]
})
export class AppModule {}
