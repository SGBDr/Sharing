import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Form, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthService } from '../../../services/auth.services';

/**
 * Generated class for the ModifyViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modify-view',
  templateUrl: 'modify-view.html',
})
export class ModifyViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authservice : AuthService) {

  }

  OnModify(f : NgForm){
    if(f.value['email'].trim() != '')this.authservice.ModifyEmail(f.value['email'].trim())
    if(f.value['password'].trim() != '')this.authservice.ModifyPassword(f.value['password'].trim())
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyViewPage');
  }

}
