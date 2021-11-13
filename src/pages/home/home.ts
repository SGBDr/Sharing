import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.services';
import { MessageViewPage } from '../message-view/message-view';
import { ProfileViewPage } from '../profile-view/profile-view';
import { SettingViewPage } from '../setting-view/setting-view';
import { SharingViewPage } from '../sharing-view/sharing-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  tab1 = MessageViewPage
  tab2 = ProfileViewPage
  tab3 = SettingViewPage
  tab4 = SharingViewPage
  auth : boolean = false
  authsubscription = new Subscription()
  constructor(public navCtrl: NavController, private authservice : AuthService) {
    this.authsubscription = this.authservice.AuthSubject.subscribe(x => this.auth = x)
  }

}
