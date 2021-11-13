import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../services/auth.services';
import * as $ from'jquery';
import { SharingService } from '../../../services/sharing.services';

@Component({
  selector: 'page-add-sharing-view',
  templateUrl: 'add-sharing-view.html',
})
export class AddSharingViewPage {

  share : any = {
    "author" : "",
    "content" : "",
    "date" : "",
    "dislike" : 0,
    "hater" : "",
    "id" : 0,
    "image" : "",
    "like" : 0,
    "liker" : "",
    "link" : "",
    "music" : "",
    "title" : ""
  }

  music : any = null
  pointer : number = 0;
  musics : any[] = []
  play_prev : string = "play"
  error : string = ""
  searching : string = "nothing";

  constructor(public navCtrl: NavController, public navParams: NavParams, private authservice : AuthService, private httpclient : HttpClient, private shareservice : SharingService) {
    this.share.author = authservice.user.user.email.split('@')[0]
    let date = new Date()
    this.share.date =  date.getUTCDay() + "/" + date.getMonth() + "/" + date.getFullYear()
    console.log(this.share)
  }

  getMusic(event){
    this.searching = "yes"
    let value = event.target.value
    this.httpclient
    .get<any[]>("https://itunes.apple.com/search?limit=1000&term=" + value)
    .subscribe(
      (responses) => {
        this.musics = []
        for(let mu of responses['results']){
          if(mu["wrapperType"] === "track"){
            if(mu["kind"] === "song"){
              let temp_mu = [mu['artistName'], mu['trackName'], mu['previewUrl'], mu['artworkUrl100']]
              this.musics.push(temp_mu)
            }
          }
        }
        this.pointer = 0;
        if(this.musics.length != 0){
          this.music = this.musics[this.pointer]
          this.share['music'] = this.music[2]
          this.share['image'] = this.music[3]
        }
        this.searching = "no"
      },
      (error) => {
          console.log(error)
      }
    )
  }

  Previous(){
    if(this.pointer - 1 >= 0){
      this.pointer--;
      this.music = this.musics[this.pointer]
      this.share['music'] = this.music[2]
      this.share['image'] = this.music[3]
    }
    $('#audio').attr('src', "")
    this.play_prev = 'play'
  }
  Next(){
    if(this.pointer + 1 < this.musics.length){
      this.pointer++;
      this.music = this.musics[this.pointer]
      this.share['music'] = this.music[2]
      this.share['image'] = this.music[3]
    }
    $('#audio').attr('src', "")
    this.play_prev = 'play'
    console.log('ok')
  }

  OnPlayPrev(url : string){
    if(this.play_prev === "play"){
      $('#audio').attr('src', url)
      this.play_prev = 'pause'
    }else{
      $('#audio').attr('src', "")
      this.play_prev = 'play'
    }
  }

  OnAddSharing(f : NgForm){
    let t = true;
    for(let y of f.value)if(y.trim() === "")t = false;
    if(t){
      this.share['title'] = f.value['title']
      this.share['content'] = f.value['content']
      this.shareservice.addSHare(this.share)
      console.log('ok')
    }
  }
  

}
