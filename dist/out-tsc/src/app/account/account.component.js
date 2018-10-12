"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var app_component_1 = require("../app.component");
var router_1 = require("@angular/router");
var AccountComponent = (function () {
    // Initialized to specific date (09.10.2018)
    function AccountComponent(router, _api, _appComponent, activerouter) {
        this.router = router;
        this.activerouter = activerouter;
        this.billDetails = [];
        this.user = [];
        this.userInfo = [];
        this.obj = [];
        this.sw = false;
        this.basicInfo = true;
        this.editFlag = false;
        this.newArray = [];
        this.members = [];
        this.ms2 = false;
        this.ms1 = true;
        this.ms7 = false;
        this.member = [];
        this.ms3 = true;
        this.ms4 = false;
        this.ms6 = false;
        this.address = [];
        this.ms5 = false;
        this.locations = [];
        this.areas = [];
        this.cities = [];
        this.location = [];
        this.pwc = 0;
        this.upm = false;
        this.fam = false;
        this.uam = false;
        this.fmem = false;
        this.fms = [];
        this.editBtn = true;
        this.defaultLocation = [];
        this.defaultAddress = [];
        this.loading = [];
        this.config = {
            id: 'custom',
            itemsPerPage: 9,
            currentPage: 1
        };
        this.ph = false;
        this.otpBtn = false;
        this.svBtn = true;
        this.otp = false;
        this.vBtn = false;
        this.otherflag = false;
        this.date = new Date();
        this.myOptions = {
            // other options...
            dateFormat: 'dd-mm-yyyy',
            disableSince: { year: this.date.getUTCFullYear(), month: this.date.getUTCMonth() + 1, day: this.date.getUTCDate() + 1 }
        };
        this.myOptions1 = {
            // other options...
            dateFormat: 'yyyy-mm-dd',
            disableSince: { year: this.date.getUTCFullYear(), month: this.date.getUTCMonth() + 1, day: this.date.getUTCDate() + 1 }
        };
        this._api = _api;
        this._appComponent = _appComponent;
        this.user = JSON.parse(localStorage.getItem("user"));
        this.login_id = this.user.uid;
        this.orderhistory = this.activerouter.snapshot.paramMap.get('any');
        // this.setDate();
        // console.log('uu',this.user);
        this.loading['account'] = true;
        this.getRecData();
        var mobile = JSON.parse(localStorage.getItem("user_mobile"));
        console.log('mob', mobile);
    }
    AccountComponent.prototype.setDate = function () {
        if (this.user.user_dob) {
            // console.log(this.user.user_dob);
            var tdate = void 0;
            if (this.user.user_dob !== null || this.user.user_dob !== '') {
                tdate = this.user.user_dob.split("/");
            }
            else {
                tdate = new Date();
            }
            this.model = { date: { year: tdate[2], month: tdate[1], day: tdate[0] } }; //assign date to date-picker
            //console.log(this.model);
        }
    };
    AccountComponent.prototype.getRecData = function () {
        this.getUserLocation(this.user.uid, 0);
        this.getCities();
        this.getUserDetails();
        this._appComponent.setFlag();
    };
    AccountComponent.prototype.ngOnInit = function () {
        this.tmp = 1;
        // console.log('user=',this.user);
        this.getFamilyMembers(this.user.uid);
        this.getHistory();
        window.scrollTo(0, 0);
    };
    AccountComponent.prototype.ngAfterViewInit = function () {
        if (this.orderhistory == 'order-history') {
            this.oh.nativeElement.click();
        }
        //  this.oh.nativeElement.click();
    };
    AccountComponent.prototype.getHistory = function () {
        var _this = this;
        this.loading['getBills'] = true;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetFinalizedOrderHistory', { TokenNo: token, 'patientid': _this.user.uid, 'mobileno': '' }).subscribe(function (data) {
                if (data.status == 1) {
                    var a = JSON.parse(data.json).data;
                    _this.myFinalizedOrders = _this.getArrayHumanDate(a);
                    _this.loading['getBills'] = false;
                }
                else {
                    _this.myFinalizedOrders = [];
                    _this.loading['getBills'] = false;
                }
                _this.myFinalizedOrders2 = _this.myFinalizedOrders;
            });
        });
    };
    AccountComponent.prototype.getArrayHumanDate = function (arr) {
        var _this = this;
        var b = [];
        var i = 0;
        arr.forEach(function (element) {
            b.push(element);
            b[i]['order_date'] = _this.getHumanDateWithSec(element.order_date);
            ++i;
        });
        return b;
    };
    AccountComponent.prototype.getHumanDateWithSec = function (date) {
        // var t = new Date(1970, 0, 1); // Epoch
        // t.setSeconds(secs);
        // return t;
        date = date.replace("/Date(", "");
        date = date.replace(")/", "");
        date = date.split("+");
        var hr = date[1].substring(0, 2) * 60 * 1000;
        var min = date[1].substring(2, 4) * 60 * 1000;
        var fdt = parseInt(date[0]) + hr + min;
        var theDate = new Date(fdt);
        var dateString = theDate.toUTCString();
        return new Date(dateString).toString().replace(" GMT+0530 (India Standard Time)", "");
        //return dateString.toString().replace(" GMT+0530 (India Standard Time)","");
    };
    AccountComponent.prototype.getUserDetails = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem("user"));
        // this.obj = JSON.parse(this.user);
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetUserDetails', { TokenNo: token, 'user_id': _this.user.uid }).subscribe(function (data) {
                _this.userInfo = JSON.parse(data.json).data;
                //console.log(this.userInfo[0]);
                if (_this.userInfo) {
                    _this.user = _this.userInfo[0];
                    if (_this.user.user_dob !== null) {
                        _this.user.user_dob = _this.getHumanDate(_this.user.user_dob);
                        _this.setDate();
                    }
                    console.log(_this.user);
                    if (_this.user.user_name !== null && _this.user.user_name !== '' && _this.user.user_name !== 'null') {
                        _this.user.user_name = _this.user.user_name.split(' ');
                    }
                    else {
                        _this.user.user_name = [];
                        _this.user.user_name[0] = "";
                        _this.user.user_name[1] = "";
                    }
                    _this.user['firstname'] = _this.user.user_name[0];
                    _this.user['lastname'] = _this.user.user_name[1];
                    _this.loading['account'] = false;
                }
                localStorage.setItem('user', JSON.stringify(_this.userInfo[0]));
                localStorage.setItem('user_mobile', JSON.stringify(_this.user.user_phone));
                _this._appComponent.setFlag();
                //console.log(this.getHumanDate(this.user.user_dob));
            });
        });
    };
    AccountComponent.prototype.other = function (attrib) {
        if (attrib == 'title') {
            this.otherflag = false;
        }
        else {
            this.otherflag = true;
        }
    };
    AccountComponent.prototype.editOther = function (attrib) {
        // alert(attrib);
        if (attrib == 'title') {
            this.othereditflag = false;
        }
        else {
            this.othereditflag = true;
        }
    };
    AccountComponent.prototype.parseDate = function (date) {
        console.log(date);
        if (date.formatted == undefined) {
            date = date.date.year + '-' + date.date.month + '-' + date.date.day;
            //date=date.date.day+'-'+date.date.month+'-'+date.date.year;
        }
        else {
            date = date.formatted;
            date = date.split("-");
            date = date[2] + '-' + date[1] + '-' + date[0];
        }
        return date;
    };
    AccountComponent.prototype.parseDateUpdate = function (date) {
        if (date.formatted == undefined) {
            date = date.year + '-' + date.month + '-' + date.day;
            //date=date.day+'-'+date.month+'-'+date.year;  
        }
        else {
            date = date.formatted;
            date = date.split("-");
            date = date[2] + '-' + date[1] + '-' + date[0];
        }
        return date;
    };
    AccountComponent.prototype.updateProfile = function (profileInfo, isValid) {
        var _this = this;
        console.log('update Profile', profileInfo.value);
        profileInfo.value.user_dob = this.parseDate(profileInfo.value.user_dob);
        // console.log('form',profileInfo.value);
        if (isValid) {
            this._api.getToken().subscribe(function (token) {
                profileInfo.value.TokenNo = token;
                profileInfo.value.user_name = profileInfo.value.first_name + ' ' + profileInfo.value.last_name;
                _this._api.POST('UpdateFamilyMembers', profileInfo.value).subscribe(function (data) {
                    _this.user = JSON.parse(data.json).data;
                    //this.upm=true;
                    _this.user[0].uid = _this.user[0].id;
                    _this.user = _this.user[0];
                    localStorage.setItem('user', JSON.stringify(_this.user));
                    _this._appComponent.setFlag();
                    _this.editBtn = true;
                    _this.editFlag = false;
                    _this.basicInfo = true;
                    //swal("Profile updated");
                    _this.profileMsg = true;
                    _this.getRecData();
                    //window.location.reload();
                });
            });
            //console.log('default Loc',this.defaultLocation);
            //default address
            if (this.locations.length == 0) {
                // doorNo...streetNo
                //profileInfo.value.title_id3 = 0;
                if (profileInfo.value.title_id3 == 3) {
                    this.address1 = profileInfo.value.other + ',' + profileInfo.value.doorNo + ',' + profileInfo.value.streetNo;
                }
                else {
                    this.address1 = profileInfo.value.doorNo + ',' + profileInfo.value.streetNo;
                }
                this._api.getToken().subscribe(function (token) {
                    var data = {
                        'TokenNo': token,
                        'title_id': profileInfo.value.title_id3,
                        'user_id': profileInfo.value.user_id,
                        'address': _this.address1,
                        'area_id': profileInfo.value.area_id,
                        'city_id': profileInfo.value.city_id
                    };
                    //console.log('data1',data);
                    console.log('address', data);
                    _this._api.POST('AddUserAddress', data).subscribe(function (data) {
                        _this.address = JSON.parse(data.json).data;
                        console.log('address', _this.address);
                        //this.uam=true;
                        //this.getUserLocation(this.user.uid,0);
                    });
                });
            }
            else {
                if (profileInfo.value.title_id3 == 3) {
                    this.address1 = profileInfo.value.other + ',' + profileInfo.value.doorNo + ',' + profileInfo.value.streetNo;
                }
                else {
                    this.address1 = profileInfo.value.doorNo + ',' + profileInfo.value.streetNo;
                }
                this._api.getToken().subscribe(function (token) {
                    var data = {
                        'TokenNo': token,
                        'title': profileInfo.value.title_id3,
                        'user_id': profileInfo.value.user_id,
                        'user_loc_id': profileInfo.value.user_loc_id,
                        'address': _this.address1,
                        'area_id': profileInfo.value.area_id,
                        'city_id': profileInfo.value.city_id
                    };
                    console.log('data1', data);
                    _this._api.POST('UpdateUserAddress', data).subscribe(function (data) {
                        _this.address = JSON.parse(data.json).data;
                        // this.uam=true;
                        _this.getUserLocation(_this.user.uid, 0);
                        console.log("User address updated");
                    });
                });
            }
        }
        else {
        }
    };
    AccountComponent.prototype.showHide = function (num) {
        this.tmp = num;
    };
    AccountComponent.prototype.autoTab = function (event) {
        if (event.target.value.length >= event.target.maxLength && event.target.nextElementSibling)
            event.target.nextElementSibling.focus();
    };
    /*  changePassword(form: NgForm, isValid: boolean,uid:number){
    
        if(isValid){
         //console.log('form',form.value);
         this._api.getToken().subscribe(
          token => {
            //form.value.TokenNo = token;
            //form.value.user_id=uid;
           
             //form.resetForm();
         this._api.POST('ChangePassword',form.value).subscribe(data =>{
          let res=JSON.parse(data.json).data;
          //console.log("res",res);
    
                if(res == undefined){
                    console.log("data undefined");
                     swal("Invalid current password");
                     form.resetForm();
                    //this.pwc=2;
    
                   
                }else{
                  //console.log(this.user);
                  if(form.value.oldpassword !== form.value.newpassword){
    
                          if(JSON.parse(data.json).status==1){
                           // this.pwc=1;
                            swal("Password Changed Successfully");
                             form.resetForm();
                          }else{
                           // this.pwc=2;
                            swal("Invalid User/Current Password");
                             form.resetForm();
                          }
    
                          console.log("Password changed Successfully");
                         //window.location.reload();
                         this._appComponent.toLogout();
                         this.router.navigate(['./home']);
                       }else{
                        //this.pwc=3;
                        swal("Old and new passwords must be different");
                        form.resetForm();
    
                        console.log("Old password and new pwd should not be same");
                       }
    
                }
                //form.resetForm();
          
         });
    
        });
       }else{
    
       }
    
      }*/
    /*    changePassword(form: NgForm, isValid: boolean,uid:number){
    
        if(isValid){
    
        // console.log('form',form.value);
         this._api.getToken().subscribe(
          token => {
            let data = {
            "TokenNo":token,
            "user_id":uid,
            "oldpassword":form.value.oldpassword,
            "newpassword":form.value.newpassword,
            }
            //form.value.TokenNo = token;
            //form.value.user_id=uid;
           console.log('dataa1',data);
             //form.resetForm();
         this._api.POST('ChangePassword',data).subscribe(data =>{
          let res=JSON.parse(data.json).data;
        
                if(res == undefined){
                    console.log("data undefined");
                     swal("Invalid current password");
                     form.resetForm();
                    //this.pwc=2;
    
                   
                }else{
                  //console.log(this.user);
                  if(form.value.oldpassword !== form.value.newpassword){
    
                          if(JSON.parse(data.json).status==1){
                           // this.pwc=1;
                            swal("Password Changed Successfully");
                             form.resetForm();
                          }else{
                           // this.pwc=2;
                            swal("Invalid User/Current Password");
                             form.resetForm();
                          }
    
                          console.log("Password changed Successfully");
                         //window.location.reload();
                         this._appComponent.toLogout();
                         this.router.navigate(['./home']);
                       }else{
                        //this.pwc=3;
                        swal("Old and new passwords must be different");
                        form.resetForm();
    
                        console.log("Old password and new pwd should not be same");
                       }
    
                }
                //form.resetForm();
          
         });
    
        });
       }else{
    
       }
    
      }*/
    AccountComponent.prototype.changePassword = function (form, isValid, uid) {
        var _this = this;
        if (isValid) {
            // console.log('form',form.value);
            this._api.getToken().subscribe(function (token) {
                var data = {
                    "TokenNo": token,
                    "user_id": uid,
                    "oldpassword": form.value.oldpassword,
                    "newpassword": form.value.newpassword,
                };
                //form.value.TokenNo = token;
                //form.value.user_id=uid;
                //form.resetForm();
                _this._api.POST('ChangePassword', data).subscribe(function (data) {
                    var res = JSON.parse(data.json).data;
                    if (res == undefined) {
                        console.log("data undefined");
                        swal("Invalid current password");
                        form.resetForm();
                        //this.pwc=2;
                    }
                    else {
                        //console.log(this.user);
                        if (form.value.oldpassword !== form.value.newpassword) {
                            if (JSON.parse(data.json).status == 1) {
                                // this.pwc=1;
                                swal("Password Changed Successfully");
                                form.resetForm();
                            }
                            else {
                                // this.pwc=2;
                                swal("Invalid User/Current Password");
                                form.resetForm();
                            }
                            console.log("Password changed Successfully");
                            //window.location.reload();
                            _this._appComponent.toLogout();
                            _this.router.navigate(['./home']);
                        }
                        else {
                            //this.pwc=3;
                            swal("Old and new passwords must be different");
                            form.resetForm();
                            console.log("Old password and new pwd should not be same");
                        }
                    }
                    //form.resetForm();
                });
            });
        }
        else {
        }
    };
    /* reset(form:NgForm){
         form.resetForm();
     }*/
    AccountComponent.prototype.revert = function (form) {
        form.reset();
    };
    AccountComponent.prototype.editInfo = function () {
        var _this = this;
        this.editFlag = true;
        this.basicInfo = false;
        this.editBtn = false;
        if (this.locations.length != 0) {
            this.locations.forEach(function (element) {
                _this.getAreaByCity1(element.city_id);
            });
        }
        if (this.locations.length == 0) {
            this.fld = true;
        }
        else {
            this.fld = false;
        }
        //this.getAreaByCity1(this.defaultLocation[0].city_id);
        /*this.basicInfo=!this.basicInfo;
        this.editFlag=!this.editFlag;*/
    };
    AccountComponent.prototype.getFamilyMembers = function (uid) {
        var _this = this;
        var fm_dob;
        this.fms = [];
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetFamilyMembers', { TokenNo: token, 'user_id': uid }).subscribe(function (data) {
                _this.members = JSON.parse(data.json).data;
                if (_this.members) {
                    _this.members.forEach(function (element) {
                        console.log('user_dob', element.user_dob);
                        fm_dob = _this.getHumanDate(element.user_dob);
                        var fm_dob1 = fm_dob.split('/');
                        var date = fm_dob1[2] + '-' + fm_dob1[1] + '-' + fm_dob1[0];
                        element.age = _this.getAge(date);
                        if (element.user_name) {
                            var userName = element.user_name.split(' ');
                            element.firstname = userName[0];
                            element.lastname = userName[1];
                        }
                    });
                }
                else {
                    _this.members = [];
                }
                //this.members.push(this.newArray);
                //console.log('members',this.members);
            });
        });
    };
    AccountComponent.prototype.changeDate = function (event) {
        console.log(event.target.value);
        var memAge = this.getAge(event.target.value);
        var a = memAge.split(' ');
        if (a[0] >= 18) {
            this.ph = true;
        }
        else {
            this.ph = false;
        }
    };
    AccountComponent.prototype.onDateChanged = function (event) {
        //yyyy-dd-mm
        // console.log('kk',event.formatted);//
        var memAge = this.getAge(event.formatted); //yyyy/mm/dd
        var a = memAge.split(' ');
        console.log('memA', memAge);
        if (a[0] >= 18) {
            this.ph = true;
        }
        else {
            this.ph = false;
        }
    };
    AccountComponent.prototype.deleteAddress = function (loc) {
        var _this = this;
        console.log('loc=', loc.user_loc_id);
        if (window.confirm("Do you really want to delete Address?")) {
            this._api.getToken().subscribe(function (token) {
                _this._api.POST('DeleteUserAddress', { TokenNo: token, 'user_loc_id': loc.user_loc_id }).subscribe(function (data) {
                    var resp = JSON.parse(data.json).data;
                    console.log('dA', resp[0]);
                    if (resp[0] == undefined) {
                        console.log("undefined");
                    }
                    else {
                        window.alert(resp[0].message);
                        _this.getUserLocation(_this.user.uid, 0);
                    }
                });
            });
        }
    };
    AccountComponent.prototype.deleteFM = function (mem) {
        var _this = this;
        console.log(mem);
        if (window.confirm("Do you really want to delete?")) {
            this._api.getToken().subscribe(function (token) {
                _this._api.POST('DeleteFamilyMember', { TokenNo: token, 'user_id': mem.uid }).subscribe(function (data) {
                    var res = JSON.parse(data.json).data;
                    console.log('dF', res[0]);
                    if (res[0] == undefined) {
                        console.log("undefined");
                    }
                    else {
                        window.alert(res[0].message);
                        _this.getFamilyMembers(_this.user.uid);
                    }
                });
            });
        }
    };
    /* getAge(dob:any)
        {
           if(dob){
                 let birthday = new Date(dob).getTime();
                 let today = new Date().getTime();
                 let ag = ((today - birthday) / (31557600000));
                 let ag1 = Math.floor( ag );
                 // console.log('ag1',ag1);
                 return ag1;
               }
        }*/
    AccountComponent.prototype.getAge = function (dateString) {
        //console.log('dateString'+dateString);
        var birthdate = new Date(dateString).getTime();
        var now = new Date().getTime();
        // now find the difference between now and the birthdate
        var n = (now - birthdate) / 1000;
        if (n < 604800) {
            var day_n = Math.floor(n / 86400);
            return day_n + ' day' + (day_n > 1 ? 's' : '');
        }
        else if (n < 2629743) {
            var week_n = Math.floor(n / 604800);
            return week_n + ' week' + (week_n > 1 ? 's' : '');
        }
        else if (n < 63113852) {
            var month_n = Math.floor(n / 2629743);
            return month_n + ' month' + (month_n > 1 ? 's' : '');
        }
        else {
            var year_n = Math.floor(n / 31556926);
            return year_n + ' year' + (year_n > 1 ? 's' : '');
        }
    };
    AccountComponent.prototype.diff_months = function (dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7 * 4);
        return Math.abs(Math.round(diff));
    };
    AccountComponent.prototype.getHumanDate = function (date) {
        date = date.replace("/Date(", "");
        date = date.replace(")/", "");
        date = date.split("+");
        var hr = date[1].substring(0, 2) * 60 * 1000;
        var min = date[1].substring(2, 4) * 60 * 1000;
        var fdt = parseInt(date[0]) + hr + min;
        var theDate = new Date(fdt);
        console.log(theDate);
        var dateString = theDate.toUTCString();
        var date1 = theDate.getDate().toString() + '/' + (theDate.getMonth() + 1).toString() + '/' + theDate.getFullYear().toString();
        return date1;
        //console.log(date1);
    };
    AccountComponent.prototype.addFM = function () {
        this.ms2 = true;
        this.ms1 = false;
    };
    /*
      saveFamilyMembers(mem:NgForm,isValid:boolean, uid:number){
    
      if(isValid){
        mem.value.user_id = uid;
        this._api.getToken().subscribe(
          token => {
           mem.value.TokenNo=token;
        this._api.POST('AddFamilyMembers', mem.value).subscribe(data =>{
            let mems=JSON.parse(data.json).data;
            //console.log(mems);
            // this.fam = true;
             //window.location.reload
            this.add_family.nativeElement.click();
            swal("<small>Family member added successfully</small>");
            mem.resetForm();
            console.log("family member added");
            this.getFamilyMembers(this.user.uid);
           });
          });
    
        }else{
    
        }
      
       }*/
    /*saveFamilyMembers(mem:NgForm,isValid:boolean, uid:number){
  
      if(mem.value.term1){
        this.otpBtn = false;
         this.svBtn = false;
  
        this._api.getToken().subscribe(
        token => {
          let data = {
            TokenNo:token,
            otp:mem.value.term1,
            user_id:mem.value.user_id
          }
    
    this._api.POST('GetOtpVerification',data).subscribe(data =>{
         let resp=(JSON.parse(data.json).data);
    
           if(resp[0].uid!=null){
           
                  mem.value.user_id = uid;
            this._api.getToken().subscribe(
              token => {
               mem.value.TokenNo=token;
            this._api.POST('AddFamilyMembers', mem.value).subscribe(data =>{
                let mems=JSON.parse(data.json).data;
                
                swal("<small>Family member added successfully</small>");
                this.otp =false;
                mem.resetForm();
                this.getFamilyMembers(this.user.uid);
               });
              });
  
              
            }else{
            // window.alert("failed to login");
            }
       
         });
        });
  
      }else{
        let memAge = this.getAge(mem.value.user_dob);
        let a:any = memAge.split(' ');
        if(a[0] >=18){
            this.ph = true;
            this.otpBtn = true;
            this.svBtn = false;
  
                this._api.getToken().subscribe(
                  token => {
                      let data ={
                        'TokenNo':token,
                        'mobile':mem.value.user_mobile
                      }
                      this._api.POST('GetForgotPassword', data).subscribe(data =>{
                         let response=(JSON.parse(data.json).data);
                             console.log("response",response);
                             if(response == undefined){
                                  //mem.resetForm();
                             }else{
                                if(response[0].mobile!=null){
                                   /*this.fp=false;
                                    this.votp=true;*/
    /*   this.otp =true;
       this.vBtn=true;
        this.otpBtn = false;
         this.svBtn = false;
       // this.forget_password_modal.nativeElement.click();
        //swal("<small>OTP sent successfully</small>");
       this.uid = response[0].uid;

    }else{
     //window.alert("failed to send OTP");
     swal("<small>Failed to send OTP</small>");
    }

   
 }

});
});
}else{
this.ph=true;
mem.value.user_id = uid;
this._api.getToken().subscribe(
token => {
mem.value.TokenNo=token;
this._api.POST('AddFamilyMembers', mem.value).subscribe(data =>{
let mems=JSON.parse(data.json).data;

swal("<small>Family member added successfully</small>");
this.ph=false;
mem.resetForm();

this.getFamilyMembers(this.user.uid);
});
});


}

}



} */
    AccountComponent.prototype.saveFamilyMembers = function (mem, isValid, uid) {
        var _this = this;
        if (isValid) {
            var memAge = this.getAge(mem.value.user_dob.formatted);
            var a = memAge.split(' ');
            if (a[0] >= 18) {
                this.ph = true;
                // this.otpBtn = true;
                //this.svBtn = false;
                if (mem.value.user_mobile) {
                    mem.value.user_id = uid;
                    mem.value.user_name = mem.value.firstName + ' ' + mem.value.lastName;
                    this._api.getToken().subscribe(function (token) {
                        console.log('saveFamily', mem.value);
                        mem.value.TokenNo = token;
                        mem.value.user_dob = mem.value.user_dob.formatted;
                        console.log('memVal', mem.value);
                        _this._api.POST('AddFamilyMembers', mem.value).subscribe(function (data) {
                            var mems = JSON.parse(data.json).data;
                            console.log('mems', mems);
                            _this.mobileNumber = mem.value.user_mobile;
                            _this.mobileNumber = _this.mobileNumber.replace(_this.mobileNumber.substring(0, 7), 'XX');
                            swal("<small>OTP SENT successfully</small>");
                            mem.resetForm();
                            _this.add_family.nativeElement.click();
                            _this.otpModel.nativeElement.setAttribute("data-target", "#otp_model");
                            _this.otpModel.nativeElement.setAttribute('type', 'button');
                            _this.otpModel.nativeElement.click();
                            _this.ph = false;
                            _this.memId = mems[0].id;
                        });
                    });
                }
                else {
                    window.alert("Mobile number is required");
                }
            }
            else {
                this.ph = false;
                this._api.getToken().subscribe(function (token) {
                    // mem.value.TokenNo=token;
                    // mem.value.user_dob = mem.value.user_dob.formatted;
                    mem.value.user_name = mem.value.firstName + ' ' + mem.value.lastName;
                    var data = {
                        "TokenNo": token,
                        "user_dob": mem.value.user_dob.formatted,
                        "user_gender": mem.value.user_gender,
                        "user_id": uid,
                        "user_name": mem.value.user_name,
                        "user_email": mem.value.user_email,
                        "user_mobile": ''
                    };
                    console.log('data', data);
                    _this._api.POST('AddFamilyMembers', data).subscribe(function (data) {
                        var mems = JSON.parse(data.json).data;
                        swal("<small>Family member added successfully</small>");
                        _this.add_family.nativeElement.click();
                        _this.ph = false;
                        mem.resetForm();
                        _this.getFamilyMembers(_this.user.uid);
                    });
                });
            }
        }
        else {
            window.alert("Please fill all fields");
        }
    };
    AccountComponent.prototype.getMemberOtpVerification = function (form, isValid, memId) {
        var _this = this;
        console.log(form.value);
        if (isValid) {
            this._api.getToken().subscribe(function (token) {
                var data = {
                    "TokenNo": token,
                    "otp": form.value.term1 + form.value.term2 + form.value.term3 + form.value.term4,
                    "user_id": memId
                };
                _this._api.POST('GetMemberOtpVerification', data).subscribe(function (data) {
                    var resp = (JSON.parse(data.json).data);
                    console.log('resp', resp);
                    if (resp == undefined) {
                        swal("Invalid OTP");
                        form.resetForm();
                    }
                    else {
                        if (resp[0].uid != null) {
                            //this.votp=false;
                            swal("<small>OTP verified successfully</small>");
                            form.resetForm();
                            _this.otp_model.nativeElement.click();
                            _this.getFamilyMembers(_this.user.uid);
                            _this.otpModel.nativeElement.removeAttribute("data-target");
                            _this.otpModel.nativeElement.setAttribute("type", "submit");
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
        }
        else {
        }
    };
    AccountComponent.prototype.reset = function (form) {
        form.resetForm();
    };
    AccountComponent.prototype.reset1 = function (form) {
        form.resetForm();
        this.otpModel.nativeElement.removeAttribute("data-target");
        this.otpModel.nativeElement.setAttribute("type", "submit");
    };
    AccountComponent.prototype.hm1 = function () {
        this.ms1 = false;
    };
    AccountComponent.prototype.hm2 = function () {
        this.ms2 = false;
        this.ms1 = true;
    };
    AccountComponent.prototype.addLoc = function () {
        this.ms3 = false;
        this.ms4 = true;
    };
    AccountComponent.prototype.hm3 = function () {
        this.ms3 = false;
    };
    AccountComponent.prototype.hm4 = function () {
        this.ms3 = true;
        this.ms4 = false;
    };
    AccountComponent.prototype.hm5 = function () {
        this.ms6 = false;
        this.ms3 = true;
    };
    AccountComponent.prototype.hm6 = function () {
        this.ms7 = false;
        this.ms1 = true;
    };
    /*   editFMInfo(fmid:number){
        this.ms7=true;
        this.hm1();
        //console.log(this.members);
          this.members.forEach(element => {
            if(element.uid === fmid){
                this.member = element;
                if(this.member.gender=='M'){
                  this.member.gender=1;
                }
                if(this.member.gender=='F'){
                  this.member.gender=2;
                }
                // this.member.user_dob=this.getHumanDate(this.member.user_dob);
                 this.member.user_dob=this.getHumanDate(this.member.user_dob);
                 console.log('mem1',this.member.user_dob);
                let edate=this.member.user_dob.split("/");
                this.model1 = { date: { year: edate[2], month: edate[1], day: edate[0] } };
                // window.location.reload();
            }
        });
        
       }*/
    AccountComponent.prototype.editFMInfo = function (fmid) {
        var _this = this;
        this.ms7 = true;
        this.hm1();
        //console.log(this.members);
        this.members.forEach(function (element) {
            if (element.uid === fmid) {
                _this.member = element;
                console.log("EditMember", _this.member);
                if (_this.member.gender == 'M') {
                    _this.member.gender = 1;
                }
                if (_this.member.gender == 'F') {
                    _this.member.gender = 2;
                }
                if (_this.member.user_phone) {
                    _this.ph = true;
                }
                else {
                    _this.ph = false;
                }
                _this.member.user_dob = _this.getHumanDate(_this.member.user_dob);
                console.log('mem1', _this.member.user_dob);
                var memAge = _this.getAge(_this.member.user_dob);
                var b = memAge.split(' ');
                if (b[0] >= 18) {
                    _this.ph = true;
                }
                else {
                    _this.ph = false;
                }
                _this.member.user_name = _this.member.user_name.split(' ');
                _this.member['firstname'] = _this.member.user_name[0];
                _this.member['lastname'] = _this.member.user_name[1];
                var edate = _this.member.user_dob.split("/");
                console.log('edate=', edate);
                _this.model1 = { date: { year: edate[2], month: edate[1], day: edate[0] } }; //assign date to date-picker
                // window.location.reload();
            }
        });
    };
    /*   updateFamilyMembers(fmInfo:any,fmid:number){
         fmInfo.user_id=fmid;
         this._api.getToken().subscribe(
          token => {
            fmInfo.TokenNo= token;
         this._api.POST('UpdateFamilyMembers',fmInfo).subscribe(data =>{
          let mems=JSON.parse(data.json).data;
          console.log("Family member updated successfully");
          swal("<small>Family member updated successfully</small>");
          this.fmem = true;
          this.getFamilyMembers(this.user.uid);
          //window.location.reload();
         });
        });
    
      }*/
    /*  updateFamilyMembers(fmInfo:NgForm,isValid:boolean,fmid:number){
      
        if(isValid){
           console.log( fmInfo.value.user_dob1.date);
    
          fmInfo.value.user_dob1.date=this.parseDateUpdate(fmInfo.value.user_dob1.date);
          console.log(fmInfo.value.user_dob1.date);
    
              let data= {
            "TokenNo":"",
            "user_id":fmid,
            "user_name":fmInfo.value.user_name1,
            "user_email":fmInfo.value.user_email1,
            "user_mobile":fmInfo.value.user_mobile1,
            "user_dob":fmInfo.value.user_dob1.date,
            "user_gender":fmInfo.value.user_gender1,
           }
    
        console.log('dataaaa',fmInfo.value);
    
         this._api.getToken().subscribe(
          token => {
          data.TokenNo= token;
         this._api.POST('UpdateFamilyMembers',data).subscribe(data =>{
          let mems=JSON.parse(data.json).data;
          //console.log("Family member updated successfully");
          this.edit_family.nativeElement.click();
          swal("<small>Family member updated successfully</small>");
          //this.fmem = true;
            fmInfo.resetForm();
          this.getFamilyMembers(this.user.uid);
          //window.location.reload();
         });
        });
    
        }
      }*/
    AccountComponent.prototype.updateFamilyMembers = function (fmInfo, isValid, fmid) {
        var _this = this;
        console.log('update', fmInfo.value.user_dob1.date);
        if (isValid) {
            console.log(fmInfo.value.user_dob1.date);
            fmInfo.value.user_dob1.date = this.parseDateUpdate(fmInfo.value.user_dob1.date);
            console.log(fmInfo.value.user_dob1.date);
            fmInfo.value.user_mobile1 = (fmInfo.value.user_mobile1) ? fmInfo.value.user_mobile1 : "";
            fmInfo.value.user_name1 = fmInfo.value.firstName1 + ' ' + fmInfo.value.lastName1;
            var data_1 = {
                "TokenNo": "",
                "user_id": fmid,
                "user_name": fmInfo.value.user_name1,
                "user_email": fmInfo.value.user_email1,
                "user_mobile": fmInfo.value.user_mobile1,
                "user_dob": fmInfo.value.user_dob1.date,
                "user_gender": fmInfo.value.user_gender1,
            };
            console.log('dataaaa', fmInfo.value);
            this._api.getToken().subscribe(function (token) {
                data_1.TokenNo = token;
                _this._api.POST('UpdateFamilyMembers', data_1).subscribe(function (data) {
                    var mems = JSON.parse(data.json).data;
                    //console.log("Family member updated successfully");
                    _this.edit_family.nativeElement.click();
                    swal("<small>Family member updated successfully</small>");
                    //this.fmem = true;
                    fmInfo.resetForm();
                    _this.getFamilyMembers(_this.user.uid);
                    //window.location.reload();
                });
            });
        }
    };
    /*   addUserAddress(address_info:any,uid:number){
        //address_info.TokenNo=localStorage.getItem('token');
         address_info.user_id=uid;
         address_info.state_id=1;
         address_info.country_id=1;
         address_info.address=address_info.doorNo+','+address_info.streetNo;
      
         /*if(localStorage.getItem('token')!=null){
          }*/
    /* this._api.getToken().subscribe(
       token => {
         address_info.TokenNo= token;
     this._api.POST('AddUserAddress', address_info).subscribe(data =>{
     this.address=JSON.parse(data.json).data;
     if(this.address==undefined){
           }else{
                 
           this.ms5=true;

           this.getUserLocation(this.user.uid,0);
           //window.location.reload();
           }
     
     });
   });
  }*/
    AccountComponent.prototype.addUserAddress = function (address_info, isValid, uid) {
        var _this = this;
        // console.log('address_info',address_info.value);
        //address_info.value.user_id=uid;
        //console.log('adddress',address_info.value);
        address_info.value.user_id = uid;
        address_info.value.state_id = 1;
        address_info.value.country_id = 1;
        //address_info.value.address=address_info.value.doorNo+','+address_info.value.streetNo;
        if (address_info.value.title_id == 3) {
            address_info.value.address = address_info.value.other + ',' + address_info.value.doorNo + ',' + address_info.value.streetNo;
        }
        else {
            address_info.value.address = address_info.value.doorNo + ',' + address_info.value.streetNo;
        }
        this._api.getToken().subscribe(function (token) {
            address_info.value.TokenNo = token;
            _this._api.POST('AddUserAddress', address_info.value).subscribe(function (data) {
                _this.address = JSON.parse(data.json).data;
                if (_this.address == undefined) {
                }
                else {
                    _this.add_address.nativeElement.click();
                    swal("<small>User new address added successfully</small>");
                    address_info.resetForm();
                    //this.ms5=true;
                    _this.getUserLocation(_this.user.uid, 0);
                    //window.location.reload();
                }
            });
        });
    };
    AccountComponent.prototype.getUserLocation = function (uid, tid) {
        var _this = this;
        //this.tid=tid;
        this.loading['address'] = true;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetUserAddress', { TokenNo: token, 'uid': uid }).subscribe(function (data) {
                var res = JSON.parse(data.json).data;
                if (res == undefined) {
                    /*this.locations[0]=[];
                    this.locations[0].address="NA";
                    this.locations[0].area="NA";
                    this.locations[0].city="NA";
                    this.locations[0].area_id=0;
                    this.locations[0].title_id=0;
                    this.defaultLocation =this.locations;*/
                    _this.defaultAddress = [];
                    _this.locations = [];
                }
                else {
                    if (JSON.parse(data.json).data.length > 0) {
                        _this.locations = JSON.parse(data.json).data;
                        console.log('Locations=', _this.locations);
                        _this.locations.forEach(function (element) {
                            _this.location = element;
                            _this.location.address = element.address.toString().split(',');
                            if (element.title_id == 3) {
                                _this.location['hno'] = _this.location.address[2];
                                _this.location['street'] = _this.location.address[1];
                                _this.location['other'] = _this.location.address[0];
                                //this.othereditflag=true;
                            }
                            else {
                                _this.location['hno'] = _this.location.address[1];
                                _this.location['street'] = _this.location.address[0];
                                _this.location['other'] = '';
                            }
                        });
                        /*this.defaultAddress = this.locations.address;
                           this.defaultAddress = this.defaultAddress.split(',');*/
                        //this.defaultLocation=this.locations.filter(item => item.title_id== 0);
                        /* if(this.defaultLocation.length != 0){
                           // console.log('dll',this.defaultLocation.length);
                            this.defaultAddress = this.defaultLocation[0].address;
                            this.defaultAddress = this.defaultAddress.split(',');
            
                         }else{
            
                               this.locations[0]=[];
                               this.locations[0].address="NA";
                               this.locations[0].area="NA";
                               this.locations[0].city="NA";
                               this.locations[0].area_id=0;
                               this.defaultLocation =this.locations;
                               this.defaultAddress=[];
            
                         }*/
                    }
                    else {
                        /*   this.locations[0]=[];
                           this.locations[0].address="NA";
                           this.locations[0].area="NA";
                           this.locations[0].city="NA";
                           this.locations[0].area_id=0;
                           this.defaultLocation =this.locations;
                           this.defaultAddress=[];
                          //this.locations=[];*/
                        _this.defaultAddress = [];
                        _this.locations = [];
                    }
                }
                if (_this.locations.length == 0) {
                    _this.editInfo();
                }
                _this.loading['address'] = false;
                //this.editInfo();
            });
        });
        /*if(uid){
          this.ms3=true;
        }*/
    };
    AccountComponent.prototype.getCities = function () {
        var _this = this;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetCity', { TokenNo: token }).subscribe(function (data) {
                _this.cities = JSON.parse(data.json).data;
                // console.log(this.cities);
            });
        });
    };
    AccountComponent.prototype.getAreaByCity = function (event) {
        var _this = this;
        this.optionVal = event.target.value;
        //console.log(optionVal);
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetAreasByCity', { TokenNo: token, 'City_id': _this.optionVal }).subscribe(function (data) {
                _this.areas = JSON.parse(data.json).data;
                //console.log('areas',this.areas);
            });
        });
    };
    AccountComponent.prototype.getAreaByCity1 = function (cityId) {
        var _this = this;
        this.cityId = cityId;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetAreasByCity', { TokenNo: token, 'City_id': cityId }).subscribe(function (data) {
                _this.areas = JSON.parse(data.json).data;
                console.log('areas', _this.areas);
            });
        });
    };
    AccountComponent.prototype.editFMAddress = function (uid, user_loc_id) {
        var _this = this;
        //console.log(uid,user_loc_id);
        this.locations.forEach(function (element) {
            //console.log('ele',element);
            if (element.user_loc_id === user_loc_id) {
                _this.location = element;
                if (element.title_id == 3) {
                    _this.location.address = _this.location.address.toString().split(',');
                    _this.location['hno'] = _this.location.address[2];
                    _this.location['street'] = _this.location.address[1];
                    _this.location['other'] = _this.location.address[0];
                    //this.othereditflag=true;
                }
                else {
                    _this.location.address = _this.location.address.toString().split(',');
                    _this.location['hno'] = _this.location.address[1];
                    _this.location['street'] = _this.location.address[0];
                    _this.location['other'] = '';
                }
                _this.getAreaByCity1(_this.location.city_id);
            }
        });
        this.user_loc_id = user_loc_id;
        this.ms6 = true;
        this.ms3 = false;
        //this.hm3();
    };
    /*  updateUserAddress(address_info:any,uid:number){
        //address_info.TokenNo=localStorage.getItem('token');
        address_info.user_id=uid;
        address_info.state_id=1;
        address_info.country_id=1;
        address_info.address=address_info.doorNo+','+address_info.streetNo;
    
        this._api.getToken().subscribe(
          token => {
            address_info.TokenNo= token;
          this._api.POST('UpdateUserAddress', address_info).subscribe(data =>{
          this.address=JSON.parse(data.json).data;
            this.uam=true;
            swal("<small>User new address updated successfuly</small>");
            this.getUserLocation(this.user.uid,0);
            //console.log("User address updated");
          //window.location.reload();
          });
        });
       }*/
    AccountComponent.prototype.updateUserAddress = function (address_info, isValid, uid) {
        var _this = this;
        console.log('address_info', address_info.value);
        if (isValid) {
            if (address_info.value.title_id1 == 3) {
                this.editAddress = address_info.value.other1 + ',' + address_info.value.doorNo1 + ',' + address_info.value.streetNo1;
            }
            else {
                this.editAddress = address_info.value.doorNo1 + ',' + address_info.value.streetNo1;
            }
            var data_2 = {
                "TokenNo": "",
                "user_loc_id": address_info.value.user_loc_id,
                "user_id": uid,
                "title": address_info.value.title_id1,
                "address": this.editAddress,
                "city_id": address_info.value.city_id1,
                "area_id": address_info.value.area_id1
            };
            this._api.getToken().subscribe(function (token) {
                data_2.TokenNo = token;
                _this._api.POST('UpdateUserAddress', data_2).subscribe(function (data) {
                    _this.address = JSON.parse(data.json).data;
                    //this.uam=true;
                    _this.edit_address.nativeElement.click();
                    swal("<small>User address updated successfuly</small>");
                    address_info.resetForm();
                    _this.getUserLocation(_this.user.uid, 0);
                    //console.log("User address updated");
                });
            });
        }
    };
    AccountComponent.prototype.getBillDetails = function (bill_no) {
        var _this = this;
        //// 
        // console.log(bill_no);
        window.open('./bill-view/' + bill_no, "_blank");
        //this.router.navigate(['./bill-view/'+bill_no]);
        this.loading['billDetails'] = true;
        this.billDetails = [];
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetOrderDetails', { TokenNo: token, 'orderno': bill_no, 'mobileno': '' }).subscribe(function (data) {
                _this.billDetails = JSON.parse(data.json).data;
                _this.partient_name = _this.billDetails[0].patient_name;
                _this.loading['billDetails'] = false;
            });
        });
    };
    AccountComponent.prototype.downloadReport = function (tid, bill_no) {
        var _this = this;
        this.loading['reportDownload'] = true;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetFinalReport', { TokenNo: token, 'service_id': tid, 'orderno': bill_no }).subscribe(function (data) {
                var file = JSON.parse(data.json).data;
                var str = file[0].message;
                if (str.substring(str.length - 1, str.length) === ',') {
                    str = str.substring(0, str.length - 1);
                }
                console.log(str);
                _this.previewReport(str);
                _this.loading['reportDownload'] = false;
                // console.log(this.billDetails);
            });
        });
    };
    AccountComponent.prototype.previewReport = function (file) {
        window.open('http://208.163.37.165/Intgcems/orderinvoice/' + file, '_blank');
    };
    AccountComponent.prototype.ser = function (term) {
        var b = this.searchValues(term);
        console.log(b);
        this.myFinalizedOrders2 = b;
    };
    AccountComponent.prototype.searchValues = function (term) {
        var _this = this;
        return term
            ? this.myFinalizedOrders.filter(function (item) { return ((_this.inString(item.customer_name, term)) || (_this.inString(item.test_name, term)) || (_this.inString(item.bill_no, term))); })
            : this.myFinalizedOrders;
    };
    AccountComponent.prototype.inString = function (thread, needle) {
        if (thread !== null) {
            if (thread.toLowerCase().indexOf(needle.toLowerCase()) >= 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    AccountComponent.prototype.serviceDetails = function (tname, type) {
        if (type == 0) {
            this._appComponent.select(tname, 'package');
        }
        else if (type == 1) {
            this._appComponent.select(tname, 'test');
        }
    };
    return AccountComponent;
}());
AccountComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-account',
                templateUrl: './account.component.html',
                styleUrls: ['./account.component.css']
            },] },
];
/** @nocollapse */
AccountComponent.ctorParameters = function () { return [
    { type: router_1.Router, },
    { type: api_service_1.ApiService, },
    { type: app_component_1.AppComponent, },
    { type: router_1.ActivatedRoute, },
]; };
AccountComponent.propDecorators = {
    'add_family': [{ type: core_1.ViewChild, args: ['add_family',] },],
    'edit_family': [{ type: core_1.ViewChild, args: ['edit_family',] },],
    'add_address': [{ type: core_1.ViewChild, args: ['add_address',] },],
    'edit_address': [{ type: core_1.ViewChild, args: ['edit_address',] },],
    'otp_model': [{ type: core_1.ViewChild, args: ['otp_model',] },],
    'otpModel': [{ type: core_1.ViewChild, args: ['otpModel',] },],
    'oh': [{ type: core_1.ViewChild, args: ['oh',] },],
};
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map