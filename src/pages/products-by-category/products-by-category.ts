import { Component } from '@angular/core';

import { NavParams, ToastController, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {
  
  moreProducts: any[]; 
  products: any[];
  page: number;
  category: any;

  constructor
  (
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private http: Http,
    public navCtrl: NavController,
  ) 
  {
    this.page = 1;
    this.category = this.navParams.get("categories");

    // console.log(this.category.slug)

    this.http.get('https://devmyway.com/wp-json/wc/v2/products?category=' + this.category.id + '&consumer_key=ck_6b79d3fd7eb22e3d5e3a67d63ed270063bdbfbc7&consumer_secret=cs_35f8821e46ada71074e4663723d8b3f3454583aa')
    .subscribe((data) => {
      console.log(data.json())
      this.products = data.json()
      console.log(this.products)
    })
  }
  
    // LOAD MORE PRODUCTS
    loadMoreProducts(event)
    {
      console.log(event);
      console.log(this.page);
  
      if(event == null)
      {
        this.page = 1;
        this.moreProducts = [];
      }
      else
      {
      this.page ++;
      console.log(this.page);
  
      this.http.get('https://devmyway.com/wp-json/wc/v2/products?category='+ this.category.id +'&page='+ this.page + '&consumer_key=ck_6b79d3fd7eb22e3d5e3a67d63ed270063bdbfbc7&consumer_secret=cs_35f8821e46ada71074e4663723d8b3f3454583aa')
      .subscribe((data) => {
  
        this.moreProducts = data.json()
  
        this.products = this.products.concat(this.moreProducts)
  
        console.log(this.products)
  
        if(event != null)
        {
          event.complete();
        }
        if(data.json().length < 10)
        {
          event.enable(false);
          
          this.toastCtrl.create({
            message: "No More Product",
            duration: 3000
          }).present()
        }
      })
      }
    }

 
  openProductPage(moreProduct)
  {
    this.navCtrl.push(ProductDetailsPage, {"product": moreProduct})
  }
}
