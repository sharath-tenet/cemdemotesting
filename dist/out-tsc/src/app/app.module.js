"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_router_1 = require("./app.router");
var app_component_1 = require("./app.component");
var contactus_component_1 = require("./contactus/contactus.component");
var home_component_1 = require("./home/home.component");
var book_component_1 = require("./book/book.component");
var http_1 = require("@angular/http");
var test_details_component_1 = require("./test-details/test-details.component");
var api_service_1 = require("./common/api.service");
var noop_interceptor_1 = require("./common/noop-interceptor");
var cart_component_1 = require("./cart/cart.component");
var login_component_1 = require("./login/login.component");
var slots_component_1 = require("./slots/slots.component");
var payment_component_1 = require("./payment/payment.component");
var invoice_component_1 = require("./invoice/invoice.component");
var forms_1 = require("@angular/forms");
var password_match_directive_1 = require("./login/password.match.directive");
var account_component_1 = require("./account/account.component");
var wishlist_component_1 = require("./wishlist/wishlist.component");
var core_2 = require("angular2-cookie/core");
var common_1 = require("@angular/common");
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//ng2-idle
// import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
var angular2_moment_1 = require("angular2-moment");
var forms_2 = require("@angular/forms");
var ng2_owl_carousel_1 = require("ng2-owl-carousel");
var our_facilities_component_1 = require("./our-facilities/our-facilities.component");
var our_network_component_1 = require("./our-network/our-network.component");
var our_packages_component_1 = require("./our-packages/our-packages.component");
var order_history_component_1 = require("./order-history/order-history.component");
var wallet_component_1 = require("./wallet/wallet.component");
var not_found_component_1 = require("./not-found/not-found.component");
var http_2 = require("@angular/common/http");
var ngx_loading_1 = require("ngx-loading");
var ngx_pagination_1 = require("ngx-pagination");
var about_us_component_1 = require("./about-us/about-us.component");
var ngx_scroll_to_1 = require("@nicky-lenaers/ngx-scroll-to");
var ngx_mydatepicker_1 = require("ngx-mydatepicker");
var privacy_policy_component_1 = require("./privacy-policy/privacy-policy.component");
var refund_cancel_component_1 = require("./refund-cancel/refund-cancel.component");
// import {AngularFireModule} from 'angularfire2';
// import { WindowService } from './common/window.service';
// import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
var tnc_component_1 = require("./tnc/tnc.component");
var bill_view_component_1 = require("./bill-view/bill-view.component");
var angular4_notify_1 = require("angular4-notify");
exports.httpInterceptorProviders = [
    { provide: http_2.HTTP_INTERCEPTORS, useClass: noop_interceptor_1.NoopInterceptor, multi: true },
];
exports.firebaseconfig = {
    apiKey: "AIzaSyC3eZ9J7MsHBlaofBhwGSB1bD9xOtBAUlo",
    authDomain: "tenetdiagnostics.firebaseapp.com",
    databaseURL: "https://tenetdiagnostics.firebaseio.com",
    projectId: "tenetdiagnostics",
    storageBucket: "tenetdiagnostics.appspot.com",
    messagingSenderId: "380621725594"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    app_component_1.AppComponent,
                    contactus_component_1.ContactusComponent,
                    home_component_1.HomeComponent,
                    book_component_1.BookComponent,
                    test_details_component_1.TestDetailsComponent,
                    cart_component_1.CartComponent,
                    login_component_1.LoginComponent,
                    slots_component_1.SlotsComponent,
                    payment_component_1.PaymentComponent,
                    invoice_component_1.InvoiceComponent,
                    password_match_directive_1.EqualValidator,
                    account_component_1.AccountComponent,
                    wishlist_component_1.WishlistComponent,
                    our_facilities_component_1.OurFacilitiesComponent,
                    our_network_component_1.OurNetworkComponent,
                    our_packages_component_1.OurPackagesComponent,
                    order_history_component_1.OrderHistoryComponent,
                    wallet_component_1.WalletComponent,
                    not_found_component_1.NotFoundComponent,
                    about_us_component_1.AboutUsComponent,
                    privacy_policy_component_1.PrivacyPolicyComponent,
                    refund_cancel_component_1.RefundCancelComponent,
                    tnc_component_1.TncComponent,
                    bill_view_component_1.BillViewComponent,
                ],
                imports: [
                    platform_browser_1.BrowserModule.withServerTransition({ appId: 'cemsdemo' }),
                    app_router_1.routes,
                    http_1.HttpModule,
                    forms_1.FormsModule,
                    angular2_moment_1.MomentModule,
                    ng2_owl_carousel_1.OwlModule,
                    ngx_pagination_1.NgxPaginationModule,
                    forms_2.ReactiveFormsModule,
                    // BrowserAnimationsModule,
                    //  AngularFireModule.initializeApp(firebaseconfig),
                    //  AngularFireAuthModule,
                    ngx_mydatepicker_1.NgxMyDatePickerModule.forRoot(),
                    ngx_scroll_to_1.ScrollToModule.forRoot(),
                    angular4_notify_1.NotificationsModule,
                    ngx_loading_1.LoadingModule.forRoot({
                        animationType: ngx_loading_1.ANIMATION_TYPES.threeBounce,
                        backdropBackgroundColour: 'rgba(0,0,0,0.1)',
                        backdropBorderRadius: '10px',
                        primaryColour: '#f05b25',
                        secondaryColour: '#f05b25',
                        tertiaryColour: '#f05b25'
                    }),
                ],
                providers: [home_component_1.HomeComponent, api_service_1.ApiService, app_component_1.AppComponent, login_component_1.LoginComponent, core_2.CookieService, exports.httpInterceptorProviders, http_2.HttpClient, common_1.DatePipe, angular4_notify_1.NotificationsService],
                bootstrap: [app_component_1.AppComponent]
            },] },
];
/** @nocollapse */
AppModule.ctorParameters = function () { return []; };
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map