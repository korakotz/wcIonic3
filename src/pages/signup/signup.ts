import { Component } from '@angular/core';

// import * as WC from 'woocommerce-api';
import { ToastController, AlertController, NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  // Woocommerce: any;
  // private consumerKey: string;
  // private consumerSecret: string;

  newUser: any = {};
  billing_shipping_same: boolean = false;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController,
    private http: Http,
  )
  {
    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};

    // this.Woocommerce = WC({
    //   url: "http://localhost/wordpress/wptest/",
    //   consumerKey: "ck_72e1120fd52ce1463d9ad46364191a1b3aa1f890",
    //   consumerSecret: "cs_e6a02d8af56bf26116c15dca47cda25a97082c7f"
    // })
  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  checkEmail()
  {
    // // console.log('checkemail')

    // let validEmail = false;
    // let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if(reg.test(this.newUser.email))
    // {
    //   //email look valid
    //   this.Woocommerce.getAsync('customers/email/' + this.newUser.email).then((data) => {
    //     let res = (JSON.parse(data.body));
    //     // console.log(data);

    //     if(res.errors)
    //     {
    //       validEmail = true;

    //       this.toastCtrl.create({
    //         message: "You can use this email." ,
    //         duration: 2000
    //       }).present()
    //     }
    //     else
    //     {
    //       validEmail = false;

    //       this.toastCtrl.create({
    //         message: "You can't use this email." ,
    //         showCloseButton: true
    //       }).present()
    //     }

    //     console.log(validEmail);
    //   })
    // }
    // else
    // {
    //   console.log(validEmail);
    //   this.toastCtrl.create({
    //     message: "You can't use this email." ,
    //     showCloseButton: true
    //   }).present()
    // }
  }

  signup()
  {

    let customerData = 
    {
      "email": this.newUser.email,
      "first_name": this.newUser.first_name,
      "last_name": this.newUser.last_name,
      "username": this.newUser.username,
      "password": this.newUser.password,
      "billing": 
      {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.billing_address.address_1,
        "address_2": this.newUser.billing_address.address_2,
        "city": this.newUser.billing_address.city,
        "state": this.newUser.billing_address.state,
        "postcode": this.newUser.billing_address.postcode,
        "country": this.newUser.billing_address.country,
        "email": this.newUser.email,
        "phone": this.newUser.billing_address.phone
      },
      "shipping": 
      {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.shipping_address.address_1,
        "address_2": this.newUser.shipping_address.address_2,
        "city": this.newUser.shipping_address.city,
        "state": this.newUser.shipping_address.state,
        "postcode": this.newUser.shipping_address.postcode,
        "country": this.newUser.shipping_address.country
      }
    }

    if(this.billing_shipping_same){
      this.newUser.shipping_address = this.newUser.shipping_address;
    }

    this.http.post('https://devmyway.com/wp-json/wc/v2/customers?consumer_key=ck_6b79d3fd7eb22e3d5e3a67d63ed270063bdbfbc7&consumer_secret=cs_35f8821e46ada71074e4663723d8b3f3454583aa', customerData)
    .subscribe(
     (data) => {
        console.log(data.json());
        this.toastCtrl.create({
          message: data.json(),
          showCloseButton: true
        }).present();
      },
      (err) => {
        console.log("Error occured");
        this.toastCtrl.create({
                message: err,
                showCloseButton: true
              }).present();
      }
    );
  }

    // this.Woocommerce.postAsync('customers', customerData)
    // .then( (data) => 
    // {
      
    //           let response = (JSON.parse(data.body));
      
              // if(response.customer){
              //   this.alertCtrl.create({
              //     title: "Account Created",
              //     message: "Your account has been created successfully! Please login to proceed.",
              //     buttons: [{
              //       text: "Login",
              //       handler: ()=> {
              //         this.navCtrl.push(SigninPage)
              //       }
              //     }]
              //   }).present();
              // } else if(response.errors){
              //   this.toastCtrl.create({
              //     message: response.errors[0].message,
              //     showCloseButton: true
              //   }).present();
    //           }
      
    //   })


}
