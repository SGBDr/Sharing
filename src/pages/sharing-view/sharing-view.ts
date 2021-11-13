import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.services';
import { SharingService } from '../../services/sharing.services';
import * as $ from 'jquery';
import { AddSharingViewPage } from './add-sharing-view/add-sharing-view';

@Component({
  selector: 'page-sharing-view',
  templateUrl: 'sharing-view.html',
})

export class SharingViewPage {

  auth : boolean = false
  authsubscription = new Subscription()
  ss : boolean = false
  shares : any[] = []
  sharesSubscription = new Subscription()
  tabPlay = []
  search_content : string = ""


  play_stop : string = "play"

  constructor(public navCtrl: NavController, public navParams: NavParams, private authservice : AuthService, private shareservice : SharingService) {
    this.authsubscription = this.authservice.AuthSubject.subscribe(x => this.auth = x)
    this.authservice.emitAuth()
    this.sharesSubscription = this.shareservice.shareSubject.subscribe(x => {
      this.shares = x
      this.tabPlay = Array(this.shares.length)
      for(let i = 0; i < this.shares.length; i++)this.tabPlay[i] = 'play'
    });
    this.shareservice.emitShare()
  }

  getShare(event){
    let value = event.target.value
    this.shareservice.get_special_share(value)
  }

  onRefresh(){
    this.shareservice.getShares(true)
  }

  OnSong(music : string, id : number){
    if(this.tabPlay[id - 1] === 'play'){
      $('#audio').attr('src', music);
      for(let i = 0; i < this.tabPlay.length; i++)this.tabPlay[i] = 'play'
      this.tabPlay[id - 1] = 'pause'
    }else{
      $('#audio').attr('src', '');
      this.tabPlay[id - 1] = 'play'
    }
  }

  OnLike(id : number){
    this.shareservice.like(id)
  }

  OnDislike(id : number){
    this.shareservice.dislike(id)
  }

  AddShare(){
    this.navCtrl.push(AddSharingViewPage)
  }

  onSearch(){
    this.ss = !this.ss
    this.search_content = ""
  }

}
