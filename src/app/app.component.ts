import { Component, Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {initializeApp} from 'firebase/app';

import { HomePage } from '../pages/home/home';
import { AuthService } from '../services/auth.services';
@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth : AuthService) {
    platform.ready().then(() => {
      const config = {
        apiKey: "AIzaSyCdZ9L-dfZQx2k0nY8b7mNJeiz2H7BMRWk",
        authDomain: "android-map-28459.firebaseapp.com",
        projectId: "android-map-28459",
        storageBucket: "android-map-28459.appspot.com",
        messagingSenderId: "680863069335",
        appId: "1:680863069335:web:124f0596999558f432a5d2",
        measurementId: "G-LY1YM03HH7"
      };
      
      // Initialize Firebase
      this.auth.app = initializeApp(config);
    
      statusBar.styleDefault();
      splashScreen.hide();
      this.autoConnection()
    });
  }

  autoConnection(){
    
  }
}

