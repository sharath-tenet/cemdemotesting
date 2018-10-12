"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var book_component_1 = require("../book/book.component");
var app_component_1 = require("../app.component");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var CartComponent = (function () {
    function CartComponent(_api, bc, router, _appComponent, elementRef, datePipe) {
        this.router = router;
        this.elementRef = elementRef;
        this.datePipe = datePipe;
        this.MPGprice = 0;
        this.finhvd = [];
        this.fam = false;
        this.loading = [];
        this.sel_time = [];
        this.sel_date = [];
        this.tests = [];
        this.cartValues = [];
        this.osw = false;
        this.isTokenSet = false;
        this.paymentMethods = [];
        this.cartTestIds = [];
        this.suggestedTests = [];
        this.sw = 1;
        this.user = [];
        this.ms1 = false;
        this.ms2 = false;
        this.ms3 = false;
        this.ms4 = false;
        this.ms5 = false;
        this.tmp = false;
        this.ms6 = false;
        this.members = [];
        this.locations = [];
        this.cities = [];
        this.areas = [];
        this.sel_members = [];
        this.sel_locations = [];
        this.sel_slot = [];
        this.tid = null;
        this.finalPostList = [];
        this.address = [];
        this.location = [];
        this.ms7 = false;
        this.member = [];
        //packages
        this.pckgs = [];
        this.cartPckgIds = [];
        this.tempTotal = 0;
        this.hvc = 50;
        this.colc = 0;
        this.labs = [];
        this.lablocations = [];
        this.sel_type = [];
        this.sel_lablocation = [];
        this.modify_bill = null;
        this.modi_member = [];
        this.ph = false;
        this.date = new Date();
        this.myOptions = {
            // other options...
            dateFormat: 'dd-mm-yyyy',
            disableUntil: { year: this.date.getUTCFullYear(), month: this.date.getUTCMonth() + 1, day: this.date.getUTCDate() - 1 },
            disableSince: { year: this.date.getUTCFullYear() + 1, month: this.date.getUTCMonth() + 1, day: this.date.getUTCDate() }
        };
        this.myOptions1 = {
            // other options...
            dateFormat: 'yyyy-mm-dd',
            disableSince: { year: this.date.getUTCFullYear(), month: this.date.getUTCMonth() + 1, day: this.date.getUTCDate() + 1 }
        };
        window.scrollTo(0, 0);
        var date = new Date();
        this.setDate1();
        this.minDate = { date: { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() } };
        //this.minDate={day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
        this.maxDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() + 1 };
        this._api = _api;
        this._appComponent = _appComponent;
        this.tokenCheck();
        this.getLocStorage();
        if (this.isTokenSet) {
            this.loading['data'] = true;
            this.mytests();
            this.getUserFamily(this.user.uid, 0);
        }
        // if(this.isTokenSet){
        //   this.getUserFamily(this.user.uid,0);
        //   this.getUserLocation(this.user.uid,0);
        // }
        // this._appComponent.setFlag();
        // // //this.listPckgs();
        //  this.listTests();
        //  this.getLabLocations("Hyderabad");//this will be dynamic form google locations
        this.couponRes = { "discount_amount": 0 };
        this.bookComponent = bc;
        this.getCities();
        this.getTimeSlots();
        // this.checkLoad();
        //console.log('this.user',this.user);
    }
    CartComponent.prototype.mytests = function () {
        var _this = this;
        this.tests = JSON.parse(localStorage.getItem('tests'));
        //  console.log('tests=',this.tests);
        if (this.tests !== null) {
            if (this.tests.length > 0) {
                this.tests.forEach(function (element) {
                    // console.log(typeof this.sel_members[element.tid].uid);
                    _this.cartTestIds.push(element.tid);
                    if (_this.sel_members[element.tid] == undefined || _this.sel_members[element.tid] == []) {
                        _this.sel_members[element.tid] = [];
                        _this.sel_members[element.tid].push(_this.user);
                    }
                    else if (typeof _this.sel_members[element.tid].uid == "number") {
                        _this.sel_members[element.tid] = [];
                        _this.sel_members[element.tid].push(_this.user);
                    }
                    if (_this.modify_bill) {
                        _this.sel_members[element.tid] = _this.modi_member;
                    }
                });
                // console.log(this.modi_member);
            }
        }
        else {
            this.tests = [];
        }
        console.log("sel_mem", this.sel_members);
        this.cartValues = JSON.parse(localStorage.getItem('cartValues'));
    };
    CartComponent.prototype.checkLoad = function () {
        console.log("tests", this.tests);
        console.log("mem", this.members);
        console.log("loc", this.locations);
        console.log("labloc", this.lablocations);
        console.log("sel_mem", this.sel_members);
        console.log("sel_loc", this.sel_locations);
        console.log("sel_type", this.sel_type);
    };
    CartComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this._api.getToken().subscribe( 
        //   token => {
        //  this._api.POST('PaymentMethods', {TokenNo: token}).subscribe(data =>{
        //   this.paymentMethods=JSON.parse(data.json).data;
        //  });
        // });
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('SuggestedTests', { TokenNo: token, 'test_ids': _this.cartTestIds }).subscribe(function (data) {
                _this.suggestedTests = JSON.parse(data.json).data;
            });
        });
    };
    CartComponent.prototype.listTests = function () {
        var _this = this;
        this.tests = JSON.parse(localStorage.getItem('tests'));
        //console.log('tests=',this.tests);
        if (this.tests !== null) {
            if (this.tests.length > 0) {
                this.tests.forEach(function (element) {
                    _this.cartTestIds.push(element.tid);
                    if (_this.sel_members[element.tid] == undefined || _this.sel_members[element.tid] == []) {
                        _this.sel_members[element.tid] = [];
                        _this.sel_members[element.tid].push(_this.user);
                    }
                    if (_this.modify_bill) {
                        _this.sel_members[element.tid] = _this.modi_member;
                    }
                });
                // console.log(this.modi_member);
            }
        }
        else {
            this.tests = [];
        }
        if (this.sel_members.length == 0) {
            if (localStorage.getItem('sel_members')) {
                this.sel_members = JSON.parse(localStorage.getItem('sel_members'));
                localStorage.removeItem('sel_members');
            }
        }
        if (this.sel_locations.length == 0) {
            if (localStorage.getItem('sel_locations')) {
                this.sel_locations = JSON.parse(localStorage.getItem('sel_locations'));
                localStorage.setItem('sel_locations', "");
                localStorage.removeItem('sel_locations');
            }
        }
        //  console.log(this.sel_locations);
        this.cartValues = JSON.parse(localStorage.getItem('cartValues'));
        //  this.bookComponent.hideCart();
    };
    //set home collection as default for all family members all tests
    CartComponent.prototype.setHcDefault = function () {
        //this.tests= JSON.parse(localStorage.getItem('tests'));
        var _this = this;
        if (this.tests !== null) {
            if (this.tests.length > 0) {
                this.tests.forEach(function (element) {
                    _this.members.forEach(function (element1) {
                        if (_this.sel_type[element.tid] == undefined || _this.sel_type[element.tid] === '') {
                            _this.sel_type[element.tid] = [];
                        }
                        if (_this.sel_type[element.tid][element1.uid] == undefined || _this.sel_type[element.tid][element1.uid] === '') {
                            _this.sel_type[element.tid][element1.uid] = 2;
                        }
                        if (_this.sel_locations[element.tid] == undefined || _this.sel_locations[element.tid] === '' || (typeof _this.sel_locations[element.tid] == "string")) {
                            _this.sel_locations[element.tid] = [];
                        }
                        if (_this.sel_locations[element.tid][element1.uid] == undefined || _this.sel_locations[element.tid][element1.uid] == '') {
                            //let strngaddres=this.user.user_address;
                            _this.sel_locations[element.tid][element1.uid] = _this.locations[0];
                        }
                        if (_this.sel_lablocation[element.tid] == undefined || _this.sel_lablocation[element.tid] === '') {
                            _this.sel_lablocation[element.tid] = [];
                        }
                        if (_this.sel_lablocation[element.tid][element1.uid] == undefined || _this.sel_lablocation[element.tid][element1.uid] == '') {
                            _this.sel_lablocation[element.tid][element1.uid] = _this.lablocations[0];
                        }
                        if (_this.sel_date[element.tid] == undefined || _this.sel_date[element.tid] === '') {
                            _this.sel_date[element.tid] = [];
                        }
                        if (_this.sel_date[element.tid][element1.uid] == undefined || _this.sel_date[element.tid][element1.uid] == '') {
                            _this.sel_date[element.tid][element1.uid] = _this.minDate;
                        }
                        if (_this.sel_slot[element.tid] == undefined || _this.sel_slot[element.tid] === '') {
                            _this.sel_slot[element.tid] = [];
                        }
                        // this.sel_locations[element.tid]="Plot #119,Road No 10,Jubliee Hills";
                        //  console.log(this.user);
                        //  console.log(this.sel_locations);
                        //  if(this.sel_lablocation[element.tid]==undefined){
                        //    this.sel_lablocation[element.tid]=this.lablocations[0];
                        //  }
                    });
                });
                //console.log(this.sel_lablocation);
            }
        }
        // console.log("here",this.sel_date[36][2]);
        this.setLocStorage();
        this.mypayotp('1');
        this.loading['data'] = false;
    };
    CartComponent.prototype.mypayotp = function (pay) {
        this.paymentOption = pay;
        localStorage.setItem('paymentOpt', this.paymentOption);
    };
    //packages
    CartComponent.prototype.listPckgs = function () {
        var _this = this;
        //console.log("pckgs=",this.pckgs);
        this.pckgs = JSON.parse(localStorage.getItem('packages'));
        if (this.pckgs != null) {
            this.pckgs.forEach(function (element) {
                _this.cartPckgIds.push(element.id);
                if (_this.sel_members[element.id] == undefined || _this.sel_members[element.id] == []) {
                    _this.sel_members[element.id] = _this.user;
                }
                if (_this.sel_locations[element.id] == undefined) {
                    //  this.sel_locations[element.id]=this.user.user_address;
                    // this.sel_locations[element.tid]="Plot #119,Road No 10,Jubliee Hills";
                }
                if (_this.sel_type[element.id] == undefined) {
                    _this.sel_type[element.id] = 1;
                }
            });
        }
        //this.sel_locations=this.cleanArray(this.sel_locations);
        if (this.sel_members.length == 0) {
            if (localStorage.getItem('sel_members')) {
                this.sel_members = JSON.parse(localStorage.getItem('sel_members'));
                localStorage.removeItem('sel_members');
            }
        }
        if (this.sel_locations.length == 0) {
            if (localStorage.getItem('sel_locations')) {
                this.sel_locations = JSON.parse(localStorage.getItem('sel_locations'));
                localStorage.removeItem('sel_locations');
            }
        }
        this.cartValues = JSON.parse(localStorage.getItem('cartValues'));
        //  console.log(this.sel_members);
    };
    CartComponent.prototype.tokenCheck = function () {
        if (localStorage.getItem('token') === null) {
            this.isTokenSet = false;
        }
        else {
            this.isTokenSet = true;
            if (JSON.parse(localStorage.getItem('user'))) {
                this.user = JSON.parse(localStorage.getItem('user'));
            }
            // console.log(this.user); 
            // console.log(localStorage.getItem('token'))
        }
    };
    CartComponent.prototype.showHide = function (val) {
        this.sw = val;
    };
    CartComponent.prototype.offerssw = function () {
        if (this.osw === true) {
            this.osw = false;
        }
        else {
            this.osw = true;
        }
    };
    CartComponent.prototype.onKey = function (coupon) {
        var _this = this;
        if (coupon == '') {
            return;
        }
        this.couponVAlue = coupon;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('coupon_apply.php', { TokenNo: token, test_ids: _this.tests }).subscribe(function (data) {
                _this.couponRes = JSON.parse(data.json).data;
            });
        });
    };
    CartComponent.prototype.getAddTestCart = function (tst) {
        this.bookComponent.getAddTestCart(tst);
        this.listTests();
        this.bookComponent._appComponent.hideCart();
        this.bookComponent._appComponent.checkOut();
    };
    CartComponent.prototype.getAddPackageCart = function (pkg) {
        this.bookComponent.getAddPackageCart(pkg);
        this.listPckgs();
        this.bookComponent._appComponent.hideCart();
        this.bookComponent._appComponent.checkOut();
    };
    CartComponent.prototype.cleanArray = function (actual) {
        var newArray = [];
        for (var i = 0; i < actual.length; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    };
    CartComponent.prototype.checkOut = function () {
        var _this = this;
        this.loading['data'] = true;
        if (this.isTokenSet) {
            if (confirm("Confirm?")) {
                this.finalPostList = [];
                if (this.tests != null) {
                    this.tests = this.cleanArray(this.tests);
                    this.tests.forEach(function (element) {
                        //console.log(this.sel_members[element.tid]['uid']);
                        if (_this.sel_members[element.tid].length == 0) {
                            _this.finalPostList['uid_' + _this.user.uid] = [];
                            _this.finalPostList['uid_' + _this.user.uid].push(element.tid);
                        }
                        else {
                            _this.sel_members[element.tid].forEach(function (element1, index) {
                                if (_this.finalPostList['uid_' + _this.sel_members[element.tid][index]['uid']] == undefined) {
                                    _this.finalPostList['uid_' + _this.sel_members[element.tid][index]['uid']] = [];
                                    _this.finalPostList['uid_' + _this.sel_members[element.tid][index]['uid']].tests = [];
                                    _this.finalPostList['uid_' + _this.sel_members[element.tid][index]['uid']].tests.push(element.tid);
                                }
                                else {
                                    _this.finalPostList['uid_' + _this.sel_members[element.tid][index]['uid']].tests.push(element.tid);
                                }
                            });
                        }
                        /*user quantity check start here*/
                        if (_this.userVsQuant(element, _this.sel_members[element.tid])) {
                            // swal("Your Quantity did not match with number of member selected in "+element.test_name,"warning");
                            var tqnt = _this.getQuantByTid(element.tid);
                            swal("Alas!", "You have selected " + tqnt + " units for '" + element.test_name + "'\nyou can add a family member if you want to be tested together", "warning");
                            // swal("Alas!", "Your Quantity did not match with number of members selected in '"+element.test_name+"'","warning");
                            _this.loading["data"] = false;
                            // return "false";
                            throw new Error("Something went badly wrong!");
                        }
                    });
                }
                var _loop_1 = function (key) {
                    var i = 1;
                    var fuid = key.split("_")[1];
                    fiorder_no = [];
                    failorder_no = [];
                    var fitest = this_1.finalPostList[key].tests;
                    var fiprice = [];
                    var filocation = [];
                    var fischedule = [];
                    var fiseltype = [];
                    this_1.tempTotal = 0;
                    fitest.forEach(function (element) {
                        fiprice.push(_this.getFpriceByTid(element));
                        fiseltype.push(_this.sel_type[element][fuid]);
                        if (_this.sel_type[element][fuid] == 1) {
                            // console.log(this.sel_locations[element].address);
                            // if(this.sel_locations[element].address==undefined){
                            filocation.push(_this.sel_locations[element][fuid].address);
                            // }else{
                            //    filocation.push(this.sel_locations[element][fuid].address);
                            //  }
                        }
                        else {
                            filocation.push(_this.sel_lablocation[element][fuid].address);
                        }
                        if (_this.sel_slot[element][fuid]) {
                            fischedule.push(_this.sel_slot[element][fuid]);
                        }
                    });
                    if (this_1.modify_bill) {
                        this_1._api.getToken().subscribe(function (token) {
                            _this._api.POST('ModifyOrder', { TokenNo: token, 'test_id': fitest.join(), 'user_name': fuid, 'order_no': _this.modify_bill, 'item_net_amount': fiprice.join(), 'item_center_id': 1, 'item_center_name': 'banjara', 'order_net_amount': _this.tempTotal, 'status': 'M', 'schdate': fischedule.join('`'), 'schaddress': filocation.join('`'), 'order_type': fiseltype.join() }).subscribe(function (data) {
                                var inv = JSON.parse(data.json).data;
                                // console.log(inv[0].order_no);
                                fiorder_no.push(inv[0].order_no);
                                if (Object.keys(_this.finalPostList).length == fiorder_no.length) {
                                    _this.orderModified(fiorder_no);
                                }
                            });
                        });
                    }
                    else {
                        this_1._api.getToken().subscribe(function (token) {
                            var dat = { TokenNo: token, 'test_id': fitest.join(), 'user_name': fuid, 'item_net_amount': fiprice.join(), 'item_center_id': 1, 'item_center_name': 'banjara', 'order_net_amount': _this.tempTotal, 'schdate': fischedule.join('`'), 'schaddress': filocation.join('`'), 'order_type': fiseltype.join() };
                            console.log(dat);
                            _this._api.POST('OrderCreate', { TokenNo: token, 'test_id': fitest.join(), 'user_name': fuid, 'item_net_amount': fiprice.join(), 'item_center_id': 1, 'item_center_name': 'banjara', 'order_net_amount': _this.tempTotal, 'schdate': fischedule.join('`'), 'schaddress': filocation.join('`'), 'order_type': fiseltype.join() }).subscribe(function (data) {
                                var inv = JSON.parse(data.json).data;
                                if (JSON.parse(data.json).status == 1) {
                                    console.log(inv);
                                    fiorder_no.push(inv[0].order_no);
                                }
                                else {
                                    failorder_no.push({ 'uid': fuid, });
                                }
                                if (Object.keys(_this.finalPostList).length == fiorder_no.length) {
                                    _this.finalizeOrder(fiorder_no);
                                }
                                else if (Object.keys(_this.finalPostList).length == i) {
                                    //  this.errors();
                                    swal({
                                        type: 'error',
                                        title: 'Oops...',
                                        text: 'Something went wrong!',
                                        footer: '<a href="javasript:void(0)" (click)="window.location.reload()">Try Again?</a>',
                                    });
                                    throw new Error('Something Went wrong');
                                }
                                i++;
                            });
                        });
                    }
                };
                var this_1 = this, fiorder_no, failorder_no;
                for (var key in this.finalPostList) {
                    _loop_1(key);
                }
            }
            else {
                this.loading["data"] = false;
                return false;
            }
        }
        else {
            this.router.navigate(['./login']);
        }
    };
    CartComponent.prototype.errors = function () {
        this.loading['data'] = false;
        swal("<small>Something Went Wrong,Please Try again</small>");
    };
    CartComponent.prototype.finalizeOrder = function (fiorder_no) {
        var _this = this;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('FinalizeOrder', { TokenNo: token, 'Referenceid': _this.user.uid, 'order_no': fiorder_no.join(), 'payment_type': _this.paymentOption }).subscribe(function (data) {
                var inv = JSON.parse(data.json).data;
                //console.log(inv);
                sessionStorage.setItem('invoice', JSON.stringify(inv));
                localStorage.setItem('invoice', JSON.stringify(inv));
                localStorage.setItem('tempTotal', JSON.stringify(_this.MPGprice));
                // debugger;
                console.log("order finalized");
                //    console.log(inv);
                _this.removeLocalStorage();
                _this.clearCart();
                console.log("payment gateway redirection here");
                // this.router.navigate(['./payment']);
            });
        });
    };
    CartComponent.prototype.orderModified = function (fiorder_no) {
        this.clearCart();
        console.log("payment gateway redirection here");
        this.router.navigate(['./payment']);
    };
    CartComponent.prototype.clearCart = function () {
        var _this = this;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('AddtoWishList', { TokenNo: token, 'uid': _this.user.uid, 'test_id': 0, 'quantity': 0, 'loc_id': '1', 'status': 'C', 'is_wishlist': '2' }).subscribe(function (data) {
                var inv = JSON.parse(data.json).data;
                //  console.log("Cart Cleared");
                _this.bookComponent._appComponent.clearCart();
                _this.router.navigate(['./payment']);
            });
        });
    };
    CartComponent.prototype.getFpriceByTid = function (tid) {
        var a = 0;
        this.tests.forEach(function (element) {
            if (element.tid == tid) {
                a = element.test_finalpr;
            }
        });
        //console.log("here",this.pckgs);
        if (this.pckgs) {
            this.pckgs.forEach(function (element) {
                if (element.id == tid) {
                    a = element.package_finalpr;
                }
            });
        }
        this.MPGprice = this.MPGprice + (this.getQuantByTid(tid) * a);
        this.tempTotal = this.tempTotal + a;
        return a;
    };
    CartComponent.prototype.getQuantByTid = function (tid) {
        var a = 0;
        this.tests.forEach(function (element) {
            if (element.tid == tid) {
                a = element.quant;
            }
        });
        //console.log("here",this.pckgs);
        if (this.pckgs) {
            this.pckgs.forEach(function (element) {
                if (element.id == tid) {
                    a = element.quant;
                }
            });
        }
        //this.tempTotal=this.tempTotal+a;
        return a;
    };
    CartComponent.prototype.backToTests = function () {
        this.router.navigate(['./book']);
    };
    CartComponent.prototype.getUserFamily = function (uid, tid) {
        var _this = this;
        this.tid = tid;
        // family_members
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetFamilyMembers', { TokenNo: token, 'user_id': uid }).subscribe(function (data) {
                var res = JSON.parse(data.json);
                if (res.length == 0) {
                    _this.members.push(_this.user);
                    // console.log(this.members);
                }
                else {
                    if (JSON.parse(data.json).data.length > 0) {
                        _this.members = JSON.parse(data.json).data;
                        _this.members.push(_this.user);
                        _this.members.reverse();
                    }
                    else {
                        _this.members.push(_this.user);
                    }
                }
                console.log(_this.members);
                _this.getUserLocation(_this.user.uid, 0);
            });
        });
        /*  if(uid){
            this.ms1=true;
          }*/
    };
    CartComponent.prototype.hm1 = function () {
        this.ms1 = false;
    };
    CartComponent.prototype.addFM = function () {
        this.ms1 = false;
        this.ms2 = true;
    };
    CartComponent.prototype.hm2 = function () {
        this.ms2 = false;
    };
    CartComponent.prototype.getUserLocation = function (uid, tid) {
        var _this = this;
        this.tid = tid;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetUserAddress', { TokenNo: token, 'uid': uid }).subscribe(function (data) {
                // console.log('locs',(JSON.parse(data.json).data.length));
                var res = JSON.parse(data.json).data;
                // console.log(res);
                if (res == undefined) {
                    _this.locations[0] = [];
                    _this.locations[0].address = "NA";
                    _this.locations[0].area = "NA";
                    _this.locations[0].city = "NA";
                    _this.locations[0].area_id = 0;
                }
                else {
                    if (JSON.parse(data.json).data.length > 0) {
                        _this.locations = JSON.parse(data.json).data;
                    }
                    else {
                        _this.locations[0] = [];
                        _this.locations[0].address = "NA";
                        _this.locations[0].area = "NA";
                        _this.locations[0].city = "NA";
                        _this.locations[0].area_id = 0;
                    }
                }
                console.log(_this.locations);
                _this.getLabLocations("Hyderabad"); //this will be dynamic form google locations
            });
        });
        /* if(uid){
           this.ms3=true;
         }*/
    };
    CartComponent.prototype.hm3 = function () {
        this.ms3 = false;
    };
    CartComponent.prototype.addLoc = function () {
        this.ms3 = false;
        this.ms4 = true;
    };
    CartComponent.prototype.hm4 = function () {
        this.ms4 = false;
    };
    CartComponent.prototype.getSlots = function (uid, test_id) {
        this.tid = test_id;
        this.router.navigate(['./slots', { testId: test_id }]);
    };
    CartComponent.prototype.setFamilyMember = function (mem) {
        //console.log(mem);
        this.sel_members[this.tid] = mem;
        this.hm1();
        this.setLocStorage();
    };
    CartComponent.prototype.uniqueCheck = function (key, arr) {
        var k = false;
        arr.forEach(function (element) {
            if (element.uid === key.uid) {
                // console.log(element.uid,"undi");
                k = true;
            }
        });
        //  console.log(key.uid,"ledu");
        return k;
        //  key=JSON.stringify(key);
        //  arr=JSON.stringify(arr);
        // if(arr.indexOf(key)>=0){
        //   return true;
        // }else{
        //   return false;
        // }
    };
    CartComponent.prototype.getIndex = function (key, arr) {
        var index = arr.findIndex(function (x) { return JSON.stringify(x) == JSON.stringify(key); });
        return index;
    };
    CartComponent.prototype.getTestBytid = function (val) {
        var a = "";
        this.tests.forEach(function (element) {
            if (element.tid == val) {
                a = element;
            }
        });
        return a;
    };
    CartComponent.prototype.setFamilyMember1 = function (memId, tid, event) {
        var _this = this;
        this.members.forEach(function (item, index) {
            //console.log(item.uid,memId);
            if (item.uid == memId) {
                if (_this.uniqueCheck(item, _this.sel_members[tid])) {
                    if (_this.sel_members[tid].length > 1) {
                        _this.sel_members[tid].splice(_this.getIndex(item, _this.sel_members[tid]), 1);
                        _this.bookComponent.getRemoveTestCart(_this.getTestBytid(tid), 'test', '');
                    }
                    else {
                        alert("test Should be made to atleast one member");
                        return false;
                    }
                }
                else {
                    if (_this.getTestQuant(tid) >= (_this.sel_members[tid].length + 1)) {
                        _this.sel_members[tid].push(item);
                    }
                    else {
                        alert("you have selected more family members than your quantity \nWe are adding up");
                        _this.bookComponent.getAddTestCart(_this.getTestBytid(tid));
                        // this.getLocStorage();
                        _this.sel_members[tid].push(item);
                    }
                }
            }
        });
        this.hm1();
        this.setLocStorage();
        // this.getLocStorage();
        console.log(this.sel_members[tid]);
    };
    // saveFamilyMembers(mem:any,uid:number){
    //   mem.user_id=uid;
    //  // console.log("mem=",mem);
    //   this._api.POST('AddFamilyMembers', mem).subscribe(data =>{
    //     let mems=JSON.parse(data.json).data;
    //     //console.log(mems);
    //     this.tmp = true;
    //     window.location.reload();
    //    });
    //  }
    CartComponent.prototype.setTestLocation = function (loc) {
        //  console.log(loc.sub_area+','+loc.area+','+loc.pincode);
        this.sel_locations[this.tid] = loc.address + ',' + loc.area + ',' + loc.city;
        this.hm3();
        this.setLocStorage();
    };
    CartComponent.prototype.setTestLocation1 = function (locId, tid, mem) {
        var _this = this;
        // console.log('setLoc',locId,tid,mem);
        // console.log(Array.isArray(this.sel_locations[tid]));
        if (this.sel_type[tid][mem] == 1) {
            this.locations.forEach(function (item, index) {
                if (item.area_id == locId) {
                    //this.sel_locations[tid]=item.address+','+item.area+','+item.city;
                    if (_this.sel_locations[tid] == undefined || _this.sel_locations[tid] === null || Array.isArray(_this.sel_locations[tid]) == false) {
                        _this.sel_locations[tid] = [];
                    }
                    _this.sel_locations[tid][mem] = item;
                }
            });
        }
        else {
            this.lablocations.forEach(function (item, index) {
                if (item.area_id == locId) {
                    //this.sel_locations[tid]=item.address+','+item.area+','+item.city;
                    if (_this.sel_locations[tid] == undefined || _this.sel_locations[tid] === null) {
                        _this.sel_locations[tid] = [];
                    }
                    _this.sel_lablocation[tid][mem] = item;
                }
            });
        }
        // console.log(this.sel_locations);
        /* this.sel_locations[this.tid]=loc.address+','+loc.area+','+loc.city;*/
        this.hm3();
        this.setLocStorage();
    };
    CartComponent.prototype.setLocStorage = function () {
        localStorage.setItem("sel_locations", JSON.stringify(this.sel_locations));
        localStorage.setItem("sel_members", JSON.stringify(this.sel_members));
        localStorage.setItem("sel_lablocation", JSON.stringify(this.sel_lablocation));
        localStorage.setItem("sel_type", JSON.stringify(this.sel_type));
    };
    CartComponent.prototype.getLocStorage = function () {
        if (localStorage.getItem("sel_locations")) {
            this.sel_locations = JSON.parse(localStorage.getItem("sel_locations"));
        }
        if (localStorage.getItem("sel_members")) {
            this.sel_members = JSON.parse(localStorage.getItem("sel_members"));
        }
        if (localStorage.getItem("slot_details")) {
            this.sel_slot = JSON.parse(localStorage.getItem("slot_details"));
            //console.log(this.sel_slot);
        }
        if (localStorage.getItem("sel_lablocation")) {
            this.sel_lablocation = JSON.parse(localStorage.getItem("sel_lablocation"));
            //console.log(this.sel_slot);
        }
        if (localStorage.getItem("sel_type")) {
            this.sel_type = JSON.parse(localStorage.getItem("sel_type"));
            //console.log(this.sel_slot);
        }
        if (localStorage.getItem("modify_bill")) {
            var mm = JSON.parse(localStorage.getItem("modi_member"));
            //console.log(mm);
            this.modi_member = mm;
            this.modify_bill = localStorage.getItem("modify_bill");
        }
    };
    CartComponent.prototype.getCities = function () {
        var _this = this;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetCity', { TokenNo: token }).subscribe(function (data) {
                _this.cities = JSON.parse(data.json).data;
                // console.log(this.cities);
            });
        });
    };
    CartComponent.prototype.getAreaByCity = function (event) {
        var _this = this;
        this.optionVal = event.target.value;
        //console.log(optionVal);
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetAreasByCity', { TokenNo: token, 'City_id': _this.optionVal }).subscribe(function (data) {
                _this.areas = JSON.parse(data.json).data;
                console.log(_this.areas);
            });
        });
    };
    CartComponent.prototype.getAreaByCity1 = function (cityId) {
        var _this = this;
        this.cityId = cityId;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetAreasByCity', { TokenNo: token, 'City_id': cityId }).subscribe(function (data) {
                _this.areas = JSON.parse(data.json).data;
                console.log(_this.areas);
            });
        });
    };
    CartComponent.prototype.addUserAddress = function (address_info, uid) {
        var _this = this;
        //address_info.TokenNo=localStorage.getItem('token');
        address_info.user_id = uid;
        address_info.state_id = 1;
        address_info.country_id = 1;
        //  console.log(address_info);
        /*if(localStorage.getItem('token')!=null){
         }*/
        this._api.POST('AddUserAddress', address_info).subscribe(function (data) {
            _this.address = JSON.parse(data.json).data;
            console.log(_this.address);
            _this.ms5 = true;
            window.location.reload();
        });
    };
    CartComponent.prototype.deleteCartItem = function (uid, tid) {
        var _this = this;
        this.tests = JSON.parse(localStorage.getItem('tests'));
        // console.log(this.tests);
        //this.tests.splice(this.tests.indexOf(tid), 1);
        if (this.tests != null) {
            this.tests.forEach(function (item, index) {
                //console.log(this.sel_members[item.tid]['uid']);
                if (_this.sel_members[item.tid]) {
                    if (item.tid === tid)
                        _this.tests.splice(index, 1);
                }
            });
        }
        this.pckgs = JSON.parse(localStorage.getItem('packages'));
        //console.log(this.tests);
        if (this.pckgs != null) {
            this.pckgs.forEach(function (item, index) {
                if (item.id === tid)
                    _this.pckgs.splice(index, 1);
            });
        }
        localStorage.setItem("tests", JSON.stringify(this.tests));
        localStorage.setItem("packages", JSON.stringify(this.pckgs));
        this.tot = 0;
        this.tests.forEach(function (element) {
            _this.tot = _this.tot + parseInt(element.test_finalpr);
        });
        if (this.pckgs !== null) {
            this.pckgs.forEach(function (element) {
                _this.tot = _this.tot + parseInt(element.package_finalpr);
            });
        }
        this.cartValues = JSON.parse(localStorage.getItem('cartValues'));
        localStorage.removeItem('cartValues');
        var a = { "tot": this.tot, "hvc": this.hvc, "colc": this.colc };
        localStorage.setItem("cartValues", JSON.stringify(a));
        this.cartValues = JSON.parse(localStorage.getItem('cartValues'));
        //console.log('ucv',this.cartValues);
        this.bookComponent._appComponent.checkOut();
    };
    CartComponent.prototype.editFMAddress = function (uid, user_loc_id) {
        var _this = this;
        this.locations.forEach(function (element) {
            //console.log(element.id);
            if (element.user_loc_id === user_loc_id) {
                // console.log(element);
                _this.location = element;
            }
        });
        this.ms6 = true;
        this.hm3();
        this.getAreaByCity1(this.location.city_id);
        console.log(this.location);
    };
    CartComponent.prototype.hm5 = function () {
        this.ms6 = false;
    };
    CartComponent.prototype.updateUserAddress = function (address_info, uid) {
        //address_info.TokenNo=localStorage.getItem('token');
        address_info.user_id = uid;
        address_info.state_id = 1;
        address_info.country_id = 1;
        // console.log(address_info);
        /*if(localStorage.getItem('token')!=null){
         }*/
        /* this._api.POST('UpdateUserAddress', address_info).subscribe(data =>{
         this.address=JSON.parse(data.json).data;
           //this.ms5=true;
           console.log("User address updated");
           window.location.reload();
         });*/
    };
    CartComponent.prototype.editFMInfo = function (fmid) {
        var _this = this;
        this.ms7 = true;
        this.hm1();
        //console.log(this.members);
        this.members.forEach(function (element) {
            if (element.fmid === fmid) {
                _this.member = element;
                if (_this.member.gender == 'M') {
                    _this.member.gender = 1;
                }
                if (_this.member.gender == 'F') {
                    _this.member.gender = 2;
                }
                //this.member.user_dob=this.getHumanDate(this.member.user_dob);
            }
        });
        return this.member;
        // console.log(this.member);
    };
    CartComponent.prototype.hm6 = function () {
        this.ms7 = false;
    };
    CartComponent.prototype.getHumanDate = function (dt) {
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
    CartComponent.prototype.updateFamilyMembers = function (fmInfo, fmid) {
        fmInfo.user_id = fmid;
        //console.log(fmInfo);
        this._api.POST('UpdateFamilyMembers', fmInfo).subscribe(function (data) {
            var mems = JSON.parse(data.json).data;
            // console.log("Family member updated successfully");
            //this.tmp = true;
            window.location.reload();
        });
    };
    CartComponent.prototype.getTestDetails = function (id) {
        this.router.navigate(['./book/test-details', { testId: id }]);
    };
    CartComponent.prototype.getSelMem = function (tid) {
        //  this.sel_members[tid]=this.cleanArray(this.sel_members[tid]);
        //console.log("sel_mem",this.sel_members[tid]);
        if (this.sel_members[tid].length > 0) {
            return this.sel_members[tid];
        }
        else {
            return [];
        }
    };
    CartComponent.prototype.getNonSelMem = function (tid) {
        var _this = this;
        // console.log(this.sel_members[tid].length);
        if (this.sel_members[tid].length > 0) {
            // this.sel_members[tid]=[];
            //  return this.members.filter(item =>false );
            return this.members.filter(function (item) { return !_this.uniqueCheck(item, _this.sel_members[tid]); });
        }
        return this.members;
    };
    CartComponent.prototype.getDisplayTypeNames = function (locations) {
        var newaa = [];
        locations.forEach(function (element) {
            if (element.title_id == 1) {
                element.display_type = "Home";
            }
            else if (element.title_id == 2) {
                element.display_type = "Office";
            }
            else if (element.title_id == 3) {
                element.display_type = "Other";
            }
            else {
                element.display_type = "Other";
            }
            newaa.push(element);
        });
        return newaa;
    };
    CartComponent.prototype.getSelLoc = function (tid, mem) {
        var _this = this;
        //console.log(this.sel_locations);
        if (this.sel_locations[tid][mem] !== undefined) {
            var a = this.locations.filter(function (item) { return item.area_id == _this.sel_locations[tid][mem].area_id; });
            return this.getDisplayTypeNames(a);
        }
        else {
            return [];
        }
    };
    CartComponent.prototype.getNonSelLoc = function (tid, mem) {
        var _this = this;
        if (this.sel_locations[tid][mem]) {
            var a = this.locations.filter(function (item) { return item.area_id !== _this.sel_locations[tid][mem].area_id; });
            return this.getDisplayTypeNames(a);
        }
        else {
            var a = this.locations;
            return this.getDisplayTypeNames(a);
        }
    };
    CartComponent.prototype.getSelLabLoc = function (tid, mem) {
        var _this = this;
        if (this.sel_lablocation[tid][mem]) {
            return this.lablocations.filter(function (item) { return item.area_id == _this.sel_lablocation[tid][mem].area_id; });
        }
        else {
            return [];
        }
    };
    CartComponent.prototype.getNonSelLabLoc = function (tid, mem) {
        var _this = this;
        if (this.sel_lablocation[tid][mem]) {
            return this.lablocations.filter(function (item) { return item.area_id !== _this.sel_lablocation[tid][mem].area_id; });
        }
        else {
            return this.lablocations;
        }
    };
    CartComponent.prototype.getLabAddress = function (evnt, tid, mem) {
        var type = evnt;
        this.sel_type[tid][mem] = type;
        //console.log(this.sel_type);
        //  let b=this.elementRef.nativeElement.querySelectorAll('.selloc_'+tid);
        this.setLocStorage();
    };
    CartComponent.prototype.getLabLocations = function (city) {
        var _this = this;
        var b = [];
        this.tests.forEach(function (element) {
            b.push(element.tid);
        });
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetNearestLab', { TokenNo: token, 'serviceid': b.join() }).subscribe(function (data) {
                var d = JSON.parse(data.json);
                if (d.status == 1) {
                    _this.lablocations = d.data;
                }
                else {
                    _this.lablocations = [];
                }
                //console.log(this.lablocations);
                _this.setHcDefault();
            });
        });
        // let t='[{"location_id":1,"location_name":"Tenet Central Lab","address":"Plot no 54, Kineta Towers, Journalist Colony,  Road no. 3","area_id":5,"city_id":1,"state_id":25,"country_id":1,"area":"banjara hills","city":"hyderabad","state":"25 Telangana ","country":"INDIA"}]';
        //  this.lablocations= JSON.parse(t);
    };
    CartComponent.prototype.locationhcset = function (tid, mem) {
        //console.log(this.sel_type[tid][mem]);
        var a;
        if (this.sel_type[tid][mem] == 1) {
            a = true;
        }
        else {
            a = false;
        }
        return a;
    };
    CartComponent.prototype.locationwiset = function (tid, mem) {
        var a;
        if (this.sel_type[tid][mem] == 2) {
            a = true;
        }
        else {
            a = false;
        }
        return a;
    };
    CartComponent.prototype.noModify = function () {
        var a = confirm("Are You Sure?\nYou Want Discard Modify Bill \nand \nAdd it as a New Bill?");
        if (a) {
            this.modify_bill = null;
            this.modi_member = null;
            localStorage.removeItem("modify_bill");
        }
    };
    CartComponent.prototype.getTimeSlots = function () {
        this.timeslots = [{ "id": "3", "slot": "07:00", "display": "07:00 AM" }, { "id": "4", "slot": "07:30", "display": "07:30 AM" }, { "id": "5", "slot": "08:00", "display": "08:00 AM" }, { "id": "6", "slot": "08:30", "display": "08:30 AM" },
            { "id": "7", "slot": "09:00", "display": "09:00 AM" }, { "id": "8", "slot": "09:30", "display": "09:30 AM" }, { "id": "9", "slot": "10:00", "display": "10:00 AM" }, { "id": "10", "slot": "10:30", "display": "10:30 AM" }, { "id": "11", "slot": "11:00", "display": "11:00 AM" },
            { "id": "12", "slot": "11:30", "display": "11:30 AM" }, { "id": "13", "slot": "12:00", "display": "12:00 PM" }, { "id": "14", "slot": "12:30", "display": "12:30 PM" }, { "id": "15", "slot": "13:00", "display": "01:00 PM" }, { "id": "16", "slot": "13:30", "display": "01:30 PM" },
            { "id": "17", "slot": "14:00", "display": "02:00 PM" }, { "id": "18", "slot": "14:30", "display": "02:30 PM" }, { "id": "19", "slot": "15:00", "display": "03:00 PM" }, { "id": "20", "slot": "15:30", "display": "03:30 PM" }, { "id": "21", "slot": "16:00", "display": "04:00 PM" },
            { "id": "22", "slot": "16:30", "display": "04:30 PM" }, { "id": "23", "slot": "17:00", "display": "05:00 PM" }, { "id": "24", "slot": "17:30", "display": "05:30 PM" }, { "id": "25", "slot": "18:00", "display": "06:00 PM" }, { "id": "26", "slot": "18:30", "display": "06:30 PM" },
            { "id": "27", "slot": "19:00", "display": "07:00 PM" }, { "id": "28", "slot": "19:30", "display": "07:30 PM" }, { "id": "29", "slot": "20:00", "display": "08:00 PM" }, { "id": "30", "slot": "20:30", "display": "08:30 PM" }, { "id": "31", "slot": "21:00", "display": "09:00 PM" },
            { "id": "32", "slot": "21:30", "display": "09:30 PM" }, { "id": "33", "slot": "22:00", "display": "10:00 PM" }];
    };
    CartComponent.prototype.setDate = function (date, test, mem) {
        if (this.sel_date[test] == undefined) {
            this.sel_date[test] = [];
        }
        console.log(date);
        // this.sel_date[test][mem]=date.value;
        this.sel_date[test][mem] = date;
        //this.sel_date[test][mem]=this.getDateString(this.sel_date[test][mem]);
        this.set_slot(test, mem);
    };
    CartComponent.prototype.setTime = function (time, test, mem) {
        if (this.sel_time[test] == undefined) {
            this.sel_time[test] = [];
        }
        this.sel_time[test][mem] = time.value;
        // console.log(this.sel_time[test][mem]);
        if (this.sel_slot[test] == undefined) {
            this.sel_slot[test] = [];
        }
        this.set_slot(test, mem);
    };
    CartComponent.prototype.set_slot = function (tid, uid) {
        this.sel_slot[tid][uid] = this.converObjToDate(this.sel_date[tid][uid]) + ' ' + this.sel_time[tid][uid];
        //  console.log(this.sel_slot);
    };
    /* saveFamilyMembers(mem:NgForm,isValid:boolean, uid:number){
      
        if(isValid){
          mem.value.user_id = uid;
          this._api.getToken().subscribe(
            token => {
             mem.value.TokenNo=token;
          this._api.POST('AddFamilyMembers', mem.value).subscribe(data =>{
              let mems=JSON.parse(data.json).data;
              //console.log(mems);
               this.fam = true;
               //window.location.reload
              this.add_family.nativeElement.click();
              swal("<small>Family member added successfully</small>");
              mem.resetForm();
              //console.log("family member added");
              window.location.reload();
             
             });
            });
      
          }else{
      
          }
        
         }*/
    CartComponent.prototype.saveFamilyMembers = function (mem, isValid, uid) {
        var _this = this;
        if (isValid) {
            console.log('age', mem.value.user_dob1.formatted);
            var memAge = this.getAge(mem.value.user_dob1.formatted);
            var a = memAge.split(' ');
            //console.log('memAge',memAge);
            if (a[0] >= 18) {
                this.ph = true;
                // this.otpBtn = true;
                //this.svBtn = false;
                if (mem.value.user_mobile) {
                    mem.value.user_id = uid;
                    this._api.getToken().subscribe(function (token) {
                        mem.value.TokenNo = token;
                        mem.value.user_dob = mem.value.user_dob1.formatted;
                        //console.log('memVal',mem.value);
                        _this._api.POST('AddFamilyMembers', mem.value).subscribe(function (data) {
                            var mems = JSON.parse(data.json).data;
                            console.log('mems', mems);
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
                //console.log('memVal',mem.value.user_dob.formatted);
                //this.ph=true;
                this.ph = false;
                // mem.value.user_id = uid;
                this._api.getToken().subscribe(function (token) {
                    // mem.value.TokenNo=token;
                    // mem.value.user_dob = mem.value.user_dob.formatted;
                    var data = {
                        "TokenNo": token,
                        "user_dob": mem.value.user_dob1.formatted,
                        "user_gender": mem.value.user_gender,
                        "user_id": uid,
                        "user_name": mem.value.user_name,
                        "user_email": mem.value.user_email,
                        "user_mobile": ''
                    };
                    console.log('memVal', data);
                    _this._api.POST('AddFamilyMembers', data).subscribe(function (data) {
                        var mems = JSON.parse(data.json).data;
                        swal("<small>Family member added successfully</small>");
                        _this.add_family.nativeElement.click();
                        _this.ph = false;
                        mem.resetForm();
                        //this.getFamilyMembers(this.user.uid);
                        _this.getUserFamily(_this.user.uid, 0);
                    });
                });
            }
        }
        else {
            window.alert("Please fill all fields");
        }
    };
    CartComponent.prototype.getAge = function (dateString) {
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
    CartComponent.prototype.onDateChanged = function (event) {
        //yyyy-dd-mm
        var memAge = this.getAge(event.formatted); //yyyy/mm/dd
        var a = memAge.split(' ');
        //console.log('memA',memAge);
        if (a[0] >= 18) {
            this.ph = true;
        }
        else {
            this.ph = false;
        }
    };
    CartComponent.prototype.autoTab = function (event) {
        if (event.target.value.length >= event.target.maxLength && event.target.nextElementSibling)
            event.target.nextElementSibling.focus();
    };
    CartComponent.prototype.getMemberOtpVerification = function (form, isValid, memId) {
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
                        swal("<small>Invalid OTP</small>");
                        form.resetForm();
                    }
                    else {
                        if (resp[0].uid != null) {
                            //this.votp=false;
                            swal("<small>OTP verified successfully</small>");
                            form.resetForm();
                            _this.otp_model.nativeElement.click();
                            // this.getFamilyMembers(this.user.uid);
                            _this.getUserFamily(_this.user.uid, 0);
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
    CartComponent.prototype.reset = function (form) {
        form.resetForm();
    };
    CartComponent.prototype.testQuantPlus = function (test) {
        this.bookComponent.getAddTestCart(test, 'test', '');
    };
    CartComponent.prototype.testQuantMinus = function (test) {
        //  console.log(test);
        this.bookComponent.getRemoveTestCart(test, 'test', '');
    };
    CartComponent.prototype.getTestQuant = function (test) {
        var a = 1;
        var stest = JSON.parse(localStorage.getItem('tests'));
        //console.log(stest);
        if (stest) {
            stest.forEach(function (element) {
                if (element.tid === test) {
                    a = element.quant;
                }
            });
        }
        //console.log(a);
        return a;
    };
    CartComponent.prototype.getTotalPricesUp = function () {
        var a = JSON.parse(localStorage.getItem("cartValues"));
        this.tot = a.tot;
        this.hvc = a.hvc;
        this.colc = a.colc;
        return this.tot + this.hvc + this.colc + this.finhvc;
    };
    CartComponent.prototype.userVsQuant = function (test, sel_mems) {
        //  console.log(test.quant)
        //  console.log(sel_mems.length);
        if (this.getTestQuant(test.tid) !== sel_mems.length) {
            return true;
        }
        else {
            return false;
        }
    };
    CartComponent.prototype.removeLocalStorage = function () {
        localStorage.removeItem("sel_locations");
        localStorage.removeItem("sel_members");
        //  localStorage.removeItem("slot_details");
        localStorage.removeItem("sel_lablocation");
        localStorage.removeItem("sel_type");
        //console.log(this.sel_slot);
    };
    /* by sharath for date and time picker start*/
    CartComponent.prototype.getDateString = function (date) {
        //  let a= this.dateparser.format(date);
        console.log(date);
        return date;
        // return date;
    };
    // getDateStruct(ud){
    //   ud=this.GetFormattedDate(ud);
    //   let a= this.dateparser.parse(ud);
    //   return a;
    // }
    CartComponent.prototype.setDate1 = function () {
        var dt = new Date();
        var tdate = this.GetFormattedDate(dt).split("-");
        //console.log(tdate);
        this.model = { date: { year: tdate[2], month: tdate[1], day: tdate[0] } }; //assign date to date-picker
        // console.log(this.model);
    };
    CartComponent.prototype.GetFormattedDate = function (date) {
        var latest_date = this.datePipe.transform(date, 'dd-M-yyyy');
        return latest_date;
    };
    CartComponent.prototype.getSelDate = function (tid, mem) {
        console.log("getseldate", this.sel_date[tid][mem]);
        // return this.sel_date[tid][mem];
        return this.model;
    };
    CartComponent.prototype.getValidTimeSlots = function (tid, mem) {
        // this.timeslots
        var ttime = [];
        // console.log(this.minDate);
        // console.log(this.minDate.date);
        if ((this.sel_date[tid][mem].date.year == this.minDate.date.year) && (this.sel_date[tid][mem].date.month == this.minDate.date.month) && (this.sel_date[tid][mem].date.day == this.minDate.date.day)) {
            var chr = new Date().getHours();
            var cmin = new Date().getMinutes();
            var ctot_1 = (chr * 60) + (cmin) + 90; //90 mins is the buffer time;
            this.timeslots.forEach(function (element) {
                var k = element.slot.split(":");
                var hr = parseInt(k[0]);
                var min = parseInt(k[1]);
                var fin = (hr * 60) + (min);
                if (fin > ctot_1) {
                    ttime.push(element);
                }
            });
            if (this.sel_slot[tid][mem] == undefined) {
                var ktime = [];
                ktime['value'] = ttime[0].slot;
                // console.log(ttime[0]);
                this.setTime(ktime, tid, mem);
            }
            return ttime;
        }
        else {
            if (this.sel_slot[tid][mem] == undefined) {
                var ktime = [];
                ktime['value'] = this.timeslots[0];
                this.setTime(ktime, tid, mem);
            }
            return this.timeslots;
        }
    };
    CartComponent.prototype.converObjToDate = function (date) {
        return date.date.year + '-' + date.date.month + '-' + date.date.day;
    };
    /* by sharath for date and time picker end*/
    CartComponent.prototype.getMTestList = function () {
        var k = JSON.parse(localStorage.getItem('tests'));
        if (k.length !== this.tests.length) {
            this.tests = [];
            this.tests = k;
        }
        return this.tests;
    };
    CartComponent.prototype.getUserName = function (name) {
        if (typeof name == "object") {
            name = name.join(" ");
        }
        return name;
    };
    CartComponent.prototype.getHomeVisitCharges = function () {
        var _this = this;
        var mtest = this.getMTestList();
        if (mtest.length > 0) {
            this.finhvd = [];
            mtest.forEach(function (element) {
                var mem = _this.getSelMem(element.tid);
                mem.forEach(function (element1) {
                    _this.set_slot(element.tid, element1.uid);
                    var time = _this.sel_slot[element.tid][element1.uid];
                    var loc = _this.getSelLoc(element.tid, element1.uid);
                    var kobj = { "time": time, "loc": loc[0].user_loc_id, "user": element1.uid };
                    if (_this.sel_type[element.tid][element1.uid] == 1) {
                        _this.kobjpush(kobj);
                    }
                    else {
                        _this.removeKobj(kobj);
                    }
                });
            });
            //console.log(this.finhvd);
            //console.log(this.getUniqueHVC(this.finhvd));
            var no_of_visits = this.getUniqueHVC(this.finhvd);
            var per_visit_charge = this._appComponent.homoe_visit_charge;
            this.finhvc = no_of_visits * per_visit_charge;
            return this.finhvc;
        }
    };
    CartComponent.prototype.getUniqueHVC = function (objs) {
        var u = [];
        var k = 0;
        objs.forEach(function (element) {
            if (u[element.time] == undefined) {
                u[element.time] = [];
                u[element.time].push(element.loc);
            }
            else {
                if (u[element.time].indexOf(element.loc) < 0) {
                    u[element.time].push(element.loc);
                }
            }
        });
        // console.log(u);
        for (var key in u) {
            var element = u[key];
            k += element.length;
        }
        return k;
    };
    CartComponent.prototype.kobjpush = function (obj) {
        if (this.finhvd.length > 0) {
            if (this.indexOfObj(obj) < 0) {
                this.finhvd.push(obj);
            }
        }
        else {
            this.finhvd.push(obj);
        }
    };
    CartComponent.prototype.removeKobj = function (obj) {
        if (this.finhvd.length > 0) {
            var i = this.indexOfObj(obj);
            if (i >= 0) {
                this.finhvd.splice(i, 1);
            }
        }
    };
    CartComponent.prototype.indexOfObj = function (obj) {
        var a = -1;
        var i = 0;
        this.finhvd.forEach(function (element) {
            if ((element.time === obj.time) && (element.loc === obj.loc) && (element.user === obj.user)) {
                a = i;
            }
            i++;
        });
        return a;
    };
    return CartComponent;
}());
CartComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-cart',
                templateUrl: './cart.component.html',
                styleUrls: ['./cart.component.css'],
                providers: [book_component_1.BookComponent]
            },] },
];
/** @nocollapse */
CartComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: book_component_1.BookComponent, },
    { type: router_1.Router, },
    { type: app_component_1.AppComponent, },
    { type: core_1.ElementRef, },
    { type: common_1.DatePipe, },
]; };
CartComponent.propDecorators = {
    'otpModel': [{ type: core_1.ViewChild, args: ['otpModel',] },],
    'otp_model': [{ type: core_1.ViewChild, args: ['otp_model',] },],
    'add_family': [{ type: core_1.ViewChild, args: ['add_family',] },],
};
exports.CartComponent = CartComponent;
//# sourceMappingURL=cart.component.js.map