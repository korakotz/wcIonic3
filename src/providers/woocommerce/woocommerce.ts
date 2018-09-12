import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

/*
  Generated class for the WoocommerceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WoocommerceProvider {
  products: any[] = [];
  results: any;
  Woocommerce: any;

  constructor(
    private http: HttpClient
  ) {

  }

  initWithLib()
  {
    return this.Woocommerce = WC({
      url: "https://devmyway.com/",
      consumerKey: "ck_6b79d3fd7eb22e3d5e3a67d63ed270063bdbfbc7",
      consumerSecret: "cs_35f8821e46ada71074e4663723d8b3f3454583aa"
    })
  }

  httpGetProducts()
  {
    return this.http.get('https://devmyway.com/wp-json/wc/v2/products?consumer_key=ck_6b79d3fd7eb22e3d5e3a67d63ed270063bdbfbc7&consumer_secret=cs_35f8821e46ada71074e4663723d8b3f3454583aa')
  }

}
