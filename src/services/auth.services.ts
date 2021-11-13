import { Injectable } from '@angular/core';
import { FirebaseApp } from '@firebase/app';
import * as firebase from 'firebase/auth'
import { LoadingController, ToastController } from 'ionic-angular';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService{

    isAuth : boolean = false
    user : any = {}
    app : FirebaseApp
    AuthSubject = new Subject<boolean>()

    constructor(private loader : LoadingController, private toastCtrl : ToastController){
    }

    emitAuth(){
        this.AuthSubject.next(this.isAuth)
    }

    ModifyEmail(email : string){
        const load = this.loader.create({
            content: "Email modification on the way..."
          });
        load.present();
        firebase.updateEmail(this.user.user, email).then(
            () => {
                load.dismiss()
                const toast = this.toastCtrl.create({
                    message: "User's Email was Modify successfully",
                    duration: 3000
                });
                toast.present();
            },
            (error) => {
                load.dismiss()
                const toast = this.toastCtrl.create({
                    message: 'Email aldready use or Try later',
                    duration: 4000
                });
                toast.present();
            }
        )
    }

    ModifyPassword(password : string){
        const load = this.loader.create({
            content: "Password modification on the way..."
        });
        load.present();
        firebase.updateEmail(this.user.user, password).then(
            (awr) => {
                load.dismiss()
                const toast = this.toastCtrl.create({
                    message: "User's password was Modify successfully",
                    duration: 3000
                });
                toast.present();
            },
            (error) => {
                load.dismiss()
                const toast = this.toastCtrl.create({
                    message: 'Try Again later',
                    duration: 4000,
                });
                toast.present();
            }
        )
    }

    DeleteAccount(){
        return firebase.deleteUser(this.user.user)
    }

    signInUser(email: string, password: string) : Promise<boolean>{
        const load = this.loader.create({
            content: "Sign In is on the way..."
          });
          load.present();
        return new Promise((resolve) => {
            firebase.signInWithEmailAndPassword(firebase.getAuth(this.app), email, password).then(
                (user) => {
                    this.isAuth = true;
                    this.user = user
                    this.emitAuth()
                    resolve(true)
                    load.dismiss()
                    firebase.onAuthStateChanged(firebase.getAuth(this.app), (user) => {
                        if (user) {
                          this.isAuth = true;
                        } else {
                          this.isAuth = false;
                        }
                    });
                },
                (error) => {
                    console.log(error)
                    this.isAuth = false
                    resolve(false);
                    this.emitAuth()
                    load.dismiss()
                }
            )
        });
    }

    SignOutUser(){
        const load = this.loader.create({
            content: "Sign Out is on the way..."
        });
        load.present();
        return new Promise(() => {
            firebase.signOut(firebase.getAuth(this.app)).then(
                () => {
                    this.isAuth = false;
                    load.dismiss()
                    this.emitAuth()
                },
                (error) => {
                    load.dismiss()
                }
            )
        });
    }
}