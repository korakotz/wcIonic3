import { Component } from '@angular/core';
// import * as WC from 'woocommerce-api';
import { NavController } from 'ionic-angular';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { Http } from '@angular/http';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  categories: any[];
  Woocommerce: any;

  constructor
  (
    public navCtrl: NavController,
    private http: Http
  ) 
  {
    this.categories = [];

    // this.Woocommerce = WC({
    //   url: "https://thegoldseller.co/",
    //   consumerKey: "ck_328aab182335a09cf262354b22ae3c0bcdc96207",
    //   consumerSecret: "cs_851ea8b5a5cdd21e58f7fb63f3dacb2fc4637331"
    // })

    // this.Woocommerce.getAsync("products/categories").then((data) => {
    //   console.log(JSON.parse(data.body).product_categories)
    //   this.categories = JSON.parse(data.body).product_categories
    // }, (err) => {
    //   console.log(err)
    // })

    this.http.get('https://devmyway.com/wp-json/wc/v2/products/categories?consumer_key=ck_6b79d3fd7eb22e3d5e3a67d63ed270063bdbfbc7&consumer_secret=cs_35f8821e46ada71074e4663723d8b3f3454583aa')
    .subscribe((data) => {
      console.log(data.json())
      this.categories = data.json()
      console.log(this.categories)
    })
    
  }


  openCategoryPage(category)
  {
    // console.log(category);
    this.navCtrl.push(ProductsByCategoryPage, {"categories": category})
  }

}
