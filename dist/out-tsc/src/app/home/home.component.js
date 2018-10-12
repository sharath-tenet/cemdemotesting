"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import {StateService} from '../common/state.service';
var api_service_1 = require("../common/api.service");
var router_1 = require("@angular/router");
var app_component_1 = require("../app.component");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
var HomeComponent = (function () {
    function HomeComponent(_api, router, _appComponent, el) {
        var _this = this;
        this._api = _api;
        this.router = router;
        this.el = el;
        this.ptype = "H";
        this.windowRef = [];
        this._packagesSearchResult = [];
        this.searchTerm = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]);
        this.searchResult = [];
        this._packages = [];
        this.title = 'Center for Excellence Medical Sciences';
        this.body = 'This is the about home body';
        this.image_path = "/assets/images/imagehbg.png";
        this.images = ["sliders/slider_image.png", "sliders/Banners-01.jpg", "sliders/Banners-02.jpg", "sliders/Banners-03.jpg", "sliders/Banners-04.jpg", "sliders/Banners-05.jpg", "sliders/Banners-06.jpg", "sliders/Banners-07.jpg", "sliders/Banners-08.jpg"];
        this.images1 = ["iconimages/homepage_presn_slider/1.png"];
        this.top_tests = ["Complete Blood Picture (CBP), EDTA Whole Blood", "Lipid Profile, Serum", "Liver Function Test (LFT), Serum", "Thyroid Antibodies (TG & TPO), Serum", "Thyroid Profile (T3,T4,TSH), Serum", "1, 25-Dihydroxy Vitamin D, Serum", "25 - Hydroxy Vitamin D, Serum", "Urea, Serum", "Creatinine, Serum", "Triple Marker, Serum", "Magnesium, Serum",
            "Complete Urine Examination (CUE), Spot Urine", "Glucose Fasting (FBS),  Sodium Flouride Plasma", "Glycosylated Hemoglobin (HbA1C), EDTA Whole Blood", "Uric Acid, Serum", "Thyroglobulin (Tg), Serum", "Blood Urea Nitrogen (BUN), Serum", "Prolactin, Serum", "Prothrombin Time With INR, Sodium Citrate Whole Blood", "HIV 1 & 2 Antibodies, Serum", "Culture And Sensitivity (Aerobic), Urine"];
        this.loading = [];
        this.mpckgshow = false;
        this._pckg = [];
        this.tmp = [];
        this.tokenSet = false;
        this.sotp = false;
        this.fotp = false;
        this.ivotp = false;
        this.otps = false;
        this.msg = false;
        this.mobilenoExists = false;
        // console.log("Get Banners here!");
        //this._api=_api;
        this._appComponent = _appComponent;
        this.tokenSet = this._appComponent.isLoggedIn;
        this.queryString;
        this.searchTerm.valueChanges
            .debounceTime(400)
            .subscribe(function (data) {
            var term = new String(data);
            if (data == undefined) {
                _this.mpckgshow = false;
                return false;
            }
            if (term.length >= 3) {
                //  this.ns.addWarning('this is a warning message');
                _this._api.getToken().subscribe(function (token) {
                    _this._api.POST('GetServices', { TokenNo: token, pincode: '', test_name: data, test_code: '', test_type: '', condition_id: '', speciality_id: '', sort_by: '', sort_order: '', AlphaSearch: '', user_id: '', is_home_collection: "", organ_id: "" }).subscribe(function (data) {
                        if (data.status == 1) {
                            _this.searchResult = JSON.parse(data.json).data;
                        }
                        else {
                            _this.searchResult = [];
                        }
                    });
                });
                _this._api.getToken().subscribe(function (token) {
                    _this._api.POST('GetPackages', { TokenNo: token, "pincode": "", "package_name": data, "package_code": "", "sort_by": "", "sort_order": "", "alphaSearch": "", "type": "H" }).subscribe(function (data) {
                        if (data.status == 1) {
                            _this._packagesSearchResult = JSON.parse(data.json).data;
                            //this.testsList=[];
                        }
                        else {
                            _this._packagesSearchResult = [];
                        }
                        _this.mpckgshow = true;
                    });
                });
            }
        });
    }
    HomeComponent.prototype.getlocation = function () {
        var _this = this;
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                _this.geolocationPosition = position;
                // this.latitude= position.coords.latitude;
                // this.longitude= position.coords.longitude;
                _this._appComponent.getPostalCode(_this.parselatlang());
                //console.log(position);
                //localStorage.setItem('lat', this.latitude);
                //localStorage.setItem('long', this.longitude);
                //console.log("gp",this.geolocationPosition);      
            }, function (error) {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            });
        }
        ;
    };
    HomeComponent.prototype.ngOnInit = function () {
        // this.message = this._stateService.getMessage();
        this.getlocation();
        // console.log(this.geolocationPosition);
        //get address by lat lang
        //this.ns.addWarning('This is a test message');
        localStorage.setItem('showCart', "false");
        this.getPackages();
        window.scrollTo(0, 0);
        // this.windowRef = this.win.windowRef
        // this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container');
        // this.windowRef.recaptchaVerifier.render()
    };
    HomeComponent.prototype.parselatlang = function () {
        var a = this.getCordinates();
        var lat = a['coords']['latitude'];
        var long = a['coords']['longitude'];
        var res = { "latitude": lat, "longitude": long };
        return res;
    };
    HomeComponent.prototype.getOTP = function (frm, vald) {
        //console.log("form",form.value);
        this._appComponent.toLogin();
    };
    HomeComponent.prototype.autoTab = function (event) {
        if (event.target.value.length >= event.target.maxLength && event.target.nextElementSibling)
            event.target.nextElementSibling.focus();
    };
    HomeComponent.prototype.reset = function (form) {
        form.resetForm();
        //this.fotp=false; 
    };
    HomeComponent.prototype.reset1 = function (form) {
        form.resetForm();
        this.otpM.nativeElement.removeAttribute("data-target");
        this.otpM.nativeElement.setAttribute("type", "submit");
    };
    HomeComponent.prototype.getCordinates = function () {
        return this.geolocationPosition;
    };
    HomeComponent.prototype.getBookAnAppointment = function () {
        this.router.navigate(['./book']);
    };
    HomeComponent.prototype.searchBasedOnString = function (str) {
        if (str != undefined) {
            this.router.navigate(['./book', { searchString: str }]);
        }
        else {
            return false;
        }
    };
    HomeComponent.prototype.movescaro = function (obj, dir) {
        if (dir == "left") {
            obj.previous();
        }
        else if (dir == "right") {
            obj.next();
        }
    };
    HomeComponent.prototype.showHover = function (val) {
        this.addW = val;
    };
    HomeComponent.prototype.eventHandler = function (event) {
        //console.log(event, event.keyCode, event.keyIdentifier);
        console.log(event.key);
    };
    HomeComponent.prototype.getPackages = function () {
        var _this = this;
        this.mpckgshow = false;
        this.loading['packages'] = true;
        this._packages = [];
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetPackages', { TokenNo: token, "pincode": "", "package_name": "", "package_code": "", "sort_by": "", "sort_order": "", "alphaSearch": "", "type": "H" }).subscribe(function (data) {
                if (data.status == 1) {
                    var p = JSON.parse(data.json).data;
                    p.forEach(function (element) {
                        if (element.package_price > 0) {
                            _this._packages.push(element);
                        }
                    });
                    //this.testsList=[];
                    _this.loading['packages'] = false;
                }
                else {
                    _this.getpackagecnf = true;
                    _this._packages = [];
                    _this.loading['packages'] = false;
                }
                //console.log(this._packages);
                return _this._packages;
            });
        });
    };
    //add pckg cart from here
    HomeComponent.prototype.getAddPackageCart = function (pckg) {
        var _this = this;
        this._pckg = [];
        var pshare = JSON.parse(localStorage.getItem('packages'));
        if (pshare) {
            this.tmp = JSON.parse(localStorage.getItem('packages'));
            this.tmp.forEach(function (element) {
                _this._pckg.push(element);
            });
            //console.log('indexOfpckgs',this.IndexOf(pckg));
            if (this.IndexOf(pckg) < 0) {
                pckg.quant = 1;
                this._pckg.push(pckg);
            }
            else {
                var i = this.IndexOf(pckg);
                var t = this._pckg[i].quant;
                t = t + 1;
                this._pckg[i].quant = t;
            }
        }
        else {
            pckg.quant = 1;
            this._pckg.push(pckg);
        }
        localStorage.setItem('packages', JSON.stringify(this._pckg));
        this._appComponent.setCart();
    };
    HomeComponent.prototype.getRemovePackageCart = function (pckg) {
        var i = this.IndexOf(pckg);
        var t = this._pckg[i].quant;
        if (t > 1) {
            t = t - 1;
            this._pckg[i].quant = t;
            localStorage.setItem('packages', JSON.stringify(this._pckg));
            this._appComponent.setCart();
        }
    };
    HomeComponent.prototype.getPckgQuant = function (pckg) {
        var b = 1;
        if (this.IndexOf(pckg) >= 0) {
            b = this._pckg[this.IndexOf(pckg)].quant;
        }
        //console.log('b=',b);
        return b;
    };
    HomeComponent.prototype.IndexOf = function (p) {
        for (var i = 0; i < this._pckg.length; i++) {
            /* let a=JSON.stringify(this._pckg[i]);
             let b=JSON.stringify(p);
               if (a===b) {
                   return i;
               }*/
            var a = this._pckg[i];
            var b = p;
            if (a.id === b.id) {
                return i;
            }
        }
        return -1;
    };
    HomeComponent.prototype.getPopularTests = function (strng) {
        if (strng === '') {
            return this.top_tests;
        }
        else {
            return [];
        }
    };
    HomeComponent.prototype.loginSubmit = function (form, isValid) {
        //console.log(form.value, isValid);
        var _this = this;
        var data = {
            "TokenNo": "",
            "login_username": form.value.phone,
            "password": form.value.password1
        };
        /*  if(rm==true){
           var date = new Date();
           var midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
           //Cookies.set('visits', number, { expires: midnight });
    
            this._cookieService.put(newLocal, username, {expires:midnight});
    
            this._cookieService.put('PASSWORD', password, {expires:midnight});
    
            this._cookieService.put('RM', "true", {expires:midnight});
          }else{
            this._cookieService.removeAll();
          }*/
        if (isValid) {
            this._api.getToken().subscribe(function (token) {
                data.TokenNo = token;
                _this._api.POST('GetLoginUser', data).subscribe(function (data) {
                    var res = JSON.parse(data.json).data;
                    if (res == undefined) {
                        swal("<small>Invalid Authentication.</small>");
                        form.resetForm();
                    }
                    else {
                        //console.log('res',res);
                        if (res[0].user_token != null) {
                            localStorage.setItem('token', res[0].user_token);
                            localStorage.setItem('user', JSON.stringify(res[0]));
                            //get temp cart data
                            // this.getCartData();
                            //this.redir('order-history');
                            _this.router.navigate(['./account/order-history']);
                            console.log("logged in successfully");
                            //swal("<small>Logged in successfully</small>");
                        }
                        else {
                            console.log("invalid authentication");
                            //swal("<small>Invalid Authentication.</small>");
                            form.resetForm();
                        }
                    }
                });
            });
        }
        else {
            console.log("");
        }
    };
    HomeComponent.prototype.redir = function (val) {
        window.location.href = "./" + val;
    };
    HomeComponent.prototype.isadded = function (tid) {
        //  console.log(tid);
        var stest = JSON.parse(localStorage.getItem('tests'));
        //console.log(stest);
        var a = false;
        if (stest) {
            stest.forEach(function (element) {
                if (element.tid === tid) {
                    a = true;
                }
            });
        }
        return a;
    };
    /*package add,quant by sharath start*/
    HomeComponent.prototype.testQuantPlus = function (tid) {
        this._appComponent.quantAddByIndex(tid);
    };
    HomeComponent.prototype.testQuantMinus = function (tid) {
        this._appComponent.quantMinusByIndex(tid);
    };
    HomeComponent.prototype.getTestQuant = function (test) {
        var a = 1;
        var stest = JSON.parse(localStorage.getItem('tests'));
        if (stest) {
            stest.forEach(function (element) {
                if (element.tid === test) {
                    a = element.quant;
                }
            });
        }
        return a;
    };
    HomeComponent.prototype.addPackageCart = function (pckg) {
        // this.bookComponent.getAddPackageCart(pckg);
        /*this.router.navigate(['./book', {searchString:str}]);*/
        this.getAddTestCart(pckg, "pckg");
    };
    HomeComponent.prototype.myIndexOf = function (o) {
        this._tempTest = JSON.parse(localStorage.getItem('tests'));
        var k = -1;
        for (var i = 0; i < this._tempTest.length; i++) {
            var a = this._tempTest[i];
            var b = o;
            if (a.tid === b.tid) {
                k = i;
            }
        }
        return k;
    };
    HomeComponent.prototype.getAddTestCart = function (test, attrib, event) {
        var _this = this;
        if (event === void 0) { event = ''; }
        // console.log(event.target.classList.add('added'));
        //localStorage.setItem('btncls',event.target.classList.add('added'));
        //event.target.textContent = "ADDED";
        //console.log(test);
        if (attrib == 'pckg') {
            var test1 = test;
            test = {};
            test.tid = test1.id;
            test.test_name = test1.package_code;
            test.test_code = test1.package_discpr;
            test.test_finalpr = test1.package_finalpr;
            test.test_name = test1.package_name;
            test.test_price = test1.package_price;
            test.quant = test1.quant;
            test.report_avb = "";
            test.test_ptn = "";
            test.type = "";
        }
        this._tempTest = [];
        this.temp2 = [];
        var testshere = JSON.parse(localStorage.getItem('tests'));
        if (testshere) {
            this.temp2 = JSON.parse(localStorage.getItem('tests'));
            this.temp2.forEach(function (element) {
                _this._tempTest.push(element);
            });
            if (this.myIndexOf(test) < 0) {
                test.quant = 1;
                this._tempTest.push(test);
            }
            else {
                var i = this.myIndexOf(test);
                var t = this._tempTest[i].quant;
                t = t + 1;
                this._tempTest[i].quant = t;
            }
        }
        else {
            test.quant = 1;
            this._tempTest.push(test);
        }
        //console.log(this._tempTest);
        localStorage.setItem('tests', JSON.stringify(this._tempTest));
        this._appComponent.setCart();
    };
    HomeComponent.prototype.select = function (item, type) {
        this.filterKey = new String(item);
        this.searchResult = [];
        //this._packagesSearchResult=[];
        this._packages1 = [];
        var re = / /gi;
        var fk;
        fk = this.filterKey.replace(re, "_");
        fk = fk.replace("(", "__,_");
        fk = fk.replace(")", "_,__");
        fk = fk.replace("/", "?slh?");
        if (type == "test") {
            window.location.href = "./test-details/" + fk;
        }
        else if (type = "package") {
            var base_url = "";
            if (this.ptype == "H") {
                base_url = "package-details";
            }
            else if (this.ptype == "P") {
                base_url = "profile-details";
            }
            window.location.href = "./" + base_url + "/" + fk;
        }
        // this.filteredItems = [];
    };
    /*package add,quant by sharath end*/
    HomeComponent.prototype.getForgotPassword = function (form, isValid) {
        var _this = this;
        console.log('formValues', form.value);
        console.log(isValid);
        if (isValid) {
            this._api.getToken().subscribe(function (token) {
                var data = {
                    'TokenNo': token,
                    'mobile': form.value.Mobile
                };
                _this._api.POST('GetForgotPassword', data).subscribe(function (data) {
                    var response = (JSON.parse(data.json).data);
                    console.log("response", response);
                    if (response == undefined) {
                        form.resetForm();
                        _this.fotp = true;
                    }
                    else {
                        if (response[0].mobile != null) {
                            _this.sotp = true;
                            _this.fotp = false;
                            form.resetForm();
                            _this.phneNo = response[0].mobile;
                            _this.forget_password_modal.nativeElement.click();
                            //swal("<small>OTP sent successfully</small>");
                            _this.uid = response[0].uid;
                            _this.otpM.nativeElement.setAttribute("data-target", "#otp_modal1");
                            _this.otpM.nativeElement.setAttribute("type", "button");
                            _this.otpM.nativeElement.click();
                            _this.sotp = false;
                        }
                        else {
                            //window.alert("failed to send OTP");
                            //swal("<small>Failed to send OTP</small>");
                            _this.fotp = true;
                            form.resetForm();
                        }
                    }
                });
            });
        }
    };
    HomeComponent.prototype.resendOTP = function (mobile) {
        var _this = this;
        console.log(mobile);
        this._api.getToken().subscribe(function (token) {
            var data = {
                'TokenNo': token,
                'mobile': mobile
            };
            _this._api.POST('GetForgotPassword', data).subscribe(function (data) {
                var response = (JSON.parse(data.json).data);
                console.log("resendResp", response);
                if (response == undefined) {
                    //form.resetForm();
                    // this.fotp = true;
                    alert("undefined");
                }
                else {
                    if (response[0].mobile != null) {
                        //swal("<small>OTP sent successfully</small>");
                        window.alert("OTP sent to your registered email id successfully");
                    }
                    else {
                        window.alert("failed to send OTP");
                    }
                }
            });
        });
    };
    HomeComponent.prototype.UpdatePasswordByOTP1 = function (form, isValid, uid) {
        var _this = this;
        if (isValid) {
            if (form.value.pwd == form.value.cpwd) {
                this._api.getToken().subscribe(function (token) {
                    var data = {
                        "TokenNo": token,
                        "otp": form.value.term1 + form.value.term2 + form.value.term3 + form.value.term4,
                        "user_id": uid,
                        "password": form.value.pwd1,
                    };
                    console.log('data', data);
                    _this._api.POST('UpdatePasswordByOTP', data).subscribe(function (data) {
                        var resp = (JSON.parse(data.json).data);
                        console.log("resp", resp);
                        if (resp == undefined) {
                            //swal("<small>Invalid OTP entered</small>");
                            _this.ivotp = true;
                            _this.msg = false;
                            form.resetForm();
                        }
                        else {
                            _this.ivotp = false;
                            _this.msg = false;
                            swal("<small>OTP verified and Password changed successfully</small>");
                            form.resetForm();
                            _this.otp_modal1.nativeElement.click();
                            // this.router.navigate(['./account']);
                        }
                    });
                });
            }
            else {
                swal("<small>Password and confirm password should be same</small>");
            }
        }
        // console.log('bool',isValid);
        //console.log('upbotp',data);
    };
    HomeComponent.prototype.getSerBarPos = function () {
        var scrollPosition = window.pageYOffset;
        if (scrollPosition > 100) {
            return false;
        }
        else {
            return true;
        }
    };
    return HomeComponent;
}());
HomeComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'home',
                templateUrl: './home.component.html',
                styleUrls: ['./home.component.css']
                // providers:[ApiService]
            },] },
];
/** @nocollapse */
HomeComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: router_1.Router, },
    { type: app_component_1.AppComponent, },
    { type: core_1.ElementRef, },
]; };
HomeComponent.propDecorators = {
    'btn1': [{ type: core_1.ViewChild, args: ['btn1',] },],
    'otpM': [{ type: core_1.ViewChild, args: ['otpM',] },],
    'otp_modal': [{ type: core_1.ViewChild, args: ['otp_modal',] },],
    'otp_modal1': [{ type: core_1.ViewChild, args: ['otp_modal1',] },],
    'forget_password_modal': [{ type: core_1.ViewChild, args: ['forget_password_modal',] },],
    'inputEl': [{ type: core_1.ViewChild, args: ['someVar',] },],
    'save1': [{ type: core_1.ViewChild, args: ['save1',] },],
    'searchString1': [{ type: core_1.ViewChild, args: ['searchString',] },],
};
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map