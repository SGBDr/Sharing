import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MessageViewPage } from '../pages/message-view/message-view';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { SettingViewPage } from '../pages/setting-view/setting-view';
import { SharingViewPage } from '../pages/sharing-view/sharing-view';
import { AuthService } from '../services/auth.services';
import { SignInViewPage } from '../pages/profile-view/sign-in-view/sign-in-view';
import { ModifyViewPage } from '../pages/profile-view/modify-view/modify-view';
import { SmsService } from '../services/sms.services';
import { SharingService } from '../services/sharing.services';
import { AddSharingViewPage } from '../pages/sharing-view/add-sharing-view/add-sharing-view';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MessageViewPage,
    ProfileViewPage,
    SettingViewPage,
    SharingViewPage,
    SignInViewPage,
    ModifyViewPage,
    AddSharingViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MessageViewPage,
    ProfileViewPage,
    SettingViewPage,
    SharingViewPage,
    SignInViewPage,
    ModifyViewPage,
    AddSharingViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    SmsService,
    SharingService
  ]
})
export class AppModule {}
