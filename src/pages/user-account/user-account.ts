import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AlertController, ToastController, NavParams, NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-user-account',
  templateUrl: 'user-account.html',
})
export class UserAccountPage {

  loggedIn: boolean;
  userInfo: any;
  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private http: Http,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  )
  {

  }

  ionViewDidEnter()
  {
    this.storage.ready()
    .then(()=>{
      this.storage.get('userLoginInfo')
      .then((userLoginInfo) => {
        if(userLoginInfo != null)
        {
          console.log("User Logged in")

          this.userInfo = userLoginInfo.user;
          this.loggedIn = true;
          console.log(this.userInfo)
        }
        else
        {
          console.log("No User Login")
          this.userInfo = {};
          this.loggedIn = false;
        }
      })
    })
  }

  logOut()
  {
    this.storage.remove('userLoginInfo')
    .then(() => {
      this.userInfo = {};
      this.loggedIn = false;
    })
  }

  openLoginPage()
  {
    this.navCtrl.push(SigninPage)
    // this.http.get('http://localhost/wordpress/wptest/api/auth/generate_auth_cookie/?insecure=cool&username=' + this.username + '&password=' + this.password)
    // .subscribe((res)=>{
    //   console.log(res.json())

    //   let response = res.json()

    //   if(response.error)
    //   {
    //     this.toastCtrl.create({
    //       message: response.error,
    //       duration: 3000
    //     }).present();
    //     return
    //   }

    //   this.storage.set('userLoginInfo', response)
    //   .then((data)=>{

    //     this.alertCtrl.create({
    //       title:"Login Successful",
    //       buttons: [{
    //         text: "OK",
    //         handler: () => {
    //           this.navCtrl.setRoot(UserAccountPage);
    //           // if(this.navParams.get("next"))
    //           // {
    //           //   this.navCtrl.push(this.navParams.get("next"))
    //           // }
    //           // else
    //           // {
    //           //   this.navCtrl.pop();
    //           // }
    //         }
    //       }]
    //     }).present();


    //   })

    // })
  }

}
