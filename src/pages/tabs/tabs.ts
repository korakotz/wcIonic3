import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CategoryPage } from '../category/category';
import { UserAccountPage } from '../user-account/user-account';
import { CartPage } from '../cart/cart';
import { ModalController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoryPage;
  tab3Root = UserAccountPage;

  constructor(public modalCtrl: ModalController) {

  }
  openCart()
  {
    this.modalCtrl.create(CartPage).present();
  }
}
