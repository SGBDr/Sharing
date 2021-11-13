import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.services';
import { ModalController } from 'ionic-angular';
import { SignInViewPage } from './sign-in-view/sign-in-view'
import { ModifyViewPage } from './modify-view/modify-view';

/**
 * Generated class for the ProfileViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-view',
  templateUrl: 'profile-view.html',
})
export class ProfileViewPage{

  auth : boolean = false
  Authsubcription = new Subscription()
  delete : boolean = false

  constructor(private modalCtrl : ModalController, private toastCtrl : ToastController, private loader : LoadingController, private authservice : AuthService, private navCtrl : NavController ) {
    this.Authsubcription = this.authservice.AuthSubject.subscribe(x => {
      this.auth = x
    })
  }

  OnSignOut(){
    this.authservice.SignOutUser()
  }

  LoadModify(){
    this.navCtrl.push(ModifyViewPage)
  }

  OnDeleteProfil(){
    const load = this.loader.create({
      content: "Account is deleting ..."
    });
    load.present();
    this.authservice.DeleteAccount().then(
      () => {
        this.OnSignOut()
        load.dismiss()
      },
      () => {
        const toast = this.toastCtrl.create({
          message: "User's password was Modify successfully",
          duration: 3000
        });
        toast.present();
      }
    )
  }

  OntoggleDelete(){
    this.delete = !this.delete
  }

  loadModal(){
    this.navCtrl.push(SignInViewPage)
  }

}
