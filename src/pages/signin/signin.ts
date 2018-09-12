import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ToastController, AlertController, NavParams, NavController } from 'ionic-angular';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  username: string;
  password: string;


  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private http: Http, 
    private toastCtrl: ToastController, 
    public storage: Storage,
    private alertCtrl: AlertController
  )
  {
    this.username = "";
    this.password = "";
  }

  login()
  {
    this.http.get('https://devmyway.com/api/auth/generate_auth_cookie/?username=' + this.username + '&password=' + this.password)
    .subscribe((res)=>{
      console.log(res.json())

      let response = res.json()
      console.log(response.error)
      
      if(response.error)
      {
        this.toastCtrl.create({
          message: response.error,
          duration: 3000
        }).present();
        return
      }

      this.storage.set('userLoginInfo', response)
      .then((data)=>{

        this.alertCtrl.create({
          title:"Login Successful",
          buttons: [{
            text: "OK",
            handler: () => {
              if(this.navParams.get("next"))
              {
                this.navCtrl.push(this.navParams.get("next"))
              }
              else
              {
                this.navCtrl.pop();
              }
            }
          }]
        }).present();


      })

    })
  }

}
