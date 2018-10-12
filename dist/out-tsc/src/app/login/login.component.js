"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var router_1 = require("@angular/router");
var newLocal = 'USERNAME';
var LoginComponent = (function () {
    //private cookieWithUsername:any;
    //private cookieWithPassword:any;
    //private rememberMe:any;
    function LoginComponent(_api, router, rou) {
        this.router = router;
        this.rou = rou;
        this.ivup = false;
        this.tmp = true;
        this.fp = false;
        this.votp = false;
        this.cp = false;
        this.user = [];
        this.msg = false;
        this.mobilenoExists = false;
        this.ivotp = false;
        this.otps = false;
        this.sotp = false;
        this.fotp = false;
        this.ivAuth = false;
        this._api = _api;
        this.tokenCheck();
        this.router = router;
        this.rou = rou;
        //get cookies
        /*this.cookieWithUsername = this._cookieService.get(newLocal);
        this.cookieWithPassword = this._cookieService.get('PASSWORD');
        this.rememberMe = this._cookieService.get('RM');*/
        //remove cookies
        /*this._cookieService.remove(newLocal);
        this._cookieService.remove('PASSWORD');
        this._cookieService.remove('RM');*/
        //swal("hello");
    }
    LoginComponent.prototype.ngOnInit = function () {
        var params = this.rou.snapshot.params;
        //console.log("myurl=",params.msg);
        this.msg1 = params.msg;
        window.scrollTo(0, 0);
    };
    /*  loginSubmit(form: any){
    //console.log(form);
      let data={
          "TokenNo":"",
          "login_username":form.email,
            "password":form.password1
    
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
    /*  this._api.getToken().subscribe(
        token => {
          data.TokenNo=token;
    this._api.POST('GetLoginUser',data).subscribe(data =>{
      let res=JSON.parse(data.json).data;
            if(res==undefined){
                this.ivup=true;
                console.log("Invalid authentication");
               //this.revert(form);
              }else{
              
              this.user_name=res[0].user_name;
              if(this.user_name!=null){
               // console.log(this.token+" logged in successfully");
                localStorage.setItem('token',res[0].user_cd);
                localStorage.setItem('user',JSON.stringify(res[0]));
                //get temp cart data
                this.getCartData();
               
                if(!isNaN(this.user_name)){
                  this.router.navigate(['./account']);
                }
                if(JSON.parse(localStorage.getItem('tests'))=== null){
                  this.router.navigate(['./book']);
                }else{
                 let tests= JSON.parse(localStorage.getItem('tests'));
                 let sel_members=[];
                 let sel_locations=[];
                 let user=res[0];
                 if(tests.length > 0){
                  tests.forEach(element => {
                    
                    if(sel_members[element.tid]==undefined||sel_members[element.tid]==[]){
                      sel_members[element.tid]=user;
                    }
                    if(sel_locations[element.tid]==undefined){
                      sel_locations[element.tid]=user.user_address;
                     // this.sel_locations[element.tid]="Plot #119,Road No 10,Jubliee Hills";
                    }
                 
                });
                   localStorage.setItem('sel_members',JSON.stringify(sel_members));
                   localStorage.setItem('sel_locations',JSON.stringify(sel_locations));
                 }
                 
                  this.router.navigate(['./cart']);
                }
                
                console.log("logged in successfully");
              }else{
                this.ivup=true;
                ///this.revert(form);
                console.log("invalid authentication");
                 
              }
              this.uid=res[0].uid;
              }
     });
    });
     
  }*/
    LoginComponent.prototype.reset = function (form) {
        form.resetForm();
        //this.fotp=false;
    };
    LoginComponent.prototype.loginSubmit = function (form, isValid) {
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
                        //swal("<small>Invalid Authentication.</small>");
                        _this.ivAuth = true;
                        form.resetForm();
                    }
                    else {
                        //console.log('res',res);
                        if (res[0].user_token != null) {
                            localStorage.setItem('token', res[0].user_token);
                            var nk = res[0].user_name.split(" ");
                            res[0].firstname = nk[0];
                            res[0].lastname = nk[1];
                            localStorage.setItem('user', JSON.stringify(res[0]));
                            //get temp cart data
                            // this.getCartData();
                            if (res[0].user_address == "NA") {
                                _this.router.navigate(['./account']);
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
                    }
                });
            });
        }
        else {
            console.log("");
        }
    };
    LoginComponent.prototype.revert = function (form) {
        form.reset();
    };
    LoginComponent.prototype.save = function (form, isValid) {
        var _this = this;
        //console.log(isValid);
        var data = {
            "TokenNo": 'SomeTokenHere',
            "Mobile": form.value.Mobile,
            "password": form.value.password
        };
        //console.log(data);
        if (isValid) {
            this._api.getToken().subscribe(function (token) {
                data.TokenNo = token;
                _this._api.POST('AccountCreation', data).subscribe(function (data) {
                    _this.result = (JSON.parse(data.json).data);
                    //this.result = reslt[0].id;
                    if (_this.result == undefined) {
                        // this.msg = "Mobile number already exists";
                        swal("Mobile number already exists");
                        form.resetForm();
                        //window.location.reload();
                    }
                    else {
                        _this.result = (JSON.parse(data.json).data);
                        if (_this.result[0].id != null) {
                            //this.msg = "Account created successfully";
                            //window.alert("Account created");
                            swal("Account created!");
                            form.resetForm();
                            //window.location.reload();
                        }
                        else {
                            window.alert("failed to create an account");
                            form.resetForm();
                        }
                    }
                });
            });
        }
        else {
        }
    };
    LoginComponent.prototype.register = function (form, isValid) {
        var _this = this;
        var data = {
            "TokenNo": 'SomeTokenHere',
            "Mobile": form.value.mobile,
            "customer_name": form.value.first_name + ' ' + form.value.last_name
        };
        //console.log("data",data);
        if (isValid) {
            //console.log("true");
            this._api.getToken().subscribe(function (token) {
                data.TokenNo = token;
                _this._api.POST('AccountCreation', data).subscribe(function (data) {
                    _this.result = (JSON.parse(data.json).data);
                    console.log('reg', _this.result);
                    if (_this.result == undefined) {
                        //swal("<small>Mobile Number already exists</small>");
                        _this.mobilenoExists = true;
                        form.resetForm();
                    }
                    else {
                        _this.phoneNo = form.value.mobile;
                        form.resetForm();
                        _this.uid = _this.result[0].id;
                        var str = _this.result[0].message;
                        var otpStr = str.substr(str.length - 5);
                        _this.otpString = otpStr.replace(otpStr.substring(0, 2), 'XX');
                        _this.msg = true;
                        _this.mobilenoExists = false;
                        console.log("Otp sent to your registered mobile number");
                        _this.btn1.nativeElement.setAttribute("data-target", "#otp_modal");
                        _this.btn1.nativeElement.setAttribute("type", "button");
                        //console.log(this.btn1.nativeElement);
                        _this.btn1.nativeElement.click();
                    }
                });
            });
        }
    };
    LoginComponent.prototype.UpdatePasswordByOTP = function (form, isValid) {
        var _this = this;
        if (isValid) {
            if (form.value.pwd == form.value.cpwd) {
                this._api.getToken().subscribe(function (token) {
                    var data = {
                        "TokenNo": token,
                        "otp": form.value.term1 + form.value.term2 + form.value.term3 + form.value.term4,
                        "user_id": form.value.user_id,
                        "password": form.value.pwd,
                    };
                    _this._api.POST('UpdatePasswordByOTP', data).subscribe(function (data) {
                        var resp = (JSON.parse(data.json).data);
                        console.log("resp", resp);
                        if (resp == undefined) {
                            //swal("<small>Invalid OTP entered</small>");
                            _this.ivotp = true;
                            _this.msg = false;
                            // form.resetForm();
                        }
                        else {
                            //this.otps = true;
                            _this.ivotp = false;
                            _this.msg = false;
                            //swal("<small>Account created successfully</small>");
                            var data_1 = {
                                "TokenNo": "",
                                "login_username": form.value.Mobile2,
                                "password": form.value.pwd
                            };
                            form.resetForm();
                            //this.otp_modal.nativeElement.click();
                            //this.router.navigate(['./account']);
                            _this._api.getToken().subscribe(function (token) {
                                data_1.TokenNo = token;
                                _this._api.POST('GetLoginUser', data_1).subscribe(function (data) {
                                    var res = JSON.parse(data.json).data;
                                    //console.log('res',res);
                                    if (res == undefined) {
                                    }
                                    else {
                                        if (res[0].user_token != null) {
                                            localStorage.setItem('token', res[0].user_token);
                                            localStorage.setItem('user', JSON.stringify(res[0]));
                                            if (res[0].user_address == "NA") {
                                                _this.router.navigate(['./account']);
                                                window.location.reload();
                                            }
                                        }
                                        else {
                                            console.log("Invalid authentication");
                                        }
                                    }
                                });
                            });
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
    LoginComponent.prototype.UpdatePasswordByOTP1 = function (form, isValid, uid) {
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
                            // form.resetForm();
                            _this.ivotp = true;
                            _this.msg = false;
                        }
                        else {
                            _this.ivotp = false;
                            _this.msg = false;
                            swal("<small>Password updated successfully</small>");
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
    LoginComponent.prototype.reset1 = function (form) {
        form.resetForm();
        this.otpM.nativeElement.removeAttribute("data-target");
        this.otpM.nativeElement.setAttribute("type", "submit");
    };
    LoginComponent.prototype.reset2 = function (form) {
        form.resetForm();
        this.btn1.nativeElement.removeAttribute("data-target");
        this.btn1.nativeElement.setAttribute("type", "submit");
    };
    LoginComponent.prototype.resendOTP = function (mobile) {
        var _this = this;
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
    LoginComponent.prototype.tokenCheck = function () {
        if (localStorage.getItem("token") === null) {
            this.token = null;
        }
        else {
            this.token = localStorage.getItem("token");
        }
    };
    LoginComponent.prototype.fp1 = function () {
        this.tmp = false;
        this.fp = true;
    };
    /*  getForgotPassword(form:any){
    
      /*    let data ={
          'TokenNo':'SomeTokenHere',
          'mobile':form.Mobile
        }*/
    /*this._api.getToken().subscribe(
      token => {
        form.TokenNo=token;
       
    this._api.POST('GetForgotPassword', form).subscribe(data =>{
       let response=(JSON.parse(data.json).data);
       //console.log(response[0].mobile);
         if(response[0].mobile!=null){
           this.fp=false;
           this.votp=true;
          }else{
           window.alert("failed to send OTP");
          }
          this.uid = response[0].uid;
      
       });
      });
       
  }*/
    LoginComponent.prototype.getForgotPassword = function (form, isValid) {
        var _this = this;
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
                            _this.phneNo = response[0].mobile;
                            /*this.fp=false;
                             this.votp=true;*/
                            _this.sotp = true;
                            _this.fotp = false;
                            form.resetForm();
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
                        }
                    }
                });
            });
        }
    };
    /*  getOtpVerification(form:any){
        this._api.getToken().subscribe(
          token => {
            form.TokenNo=token;
        this._api.POST('GetOtpVerification', form).subscribe(data =>{
           let resp=(JSON.parse(data.json).data);
         //  console.log(resp[0].uid);
          
             if(resp[0].uid!=null){
              this.cp =true;
              this.votp=false;
                //this.router.navigate(['./book']);
              }else{
               window.alert("failed to login");
              }
          
           });
          });
      }*/
    LoginComponent.prototype.getOtpVerification = function (form, isValid) {
        var _this = this;
        /*if(isValid){
  
        }else{
  
        }*/
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
                        /*this.cp =true;
                        this.votp=false;*/
                        swal("<small>OTP verified successfully</small>");
                        form.resetForm();
                        //this.router.navigate(['./book']);
                    }
                    else {
                        //window.alert("failed to login");
                        swal("OTP verification failed");
                        form.resetForm();
                    }
                }
            });
        });
    };
    LoginComponent.prototype.changePassword = function (form, isValid) {
        if (isValid) {
            var data = {
                "TokenNo": "",
                "user_id": form.value.user_id,
                "password": form.value.password
            };
            console.log(data);
        }
        else {
        }
        /*this._api.getToken().subscribe(
          token => {
            data.TokenNo=token;
           this._api.POST('ChangePassword',data).subscribe(data =>{
            this.user=JSON.parse(data.json).data;
            console.log("Password changed Successfully");
            window.location.reload();
           });
          });*/
    };
    LoginComponent.prototype.loggedOut = function () {
        //console.log('rrr',localStorage.getItem('user'));
        if (localStorage.getItem('user') !== null) {
            var tlist = [];
            var ftids = [];
            var quant = [];
            tlist = JSON.parse(localStorage.getItem('tests'));
            if (tlist !== null) {
                if (tlist.length > 0) {
                    console.log(tlist);
                    for (var ttest in tlist) {
                        ftids.push(tlist[ttest].tid);
                        quant.push(tlist[ttest].quant);
                    }
                    // console.log(ftids,quant);
                    this.saveCartData(ftids, quant);
                    localStorage.removeItem('tests');
                }
            }
            else {
                console.log("del");
                this.saveCartClearData();
            }
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.clear();
        }
    };
    LoginComponent.prototype.saveCartClearData = function () {
        var _this = this;
        var req_data = {
            "TokenNo": "",
            "test_id": "0",
            "uid": JSON.parse(localStorage.getItem('user')).uid,
            "quantity": "0",
            "loc_id": "1",
            "status": "C",
            "is_wishlist": 2
        };
        this._api.getToken().subscribe(function (token) {
            req_data.TokenNo = token;
            _this._api.POST('AddtoWishList', req_data).subscribe(function (data) {
                var resp = (JSON.parse(data.json).data);
                //console.log(resp);
            });
        });
    };
    LoginComponent.prototype.saveCartData = function (ftids, quant) {
        var _this = this;
        var req_data = {
            "TokenNo": "",
            "test_id": ftids.join(),
            "uid": JSON.parse(localStorage.getItem('user')).uid,
            "loc_id": "1",
            "status": "A",
            "quantity": quant.join(),
            "is_wishlist": 2
        };
        this._api.getToken().subscribe(function (token) {
            req_data.TokenNo = token;
            _this._api.POST('AddtoWishList', req_data).subscribe(function (data) {
                var resp = (JSON.parse(data.json).data);
                //console.log(resp);
            });
        });
    };
    LoginComponent.prototype.getCartData = function () {
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
                        console.log(k);
                        localStorage.setItem('tests', JSON.stringify(k));
                        _this.router.navigate(['./cart']);
                    }
                }
                else if (k.length > 0) {
                    localStorage.setItem('tests', JSON.stringify(k));
                    _this.router.navigate(['./cart']);
                }
                else {
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
    LoginComponent.prototype.autoTab = function (event) {
        if (event.target.value.length >= event.target.maxLength && event.target.nextElementSibling)
            event.target.nextElementSibling.focus();
    };
    LoginComponent.prototype.autoTab1 = function (event, pwd) {
        if (event.target.value.length >= pwd)
            this.inputEl.nativeElement.focus();
    };
    LoginComponent.prototype.autoTab2 = function (event, pwd) {
        if (event.target.value.length >= pwd)
            this.upbOTP.nativeElement.focus();
    };
    return LoginComponent;
}());
LoginComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.css']
            },] },
];
/** @nocollapse */
LoginComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: router_1.Router, },
    { type: router_1.ActivatedRoute, },
]; };
LoginComponent.propDecorators = {
    'btn1': [{ type: core_1.ViewChild, args: ['btn1',] },],
    'otpM': [{ type: core_1.ViewChild, args: ['otpM',] },],
    'otp_modal': [{ type: core_1.ViewChild, args: ['otp_modal',] },],
    'otp_modal1': [{ type: core_1.ViewChild, args: ['otp_modal1',] },],
    'forget_password_modal': [{ type: core_1.ViewChild, args: ['forget_password_modal',] },],
    'upbOTP': [{ type: core_1.ViewChild, args: ['upbOTP',] },],
    'inputEl': [{ type: core_1.ViewChild, args: ['createAcc',] },],
};
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map