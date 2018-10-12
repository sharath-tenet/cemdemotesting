"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var book_component_1 = require("./book/book.component");
var contactus_component_1 = require("./contactus/contactus.component");
var test_details_component_1 = require("./test-details/test-details.component");
var cart_component_1 = require("./cart/cart.component");
var slots_component_1 = require("./slots/slots.component");
var login_component_1 = require("./login/login.component");
var invoice_component_1 = require("./invoice/invoice.component");
var account_component_1 = require("./account/account.component");
var payment_component_1 = require("./payment/payment.component");
var wishlist_component_1 = require("./wishlist/wishlist.component");
var our_facilities_component_1 = require("./our-facilities/our-facilities.component");
var our_network_component_1 = require("./our-network/our-network.component");
var our_packages_component_1 = require("./our-packages/our-packages.component");
var order_history_component_1 = require("./order-history/order-history.component");
var wallet_component_1 = require("./wallet/wallet.component");
var about_us_component_1 = require("./about-us/about-us.component");
var privacy_policy_component_1 = require("./privacy-policy/privacy-policy.component");
var refund_cancel_component_1 = require("./refund-cancel/refund-cancel.component");
var tnc_component_1 = require("./tnc/tnc.component");
var bill_view_component_1 = require("./bill-view/bill-view.component");
var not_found_component_1 = require("./not-found/not-found.component");
//import {CookieService} from 'angular2-cookie/core';
exports.router = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'book/:event', component: book_component_1.BookComponent },
    { path: 'book', component: book_component_1.BookComponent },
    { path: 'contactus', component: contactus_component_1.ContactusComponent },
    { path: 'network', component: our_network_component_1.OurNetworkComponent },
    { path: 'profile-details/:event', component: our_packages_component_1.OurPackagesComponent },
    { path: 'package-details/:event', component: our_packages_component_1.OurPackagesComponent },
    { path: 'packages', component: our_packages_component_1.OurPackagesComponent },
    { path: 'cart', component: cart_component_1.CartComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'slots', component: slots_component_1.SlotsComponent },
    { path: 'payment/:token', component: payment_component_1.PaymentComponent },
    { path: 'payment', component: payment_component_1.PaymentComponent },
    { path: 'invoice', component: invoice_component_1.InvoiceComponent },
    { path: 'account/:any', component: account_component_1.AccountComponent },
    { path: 'account', component: account_component_1.AccountComponent },
    { path: 'our-facilities', component: our_facilities_component_1.OurFacilitiesComponent },
    { path: 'order-history', component: order_history_component_1.OrderHistoryComponent },
    { path: 'test-details/:city/:area/:any', component: test_details_component_1.TestDetailsComponent },
    { path: 'book/test-details/:any', component: test_details_component_1.TestDetailsComponent },
    { path: 'test-details/:any', component: test_details_component_1.TestDetailsComponent },
    { path: 'bill-view/:bill', component: bill_view_component_1.BillViewComponent },
    { path: 'book/wishlist', component: wishlist_component_1.WishlistComponent },
    { path: 'wallet', component: wallet_component_1.WalletComponent },
    { path: 'about-us', component: about_us_component_1.AboutUsComponent },
    { path: 'privacy-policy', component: privacy_policy_component_1.PrivacyPolicyComponent },
    { path: 'refund-cancel', component: refund_cancel_component_1.RefundCancelComponent },
    { path: 'tnc', component: tnc_component_1.TncComponent },
    //these should be in the last of the routes
    { path: '404', component: not_found_component_1.NotFoundComponent },
    { path: '**', redirectTo: '/404' }
];
exports.routes = router_1.RouterModule.forRoot(exports.router, { enableTracing: false });
//# sourceMappingURL=app.router.js.map