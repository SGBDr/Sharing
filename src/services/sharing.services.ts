import { Injectable } from "@angular/core"
import { HttpClient, HttpResponseBase } from "@angular/common/http";
import { Subject } from "rxjs"
import { AuthService } from "./auth.services"
import { LoadingController, NavController, ToastController } from "ionic-angular";


@Injectable()
export class SharingService{
    
    shares : any[] = []

    shareSubject = new Subject<any[]>()
    searching = false

    constructor( /*private navCtrl : NavController,*/private authservice : AuthService, private httpclient: HttpClient, private load : LoadingController, private toastCtrl : ToastController){
        this.getShares()
        //setInterval(() => this.getShares(), 5000)
    }


    emitShare(){
        this.shareSubject.next(this.shares)
    }

    like(id: number){
        let sh = this.shares[id - 1]
        sh.like += 1
        sh.liker += this.authservice.user.user.email.split('@')[0]
        if(sh.hater.indexOf(this.authservice.user.user.email.split('@')[0]) != -1)sh.dislike -= 1
        sh.hater = sh.hater.replace(this.authservice.user.user.email.split('@')[0], '')
        this.put(sh, id)
    }

    dislike(id: number){
        let sh = this.shares[id - 1]
        sh.dislike += 1
        sh.hater += this.authservice.user.user.email.split('@')[0]
        if(sh.liker.indexOf(this.authservice.user.user.email.split('@')[0]) != -1)sh.like -= 1
        sh.liker = sh.hater.replace(this.authservice.user.user.email.split('@')[0], '')
        this.put(sh, id)
        this.getShares()
    }

    put(sh : JSON, id : number){
        this.httpclient
        .put('https://android-map-28459-default-rtdb.firebaseio.com/shares/share/'+ (id - 1) + '.json', sh)
        .subscribe(
          () => {
            console.log('Enregistrement terminé !');
            this.getShares()
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
      );
    }

    getShares(give_view_of? : boolean){
        const loader = this.load.create({
            content: "Refreshing ... "
        });
        if(give_view_of)loader.present();
        this.httpclient
        .get<any[]>('https://android-map-28459-default-rtdb.firebaseio.com/shares/share.json')
        .subscribe(
          (response) => {
            this.shares = response;
            this.emitShare();
            if(give_view_of)loader.dismiss();
          },
          (error) => {
              console.log(error)
            const toast = this.toastCtrl.create({
                message: 'Connexion Failed',
                duration: 4000,
            });
            toast.present();
          }
        )
    }

    addSHare(share : any){
      this.httpclient
      .get<any[]>('https://android-map-28459-default-rtdb.firebaseio.com/shares/share.json')
      .subscribe(
        (response) => {
          console.groupCollapsed(response[response.length - 1].id, ' last id')
          let id = response[response.length - 1].id + 1
          share.id = id;
          console.log(share)
          this.httpclient
          .put('https://android-map-28459-default-rtdb.firebaseio.com/shares/share/' + (id - 1) + '.json', share)
          .subscribe(
            () => {
              console.log('Publication is on line');
              this.getShares()
              const toast = this.toastCtrl.create({
                message: 'Publication is on line',
                duration: 4000,
              });
              toast.present();
              //this.navCtrl.pop();
            },
            (error) => {
              const toast = this.toastCtrl.create({
                message: 'Posting failed',
                duration: 4000,
              });
              toast.present();
            })
        },
        (error) => {
            console.log(error)
          const toast = this.toastCtrl.create({
              message: 'Connexion Failed',
              duration: 4000,
          });
          toast.present();
        }
      )
    }

    get_special_share(value: string){
        this.httpclient
        .get<any[]>('https://android-map-28459-default-rtdb.firebaseio.com/shares/share.json')
        .subscribe(
          (response) => {
            let temp_shares = []
            for(let sh of response)if(sh.author.indexOf(value) != -1 || sh.title.indexOf(value) != -1)temp_shares.push(sh)
            this.shares = temp_shares;
            this.emitShare();
          },
          (error) => {
              console.log(error)
            const toast = this.toastCtrl.create({
                message: 'Connexion Failed',
                duration: 4000,
            });
            toast.present();
          }
        )
    }

}