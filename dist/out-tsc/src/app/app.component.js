"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("./common/api.service");
var login_component_1 = require("./login/login.component");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var core_2 = require("angular2-cookie/core");
//import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
//import {Keepalive} from '@ng-idle/keepalive';
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/timer");
var angular4_notify_1 = require("angular4-notify");
var AppComponent = (function () {
    function AppComponent(router, LoginComponent, _api, _cookie, ns) {
        var _this = this;
        this.router = router;
        this._api = _api;
        this._cookie = _cookie;
        this.ns = ns;
        this.eresponse = [];
        this.loading = [];
        this.pop = [];
        this.crtDrpDown = "";
        this._tempTest = [];
        this.title = 'app';
        this.tests = [];
        this.tot = 0;
        this.hvc = 0;
        this.homoe_visit_charge = 50;
        this.colc = 0;
        //public _api:ApiService;
        this.user = [];
        this.userInfo = [];
        this.obj = [];
        this.cartCnt = 0;
        this.servicingCities = ['Hyderabad', 'Banglore'];
        //idle,keepalive
        this.idleState = 'Not started.';
        this.timedOut = false;
        this.lastPing = null;
        this.testsCount = 0;
        this.pckgs = [];
        this.setCart();
        this.loginComponent = LoginComponent;
        //console.log(this.tests.length);
        /*  this._api=_api;
           this._api.PinByGoogle("https://maps.googleapis.com/maps/api/geocode/json?latlng=17.432671,78.417993&key=AIzaSyCegOtEDutwtUyNWcOOLgoPedUYVob_AGk").subscribe(data=>{
             console.log(data);
           });
       */
        this.setFlag();
        /*
         console.log(this.tests);
          this.tests.forEach(element => {
                   this.tot=this.tot+parseInt(element.test_finalpr);
                 });*/
        //idle,keepalive
        //   idle.setIdle(10);
        //   idle.setTimeout(1800);//1800
        //   idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        //  idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
        //   idle.onTimeout.subscribe(() => {
        //     this.idleState = 'Timed out!';
        //     this.timedOut = true;
        //     this.toLogout();
        //   });
        //   idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
        //   idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');
        //   // sets the ping interval to 15 seconds
        //   keepalive.interval(15);
        //   keepalive.onPing.subscribe(() => this.lastPing = new Date());
        //  this.reset();
        //end keepalive,idle
        router.events.subscribe(function (_) {
            if ((_.url !== undefined) && (_.url !== '')) {
                _this.currentUrl = _.url.replace("/", "");
                //console.log(this.currentUrl);
            }
        });
    }
    AppComponent.prototype.reset1 = function (form) {
        form.resetForm();
        location.reload();
        //this.router.navigate(["./"]);
        //this.fotp=false; 
    };
    AppComponent.prototype.resetOnLogin = function (form) {
        form.resetForm();
    };
    AppComponent.prototype.liveLocation = function () {
        var c = this._cookie.get("location_city_name");
        if (((localStorage.getItem('location_city_name')) && (localStorage.getItem('location_city_name') !== 'undefined')) || (c !== 'undefined' && c !== undefined)) {
            this.loctxt = localStorage.getItem('location_city_name');
            if (this.loctxt === null) {
                this.loctxt = c;
                localStorage.setItem('location_city_name', this.loctxt);
                this.setLocation(c);
            }
            this.locdrpdown = false;
        }
        else {
            this.loctxt = "Select Location";
            this.locdrpdown = true;
        }
    };
    AppComponent.prototype.setLocation = function (val) {
        //console.log(val);
        localStorage.setItem('location_city_name', val);
        this._cookie.put("location_city_name", val);
        if (this.servicingCities.indexOf(val) > -1) {
            // console.log(this.city_name);
            localStorage.setItem("addTocart", "true");
        }
        else {
            localStorage.setItem("addTocart", "false");
            //this should be un-commented in live
            //localStorage.setItem("addTocart","true");
        }
        this.liveLocation();
        window.location.reload(); //in live this location should be appended
    };
    AppComponent.prototype.reset = function () {
        // this.idle.watch();
        // this.idleState = 'Started.';
        // this.timedOut = false;
    };
    AppComponent.prototype.OnInIt = function () {
        // this.a = localStorage.getItem('showCart');
        //console.log(this.testsCount);
        this.loading['getotp'] = false;
        window.scrollTo(0, 0);
        if (localStorage.getItem('tests')) {
            this.b = JSON.parse(localStorage.getItem('tests'));
            if (this.b.length > 0) {
                this.tests = this.b;
            }
            else {
                this.showhidecart = false;
            }
            if (localStorage.getItem('showcart') == "true") {
                this.showhidecart = true;
            }
        }
    };
    AppComponent.prototype.getPostalCode = function (data) {
        var _this = this;
        // console.log(data.longitude);
        var req_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + data.latitude + "," + data.longitude + "&key=AIzaSyCegOtEDutwtUyNWcOOLgoPedUYVob_AGk";
        this._api.PinByGoogle(req_url).subscribe(function (data) {
            _this.postalCode = data[5].address_components[0].long_name;
            _this.area_name = data[3].address_components[0].long_name;
            _this.city_name = data[3].address_components[0].long_name;
            localStorage.setItem('location_area_name', _this.area_name);
            localStorage.setItem('location_city_name', _this.city_name);
            //  if(this.servicingCities.indexOf(this.city_name) > -1){
            console.log(_this.city_name);
            _this.setLocation(_this.city_name);
            //   localStorage.setItem("addTocart","true");
            // }else{
            //  // localStorage.setItem("addTocart","false"); this should be un-commented in live
            //  localStorage.setItem("addTocart","true");
            // }
            // console.log("Postalcode",data[5].address_components[0].long_name);
            localStorage.setItem('postalCode', _this.postalCode);
        });
    };
    AppComponent.prototype.setCart = function () {
        var _this = this;
        //this.getPostalCode();
        this.postalCode = localStorage.getItem('postalCode');
        this.area_name = localStorage.getItem('location_area_name');
        this.liveLocation();
        //console.log("pc=",this.postalCode);
        this.tests = JSON.parse(localStorage.getItem('tests'));
        this.tot = 0;
        if (this.tests === null) {
            this.showhidecart = false;
            // return false;
            this.tests = [];
        }
        else {
            this.tests.forEach(function (element) {
                //this._tempTest.push(element);  
                _this.tot = _this.tot + (element.quant * parseInt(element.test_finalpr));
            });
            this.showhidecart = true;
        }
        //packages
        this.pckgs = JSON.parse(localStorage.getItem('packages'));
        if ((this.pckgs === null)) {
            this.pckgs = [];
        }
        else {
            this.pckgs.forEach(function (element) {
                _this.tot = _this.tot + parseInt(element.package_finalpr);
            });
            this.showhidecart = true;
        }
        this.cartCnt = this.tests.length + this.pckgs.length;
        this.postcheckOut();
        return false;
    };
    AppComponent.prototype.getOnlyTestByTid = function (tid) {
        var a;
        var stest = JSON.parse(localStorage.getItem('tests'));
        //console.log(stest);
        if (stest) {
            stest.forEach(function (element) {
                if (element.tid === tid) {
                    a = element;
                }
            });
        }
        return a;
    };
    AppComponent.prototype.quantAddByIndex = function (tid) {
        this.getAddTestCart(this.getOnlyTestByTid(tid));
    };
    AppComponent.prototype.quantMinusByIndex = function (tid) {
        this.getRemoveTestCart(this.getOnlyTestByTid(tid));
    };
    AppComponent.prototype.myIndexOf = function (o) {
        for (var i = 0; i < this.tests.length; i++) {
            var a = this.tests[i];
            var b = o;
            if (a.tid === b.tid) {
                return i;
            }
        }
        return -1;
    };
    AppComponent.prototype.getAddTestCart = function (test) {
        this.setCart();
        var i = this.myIndexOf(test);
        var t = this.tests[i].quant;
        t = t + 1;
        this.tests[i].quant = t;
        localStorage.setItem('tests', JSON.stringify(this.tests));
        this.setCart();
    };
    AppComponent.prototype.getRemoveTestCart = function (test) {
        this.setCart();
        var i = this.myIndexOf(test);
        var t = this.tests[i].quant;
        if (t > 1) {
            t = t - 1;
            this.tests[i].quant = t;
            localStorage.setItem('tests', JSON.stringify(this.tests));
            this.setCart();
        }
        else {
            this.deleteCartItem(this.user.user_id, test.tid);
        }
    };
    AppComponent.prototype.setFlag = function () {
        if (localStorage.getItem('user') != null) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.isLoggedIn = true;
        }
        else {
            this.isLoggedIn = false;
        }
    };
    AppComponent.prototype.saveCartClearData = function () {
        var _this = this;
        if (localStorage.getItem('user')) {
            var req_data_1 = {
                "TokenNo": "",
                "test_id": "0",
                "uid": JSON.parse(localStorage.getItem('user')).uid,
                "loc_id": "1",
                "status": "C",
                "is_wishlist": 2
            };
            this._api.getToken().subscribe(function (token) {
                req_data_1.TokenNo = token;
                _this._api.POST('AddtoWishList', req_data_1).subscribe(function (data) {
                    var resp = (JSON.parse(data.json).data);
                    //console.log(resp);
                });
            });
        }
    };
    AppComponent.prototype.clearCart = function () {
        localStorage.removeItem('tests');
        localStorage.removeItem('packages');
        this.saveCartClearData();
        this.setCart();
        // this.router.navigate(['./book']);
        //  window.location.href="./book";
        // window.location.reload();
    };
    AppComponent.prototype.hideCart = function () {
        localStorage.setItem('showcart', "false");
        this.showhidecart = false;
    };
    AppComponent.prototype.userValidDetailsCheck = function () {
        console.log(this.user.uid);
        var k = 1;
        if (this.user.uid > 0) {
            if (!isNaN(this.user.user_name)) {
                k = 2;
            }
            if (this.user.user_address === "NA") {
                k = 2;
            }
            return k;
        }
        else {
            return k = 0;
        }
    };
    AppComponent.prototype.checkOut = function () {
        this.hideCart();
        var a = { "tot": this.tot, "hvc": this.hvc, "colc": this.colc };
        localStorage.setItem("cartValues", JSON.stringify(a));
        //console.log(this.user);
        //return;
        console.log(this.userValidDetailsCheck());
        if (this.userValidDetailsCheck() == 1) {
            this.router.navigate(['./cart']);
            // window.location.href="./cart" 
        }
        else if (this.userValidDetailsCheck() == 2) {
            this.router.navigate(['./account']);
            //  window.location.href="./account"
        }
        else {
            //this.router.navigate(['./login']);
            //  window.location.href="./login"
            // this.toLogin();
            this.loginbtn.nativeElement.click();
        }
        // 
    };
    AppComponent.prototype.postcheckOut = function () {
        var a = { "tot": this.tot, "hvc": this.hvc, "colc": this.colc };
        localStorage.setItem("cartValues", JSON.stringify(a));
    };
    AppComponent.prototype.toLogin = function () {
        console.log("click on login");
        this.loginbtn.nativeElement.click();
        //this.login_modal.nativeElement.click();
    };
    AppComponent.prototype.toLogout = function () {
        this.isLoggedIn = false;
        this.user = [];
        this.loginComponent.loggedOut();
        this.setCart();
        this.router.navigate(['./home']);
    };
    AppComponent.prototype.profile = function () {
        this.router.navigate(['./account']);
    };
    AppComponent.prototype.getHumanDate = function (dt) {
        dt = dt.replace("/Date(", "");
        dt = dt.replace(")/", "");
        dt = dt.split("+");
        var hr = dt[1].substring(0, 2) * 60 * 1000;
        var min = dt[1].substring(2, 4) * 60 * 1000;
        var fdt = parseInt(dt[0]) + hr + min;
        var theDate = new Date(fdt);
        var dateString = theDate.toUTCString();
        var date1 = (theDate.getMonth() + 1).toString() + '/' + theDate.getDate().toString() + '/' + theDate.getFullYear().toString();
        return date1;
    };
    /* deleteCartItem(uid:number,tid:number){
       this.tests= JSON.parse(localStorage.getItem('tests'));
        //console.log(this.tests);
         this.tests.forEach( (item, index) => {
          if(item.tid === tid) this.tests.splice(index,1);
          
        });
         this.pckgs= JSON.parse(localStorage.getItem('packages'));
        //console.log(this.tests);
         this.pckgs.forEach( (item, index) => {
           if(item.id === tid) this.pckgs.splice(index,1);
        });
   
        //this.hideCart();
        localStorage.setItem("tests", JSON.stringify(this.tests));
        //console.log(JSON.parse(localStorage.getItem('tests')));
        localStorage.setItem("packages", JSON.stringify(this.pckgs));
        
      }*/
    AppComponent.prototype.deleteCartItem = function (uid, tid) {
        var _this = this;
        this.tests = JSON.parse(localStorage.getItem('tests'));
        if (this.tests != null) {
            this.tests.forEach(function (item, index) {
                //console.log(this.sel_members[item.tid]['uid']);
                if (item.tid === tid)
                    _this.tests.splice(index, 1);
            });
        }
        this.pckgs = JSON.parse(localStorage.getItem('packages'));
        if (this.pckgs != null) {
            this.pckgs.forEach(function (item, index) {
                if (item.id === tid)
                    _this.pckgs.splice(index, 1);
            });
        }
        localStorage.setItem("tests", JSON.stringify(this.tests));
        localStorage.setItem("packages", JSON.stringify(this.pckgs));
        // console.log(this.tests);
        this.tests = JSON.parse(localStorage.getItem('tests'));
        this.pckgs = JSON.parse(localStorage.getItem('packages'));
        this.tot = 0;
        /* if(this.tests!==null){
           this.tests.forEach(element => {
                  this.tot=this.tot+parseInt(element.test_finalpr);
                });
           this.testsCount=this.tests.length;
  
         }else{
          this.testsCount=0;
         }*/
        if (this.tests) {
            this.tests.forEach(function (element) {
                _this.tot = _this.tot + (parseInt(element.quant) * parseInt(element.test_finalpr));
            });
            this.testsCount = this.tests.length;
        }
        else {
            this.testsCount = 0;
        }
        /* if(this.pckgs!==null){
            this.pckgs.forEach(element => {
                 this.tot=this.tot+parseInt(element.package_finalpr);
               });
            this.packagesCount = this.pckgs.length;
           }else{
             this.packagesCount=0;
           }
           this.cartCnt=this.testsCount+this.packagesCount;*/
        if (this.pckgs) {
            this.pckgs.forEach(function (element) {
                _this.tot = _this.tot + parseInt(element.package_finalpr);
            });
            this.packagesCount = this.pckgs.length;
        }
        else {
            this.packagesCount = 0;
        }
        var a = { "tot": this.tot, "hvc": this.hvc, "colc": this.colc };
        localStorage.setItem("cartValues", JSON.stringify(a));
        // this.cartCnt=this.tests.length+this.pckgs.length;
        this.cartCnt = this.testsCount + this.packagesCount;
    };
    AppComponent.prototype.select = function (item, temp) {
        this.filterKey = new String(item);
        var re = / /gi;
        this.filterKey = this.filterKey.replace(re, "_");
        this.filterKey = this.filterKey.replace("(", "__,_");
        this.filterKey = this.filterKey.replace(")", "_,__");
        if (temp == "test") {
            // window.location.href="./test-details/"+this.filterKey;
            if (this.currentUrl.indexOf('test-details') >= 0) {
                window.location.href = "./test-details/" + this.filterKey;
                //debugger;
                //this.router.navigate(["./test-details/"+this.filterKey]);
                // window.location.reload();
            }
            else {
                this.router.navigate(["./test-details/" + this.filterKey]);
            }
        }
        else if (temp == "organ") {
            this.router.navigate(['./book', { organ: this.filterKey }]);
        }
        else if (temp == "spl") {
            this.router.navigate(['./book', { speciality: this.filterKey }]);
        }
        else if (temp == "cond") {
            this.router.navigate(['./book', { condition: this.filterKey }]);
        }
        else if (temp = "package") {
            var base_url = "";
            base_url = "package-details";
            /*if( this.ptype=="H"){
             base_url="package-details";
            }else if(this.ptype=="P"){
             base_url="profile-details";
            }*/
            window.location.href = "./" + base_url + "/" + this.filterKey;
        }
        // this.filteredItems = [];
    };
    AppComponent.prototype.getTestForCart = function () {
        //console.log(this.tests);
        if (localStorage.getItem("tests") !== null) {
            if (this.tests.length !== JSON.parse(localStorage.getItem("tests")).length) {
                this.tests = JSON.parse(localStorage.getItem("tests"));
            }
        }
        return this.tests;
    };
    AppComponent.prototype.getCartDropDown = function () {
        return this.crtDrpDown;
    };
    AppComponent.prototype.redir = function (dir) {
        this.router.navigate(['./' + dir]);
    };
    AppComponent.prototype.getOTP = function (form, isValid) {
        var _this = this;
        //debugger;
        this.loading['getotp'] = true;
        console.log('getOTPForm', form.value);
        if (isValid) {
            this.lphone_number = form.value.Mobile;
            this._api.getToken().subscribe(function (token) {
                var data = {
                    'TokenNo': token,
                    'login_username': form.value.Mobile
                };
                _this._api.POST('ExpressLogin', data).subscribe(function (data) {
                    var response = (JSON.parse(data.json).data);
                    //debugger;
                    if (response == undefined) {
                        //    form.resetForm();
                        alert("undefined");
                    }
                    else {
                        if (response[0].uid != null) {
                            _this.eresponse = response;
                            //  form.resetForm();   
                            _this.gotp.nativeElement.setAttribute("data-target", "#verify_login_otp_modal");
                            _this.gotp.nativeElement.setAttribute("type", "button");
                            _this.gotp.nativeElement.click();
                            // this.login_modal.nativeElement.click(); 
                            _this.uid = response[0].uid;
                            _this.timerless(29);
                        }
                        else {
                            swal("<small>Failed to send OTP</small>");
                            form.resetForm();
                        }
                    }
                    _this.loading['getotp'] = false;
                });
            });
        }
        else {
            console.log("here");
        }
    }; //getOTP
    AppComponent.prototype.timerless = function (t) {
        var _this = this;
        this.resendotptime = t;
        this.tloop = Observable_1.Observable.timer(1000);
        this.tloop.subscribe(function () {
            if (t > 0) {
                _this.timerless(t - 1);
            }
        });
    };
    AppComponent.prototype.getresendotptime = function () {
        return this.resendotptime;
    };
    AppComponent.prototype.resendOTP = function (mob) {
        var form = { "value": { "Mobile": mob } };
        this.getOTP(form, true);
    };
    AppComponent.prototype.autoTab = function (event) {
        if (event.target.value.length >= event.target.maxLength && event.target.nextElementSibling)
            event.target.nextElementSibling.focus();
    };
    AppComponent.prototype.loginByOTP = function (form, isValid, uid, ph) {
        var _this = this;
        //console.log('otpform',form.value);
        if (isValid) {
            this._api.getToken().subscribe(function (token) {
                var data = {
                    "TokenNo": token,
                    "otp": form.value.term1 + form.value.term2 + form.value.term3 + form.value.term4,
                    "user_id": _this.uid
                };
                _this._api.POST('ExpressloginOtpVerification', data).subscribe(function (data) {
                    var resp = (JSON.parse(data.json).data);
                    // console.log('Login BY OTP',resp);
                    var res = resp;
                    if (resp == undefined) {
                        form.resetForm();
                    }
                    else {
                        if (resp[0].uid != null) {
                            swal("<small>OTP verified successfully</small>");
                            //console.log(res);
                            if (res[0].user_token == null) {
                                res[0].user_token = "sometokenhere007";
                            }
                            if (res[0].user_token != null) {
                                localStorage.setItem('token', res[0].user_token);
                                var nk = [];
                                if (res[0].user_name == null) {
                                    nk[0] = "";
                                    nk[1] = "";
                                }
                                else {
                                    nk = res[0].user_name.split(" ");
                                }
                                res[0].firstname = nk[0];
                                res[0].lastname = nk[1];
                                localStorage.setItem('user', JSON.stringify(res[0]));
                                //get temp cart data
                                // this.getCartData();
                                //debugger;
                                if (res[0].user_address == "NA") {
                                    _this.router.navigate(['./account']);
                                    _this.btncls2.nativeElement.click();
                                    _this.btncls1.nativeElement.click();
                                }
                                else {
                                    _this.getCartData();
                                }
                                console.log("logged in successfully");
                                //swal("<small>Logged in successfully</small>");
                            }
                            else {
                                console.log("invalid authentication");
                                //swal("<small>Invalid Authentication.</small>");
                                form.resetForm();
                            }
                            //login logic
                        }
                        else {
                            swal("OTP verification failed");
                            form.resetForm();
                        }
                    }
                });
            });
        }
    };
    AppComponent.prototype.getOtpVerification = function (form, isValid) {
        var _this = this;
        this._api.getToken().subscribe(function (token) {
            var data = {
                "TokenNo": token,
                "otp": form.value.term1 + form.value.term2 + form.value.term3 + form.value.term4,
                "user_id": form.value.user_id
            };
            _this._api.POST('GetOtpVerification', data).subscribe(function (data) {
                var resp = (JSON.parse(data.json).data);
                //console.log(resp);
                if (resp == undefined) {
                    form.resetForm();
                }
                else {
                    if (resp[0].uid != null) {
                        // swal("<small>OTP verified successfully</small>");
                        form.resetForm();
                    }
                    else {
                        swal("OTP verification failed");
                        form.resetForm();
                    }
                }
            });
        });
    };
    AppComponent.prototype.getPhoneSubStr = function (mi, mx) {
        if (this.lphone_number) {
            return this.lphone_number.substring(mi, mx);
        }
        else {
            return "";
        }
    };
    AppComponent.prototype.getCartData = function () {
        var _this = this;
        var req_data = {
            "TokenNo": "",
            "uid": JSON.parse(localStorage.getItem('user')).uid,
            "Flag": 2
        };
        this._api.getToken().subscribe(function (token) {
            req_data.TokenNo = token;
            _this._api.POST('GetTestWishList', req_data).subscribe(function (data) {
                var resp = (JSON.parse(data.json).data);
                // console.log(resp);
                var k = [];
                if (JSON.parse(localStorage.getItem('tests')) !== null) {
                    k = JSON.parse(localStorage.getItem('tests'));
                }
                if ((resp !== null) && (resp !== undefined)) {
                    if (resp.length > 0) {
                        resp.forEach(function (element) {
                            k.push(element);
                        });
                        //  console.log(k);
                        localStorage.setItem('tests', JSON.stringify(k));
                        _this.btncls2.nativeElement.click();
                        _this.btncls1.nativeElement.click();
                        _this.router.navigate(['./cart']);
                    }
                }
                else if (k.length > 0) {
                    localStorage.setItem('tests', JSON.stringify(k));
                    _this.btncls2.nativeElement.click();
                    _this.btncls1.nativeElement.click();
                    _this.router.navigate(['./cart']);
                }
                else {
                    _this.btncls2.nativeElement.click();
                    _this.btncls1.nativeElement.click();
                    _this.router.navigate(['./book']);
                }
                //     if(JSON.parse(localStorage.getItem('tests'))=== null){
                //       this.router.navigate(['./book']);
                // }else{
                //      this.router.navigate(['./cart']);
                // }
            });
        });
    };
    AppComponent.prototype.setELuid = function (evnt) {
        this.uid = evnt.target.value;
    };
    AppComponent.prototype.getNotify = function (msg) {
        this.ns.addError(msg);
    };
    return AppComponent;
}());
AppComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css'],
                providers: [http_1.HttpModule, login_component_1.LoginComponent],
            },] },
];
/** @nocollapse */
AppComponent.ctorParameters = function () { return [
    { type: router_1.Router, },
    { type: login_component_1.LoginComponent, },
    { type: api_service_1.ApiService, },
    { type: core_2.CookieService, },
    { type: angular4_notify_1.NotificationsService, },
]; };
AppComponent.propDecorators = {
    'gotp': [{ type: core_1.ViewChild, args: ['gotp',] },],
    'login_modal': [{ type: core_1.ViewChild, args: ['login_modal',] },],
    'verify_login_otp_modal': [{ type: core_1.ViewChild, args: ['verify_login_otp_modal',] },],
    'loginbtn': [{ type: core_1.ViewChild, args: ['loginbtn',] },],
    'getotpclick': [{ type: core_1.ViewChild, args: ['getotpclick',] },],
    'btncls2': [{ type: core_1.ViewChild, args: ['btncls2',] },],
    'btncls1': [{ type: core_1.ViewChild, args: ['btncls1',] },],
};
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map