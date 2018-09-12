import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';


import { ProductDetailsPage } from '../product-details/product-details';
import { SignupPage } from '../signup/signup';
import { SigninPage } from '../signin/signin';

import { SearchPage } from '../search/search';
// import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  moreProducts: any[] = [];
  products: any[] = [];
  page: number;
  searchQuery: string = "";

  // @ViewChild('productSlides') productSlides: Slides;

  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    // private WP: WoocommerceProvider,
    private http: Http
  ) 

  {


    // WC API SETTING PROVIDER
    this.http.get('https://devmyway.com/wp-json/wc/v2/products?consumer_key=ck_6b79d3fd7eb22e3d5e3a67d63ed270063bdbfbc7&consumer_secret=cs_35f8821e46ada71074e4663723d8b3f3454583aa')
    .subscribe((data) => {
      this.products = data.json()
      console.log(this.products)
    })

    this.loadMoreProducts(null);

  }

  // PRODUCTS SLIDER
  // ionViewDidLoad() 
  // {
  //   setInterval(() => {
  //     if(this.productSlides.getActiveIndex() == this.productSlides.length() -1 )
  //       this.productSlides.slideTo(0)
      
  //     this.productSlides.slideNext();
  //   }, 3000)
  // }


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

    this.http.get('https://devmyway.com/wp-json/wc/v2/products?page='+ this.page + '&consumer_key=ck_6b79d3fd7eb22e3d5e3a67d63ed270063bdbfbc7&consumer_secret=cs_35f8821e46ada71074e4663723d8b3f3454583aa')
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

  openSignupPage()
  {
    this.navCtrl.push(SignupPage)
  }

  openLoginPage()
  {
    this.navCtrl.push(SigninPage)
  }

  onSearch(event)
  {
    if(this.searchQuery.length > 0)
    {
      this.navCtrl.push(SearchPage, {'searchQuery': this.searchQuery})
    }
  }

}
