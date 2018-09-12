import { Component } from '@angular/core';
import { NavParams, NavController, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  page: number;
  products: any[] = [];
  Woocommerce: any;
  searchQuery: string = "";

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
  )
  {
    console.log(this.navParams.get('searchQuery'))
    this.searchQuery = this.navParams.get('searchQuery')

    this.Woocommerce = WC({
      url: "http://localhost/wordpress/wptest/",
      consumerKey: "ck_72e1120fd52ce1463d9ad46364191a1b3aa1f890",
      consumerSecret: "cs_e6a02d8af56bf26116c15dca47cda25a97082c7f"
    })

    this.Woocommerce.getAsync("products?filter[q]=" + this.searchQuery)
    .then((data) => {
      console.log(JSON.parse(data.body))
      this.products = JSON.parse(data.body).products
    }, 
    (err) => {
      console.log(err)
    })
  }

  openProductPage(product)
  {
    this.navCtrl.push(ProductDetailsPage, {"product": product})
  }


  loadMoreProducts(event){
    
        this.Woocommerce.getAsync("products?filter[q]=" + this.searchQuery + "&page=" + this.page).then((searchData) => {
          this.products = this.products.concat(JSON.parse(searchData.body).products);
    
          if(JSON.parse(searchData.body).products.length <= 10){
            event.enable(false);
    
            this.toastCtrl.create({
              message: "No more products!",
              duration: 5000
            }).present();
    
          }
    
          event.complete();
          this.page ++;
    
        });
      }

}
