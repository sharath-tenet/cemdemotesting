"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var account_component_1 = require("../account/account.component");
var router_1 = require("@angular/router");
var book_component_1 = require("../book/book.component");
var InvoiceComponent = (function () {
    function InvoiceComponent(_api, router, accountComponent, bookComponent) {
        this.router = router;
        this.bookComponent = bookComponent;
        this.pdf = [];
        this.tmp = [];
        this.temp = [];
        this.toArray = [];
        this.order_data = [];
        this.user = [];
        this.userInfo = [];
        this.orderDetails = [];
        this.orderInfo = [];
        this.orderInfo1 = [];
        this.testInstrs = [];
        this.ti = false;
        this.res = [];
        this.loading = [];
        this._api = _api;
        this.accountComponent = accountComponent;
        this.getOrderInvoice();
        this.getOrderDetails();
        this.user = JSON.parse(localStorage.getItem('user'));
    }
    InvoiceComponent.prototype.ngOnInit = function () {
        this.getNearestLab();
        if (JSON.parse(localStorage.getItem('tests')).length > 0) {
            this.bookComponent._appComponent.clearCart();
        }
        window.scrollTo(0, 0);
    };
    InvoiceComponent.prototype.getNearestLab = function () {
        if (localStorage.getItem('nearestLabLocation') === null) {
            this.nearestLabLocation = "";
        }
        else {
            this.nearestLabLocation = JSON.parse(localStorage.getItem('nearestLabLocation'));
        }
    };
    InvoiceComponent.prototype.getOrderInvoice = function () {
        var _this = this;
        this.loading['invoice'] = true;
        if (sessionStorage.getItem('invoice')) {
            var orderInfo_1 = JSON.parse(sessionStorage.getItem('invoice'));
            console.log("my", orderInfo_1);
            console.log('ses', orderInfo_1[0].order_nos);
            if (orderInfo_1[0].order_nos.indexOf(',') > -1) {
                var ord_nos = orderInfo_1[0].order_nos.split(',');
                this.order_data = [];
                var _loop_1 = function (ord_no) {
                    //  console.log('loop',ord_no); // 1, "string", false
                    this_1.pdf = [];
                    this_1._api.getToken().subscribe(function (token) {
                        _this._api.POST('GetOrderInvoice', { TokenNo: token, orderno: ord_no }).subscribe(function (data) {
                            _this.loading['invoice'] = false;
                            _this.tmp = JSON.parse(data.json).data;
                            _this.pdf = { 'message': _this.tmp[0].message, 'ordNo': ord_no };
                            if (_this.pdf) {
                                _this.order_data.push(_this.pdf);
                            }
                        });
                    });
                };
                var this_1 = this;
                for (var _i = 0, ord_nos_1 = ord_nos; _i < ord_nos_1.length; _i++) {
                    var ord_no = ord_nos_1[_i];
                    _loop_1(ord_no);
                }
            }
            else {
                this.pdf = [];
                //console.log('else',orderInfo[0].order_nos);
                this._api.getToken().subscribe(function (token) {
                    _this._api.POST('GetOrderInvoice', { TokenNo: token, orderno: orderInfo_1[0].order_nos }).subscribe(function (data) {
                        _this.loading['invoice'] = false;
                        _this.tmp = JSON.parse(data.json).data;
                        _this.pdf = _this.tmp[0].message;
                        _this.pdf = { 'message': _this.tmp[0].message, 'ordNo': orderInfo_1[0].order_nos };
                        if (_this.pdf) {
                            _this.order_data.push(_this.pdf);
                        }
                        //console.log(this.pdf);
                    });
                });
            }
        }
    };
    InvoiceComponent.prototype.getOrderDetails = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        var orderInfo = JSON.parse(sessionStorage.getItem('invoice'));
        this.loading['details'] = true;
        if (orderInfo[0].order_nos.indexOf(',') > -1) {
            var ord_nos = orderInfo[0].order_nos.split(',');
            this.orderDetails = [];
            var _loop_2 = function (ord_no) {
                this_2._api.getToken().subscribe(function (token) {
                    _this._api.POST('GetOrderDetails', { TokenNo: token, orderno: ord_no, mobileno: '' }).subscribe(function (data) {
                        _this.loading['details'] = false;
                        _this.orderDetails = JSON.parse(data.json).data;
                        if (_this.orderDetails.length > 0) {
                            var ords_1 = [];
                            _this.orderDetails.forEach(function (element) {
                                element.schedule_dt = _this.getHumanDate(element.schedule_dt);
                                _this.getTestInstructions(element.tid);
                                ords_1.push(element);
                                //this.orderInfo.push(element);//org
                            });
                            _this.orderInfo.push(ords_1);
                            console.log('kkk', _this.orderInfo);
                        }
                        else { }
                    });
                });
            };
            var this_2 = this;
            for (var _i = 0, ord_nos_2 = ord_nos; _i < ord_nos_2.length; _i++) {
                var ord_no = ord_nos_2[_i];
                _loop_2(ord_no);
            }
            // console.log(this.orderInfo);
        }
        else {
            var invpdf = void 0;
            this._api.getToken().subscribe(function (token) {
                _this._api.POST('GetOrderDetails', { TokenNo: token, orderno: orderInfo[0].order_nos, mobileno: '' }).subscribe(function (data) {
                    _this.loading['details'] = false;
                    _this.orderInfo1 = JSON.parse(data.json).data;
                    console.log(_this.orderInfo1);
                    _this.orderInfo1.forEach(function (element) {
                        element.schedule_dt = _this.getHumanDate(element.schedule_dt);
                        _this.getTestInstructions(element.tid);
                    });
                    //invpdf = this.getOrderInvoice1(orderInfo[0].order_nos);
                    /*  let valueArr = this.orderInfo.map(function(item){ return item.patient_name });
                       let isDuplicate = valueArr.some(function(item, idx){
                           return valueArr.indexOf(item) != idx ;
                       });
                       console.log('boolean',isDuplicate);*/
                });
            });
        }
        console.log(this.orderInfo);
    };
    InvoiceComponent.prototype.getOrderInvoice1 = function (billNo) {
        /*     let pdf1:any
            this._api.POST('GetOrderInvoice', {TokenNo: 'SomeTokenHere',orderno: billNo}).subscribe(data =>{
                      this.res =JSON.parse(data.json).data;
                     //console.log('getOrderInvoice=',this.res);
                   pdf1 = this.res[0].message;
                      //console.log('pdf',pdf1);
                      return pdf1;
                       });
        */
    };
    InvoiceComponent.prototype.getHumanDate = function (date) {
        date = date.replace("/Date(", "");
        date = date.replace(")/", "");
        date = date.split("+");
        var fdt = parseInt(date[0]);
        var theDate = new Date(fdt);
        var dateString = theDate.toLocaleString();
        /*let hr=date[1].substring(0,2)*60*1000;
        let min=date[1].substring(2,4)*60*1000;
        let fdt=parseInt(date[0])+hr+min;
        let theDate = new Date(fdt);
    
        let dateString = theDate.toUTCString();
        let date1 = theDate.getDate().toString()+'/'+(theDate.getMonth()+1).toString()+'/'+theDate.getFullYear().toString()+'  '+theDate.getTime().toString();
        let date2 =theDate.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2})
        + '/' + (theDate.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2})
        + '/' + theDate.getFullYear();
    
        let dateTimeString = date2 +' '+theDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })*/
        return dateString;
    };
    InvoiceComponent.prototype.getTestInstructions = function (tid) {
        var _this = this;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetOrderInstructions', { TokenNo: token, serviceid: tid }).subscribe(function (data) {
                var inst = JSON.parse(data.json).data;
                // console.log('ti',testInstrs[tid]);
                //console.log('test Instrutions=',this.testInstrs);
                // this.ti=true;
                _this.testInstrs[tid] = [];
                _this.testInstrs[tid] = inst;
                console.log('a', _this.testInstrs[tid][0]);
            });
        });
    };
    InvoiceComponent.prototype.testInst = function () {
        this.ti = false;
    };
    return InvoiceComponent;
}());
InvoiceComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-invoice',
                templateUrl: './invoice.component.html',
                styleUrls: ['./invoice.component.css'],
                providers: [account_component_1.AccountComponent, book_component_1.BookComponent]
            },] },
];
/** @nocollapse */
InvoiceComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: router_1.Router, },
    { type: account_component_1.AccountComponent, },
    { type: book_component_1.BookComponent, },
]; };
exports.InvoiceComponent = InvoiceComponent;
//# sourceMappingURL=invoice.component.js.map