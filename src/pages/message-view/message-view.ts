import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.services';

/**
 * Generated class for the MessageViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-message-view',
  templateUrl: 'message-view.html',
})
export class MessageViewPage {

  auth : boolean = false
  authsubscription = new Subscription()
  ss : boolean = true

  constructor(public navCtrl: NavController, public navParams: NavParams, private authservice : AuthService) {
    this.authsubscription = this.authservice.AuthSubject.subscribe(x => this.auth = x)
    this.authservice.emitAuth()
  }

  onSearch(){
    this.ss = !this.ss
  }

  getSMS(event : any){
    console.log(event.target.value)

  }

}
