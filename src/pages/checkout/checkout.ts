import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';


@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  Woocommerce: any;
  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;

  constructor(
    public storage: Storage,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private payPal: PayPal,
  )
  {
    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: "bacs", method_title: "Direct Bank Transfer" },
      { method_id: "cheque", method_title: "Cheque Payment" },
      { method_id: "cod", method_title: "Cash on Delivery" },
      { method_id: "paypal", method_title: "PayPal" }];

      this.Woocommerce = WC({
        url: "http://localhost/wordpress/wptest/",
        consumerKey: "ck_72e1120fd52ce1463d9ad46364191a1b3aa1f890",
        consumerSecret: "cs_e6a02d8af56bf26116c15dca47cda25a97082c7f"
      })

      this.storage.get('userLoginInfo')
      .then((userLoginInfo)=> {
        

        this.userInfo = userLoginInfo.user;
        
              let email = userLoginInfo.user.email;

              // console.log(email)
        
              this.Woocommerce.getAsync("customers/email/" + email)
              
              .then((data) => {
        
                // console.log(JSON.parse(data.body).customer)
                this.newOrder = JSON.parse(data.body).customer;
        
              })
        


      })
  }

  setBillingToShipping()
  {
    this.billing_shipping_same = !this.billing_shipping_same;
    
        if (this.billing_shipping_same) 
        {
          this.newOrder.shipping_address = this.newOrder.billing_address;
        }
  }

  placeOrder()
  {
    let orderItems: any[] = []
    let data: any = {}

    let paymentData: any = {}

    this.paymentMethods
    .forEach((element, index) => {
      if (element.method_id == this.paymentMethod) 
      {
        paymentData = element;
      }
    })

    data = 
    {
      payment_details: {
        method_id: paymentData.method_id,
        method_title: paymentData.method_title,
        paid: true
      },

      billing_address: this.newOrder.billing_address,
      shipping_address: this.newOrder.shipping_address,
      customer_id: this.userInfo.id || '',
      line_items: orderItems
    }

    if (paymentData.method_id == "paypal") 
    {
      this.payPal.init({
        PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
        PayPalEnvironmentSandbox: 'AWXkMVNMoKx2xdr1IVl1Mvw-t6IJPWt6hjuK-8ep3lS81QSaGT67jBWzSXBJspGU2FeKEfu64wWymQ_H'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {

          this.storage.get("cart").then((cart) => {
            
                        let total = 0.00;
                        cart.forEach((element, index) => 
                        {
                          orderItems.push({ product_id: element.product.id, quantity: element.qty });
                          total = total + (element.product.price * element.qty);
                        });


          let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((response) => {
            // Successfully paid
            alert(JSON.stringify(response));

            data.line_items = orderItems;

            let orderData: any = {};

            orderData.order = data;


            this.Woocommerce.postAsync('orders', orderData).then((data) => {
              alert("Order placed successfully!");

              let response = (JSON.parse(data.body).order);

              this.alertCtrl.create({
                title: "Order Placed Successfully",
                message: "Your order has been placed successfully. Your order number is " + response.order_number,
                buttons: [{
                  text: "OK",
                  handler: () => {
                    this.navCtrl.push('HomePage');
                  }
                }]
              }).present();
            })
          })
            // Example sandbox response
            //
            // {
            //   "client": {
            //     "environment": "sandbox",
            //     "product_name": "PayPal iOS SDK",
            //     "paypal_sdk_version": "2.16.0",
            //     "platform": "iOS"
            //   },
            //   "response_type": "payment",
            //   "response": {
            //     "id": "PAY-1AB23456CD789012EF34GHIJ",
            //     "state": "approved",
            //     "create_time": "2016-10-03T13:33:33Z",
            //     "intent": "sale"
            //   }
            // }
          }, () => {
            // Error or render dialog closed without being successful
          });
        }, () => {
          // Error in configuration
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
      });
    }
    else
    {
      
      this.storage.get("cart").then((cart) => {
        
        cart.forEach((element, index) => {
          orderItems.push({
            product_id: element.product.id,
            quantity: element.qty
          });
        });
        
      data.line_items = orderItems;
        
      let orderData: any = {};
        
      orderData.order = data;
        
      this.Woocommerce.postAsync("orders", orderData)
      .then((data) => 
      {
        // console.log(JSON.parse(data.body).order)
        let response = (JSON.parse(data.body).order);
        
        this.alertCtrl.create({
          title: "Order Placed Successfully",
          message: "Your order has been placed successfully. Your order number is " + response.order_number,
          buttons: [{
          text: "OK",
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
          }]
        }).present();
        
      })
        
      })
    }
  }

}
