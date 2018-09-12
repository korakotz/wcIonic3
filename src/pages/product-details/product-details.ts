import { Component } from '@angular/core';
import { NavParams, ToastController, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage'
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: any;

  constructor(
    public navParams: NavParams, 
    public storage: Storage, 
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  )
  {
    this.product = this.navParams.get('product')
    console.log(this.product)
  }

  addToCart(product)
  {
    this.storage.get('cart').then((data) => {
      if(data == null || data.length == 0) // เพิ่มข้อมูลสินค้าเมื่อคลิกปุ่ม Add to cart แล้วสินค้านั้นยังไม่ได้เพิ่มมาก่อน
      {
        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        })
      }
      else // เพิ่มจำนวนสินค้าและราคาในสินค้าเดียวกันในตะกร้า
      {
        let added = 0;

        for(let i =0; i < data.length; i++)
        {
          if(product.id == data[i].product.id)
          {
            console.log("Product is already in the cart")

            let qty = data[i].qty;

            data[i].qty = qty+1 ;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);

            added = 1;
          }
        }

        if(added == 0)
        {
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          })
        }
      }

      this.storage.set('cart', data).then(() => {
        console.log('cart updated')
        console.log(data)

        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();
      }
    )
    })
  }

  openCart()
  {
    this.modalCtrl.create(CartPage).present();
  }

}
