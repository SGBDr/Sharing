import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../services/auth.services';
import { ProfileViewPage } from '../profile-view';

@Component({
  selector: 'page-sign-in-view',
  templateUrl: 'sign-in-view.html',
})
export class SignInViewPage {
  error : string = ""
  err : boolean
  constructor(public navCtrl: NavController, public navParams: NavParams, private authservice : AuthService) {
  }

  OnSignIn(email : string, password : string){
    this.authservice.signInUser(email, password).then((x) => {
      if(!x)this.error="account not fund or check your connection", this.err = true;
      if(x)this.error="sign in successfully", this.err = false, this.navCtrl.pop();
    })
  }

}
