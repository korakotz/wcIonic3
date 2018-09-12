import { Component } from '@angular/core';
import { Storage } from '@ionic/storage'
import { ViewController, NavController, ToastController } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { UserAccountPage } from '../user-account/user-account';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean = false;

  constructor
  (
    public storage: Storage,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private toastCtrl: ToastController
  ) 
  {
    this.total = 0.0;

    this.storage.ready().then(() => {

      this.storage.get('cart').then((data) => {
        console.log(data);
        this.cartItems = data;
        console.log(this.cartItems);

        if(this.cartItems.length > 0 )
        {
          this.cartItems.forEach((item, index) => {
            this.total = this.total + (item.product.price * item.qty)
          })
        }
        else
        {
          this.showEmptyCartMessage = true;
        }

      })

    })
  }

  removeFromCart(item, i)
  {
    let price = item.product.price;
    let qty = item.qty;

    this.cartItems.splice(i, 1);

    this.storage.set('cart', this.cartItems).then(() => {

      this.total = this.total - (price*qty);  

    })

    if(this.cartItems.length == 0)
    {
      this.showEmptyCartMessage = true;
    }

  }

  closeModal()
  {
    this.navCtrl.pop();
  }

  checkout()
  {
    this.storage.get('userLoginInfo')
    .then((data)=>{
      if(data != null)
      {
        if(this.total != 0)
        {
          this.navCtrl.push(CheckoutPage)
        }
        else
        {
          this.toastCtrl.create({
            message: "Your Cart Is Empty!",
            duration: 3000
          }).present();
        }
      }
      else
      {
        this.navCtrl.push(SigninPage)
      }
    })
  }

  // changeQty(item, i, change)
  // {
  //   let price = 0;
  //   let qty = 0;

  //   price = parseFloat(item.product.price);
  //   qty = item.qty;

  //   if(change < 0 && item.qty == 1){
  //     return;
  //   }

  //   qty = qty + change;
  //   item.qty = qty;
  //   console.log(qty)
  //   this.cartItems[i] = item;

  //   this.storage.set("cart", this.cartItems).then( ()=> {

  //     if(change > 0)
  //     {
  //       this.total = this.total + (item.amount * qty)
  //     }
  //     else
  //     {
  //       this.total = this.total - (item.amount * qty)
  //     }

  //     this.toastCtrl.create({
  //       message: "Cart Updated.",
  //       duration: 2000,
  //       showCloseButton: true
  //     }).present();

  //   });
  // }

}
