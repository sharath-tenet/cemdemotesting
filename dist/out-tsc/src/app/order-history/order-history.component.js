"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var router_1 = require("@angular/router");
var OrderHistoryComponent = (function () {
    function OrderHistoryComponent(_api, router) {
        this.router = router;
        this.user = [];
        this.isTokenSet = false;
        this.myFinalizedOrders = [];
        this.billDetails = [];
        this.partient_name = "NA";
        this.tbill_no = null;
        this.loading = [];
        this._api = _api;
    }
    OrderHistoryComponent.prototype.ngOnInit = function () {
        this.tokenCheck();
        this.getHistory();
        window.scrollTo(0, 0);
    };
    OrderHistoryComponent.prototype.tokenCheck = function () {
        if (localStorage.getItem('token') === null) {
            this.isTokenSet = false;
        }
        else {
            this.isTokenSet = true;
            if (JSON.parse(localStorage.getItem('user'))) {
                this.user = JSON.parse(localStorage.getItem('user'));
            }
        }
    };
    OrderHistoryComponent.prototype.getHistory = function () {
        var _this = this;
        this.loading['getBills'] = true;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetFinalizedOrderHistory', { TokenNo: token, 'patientid': _this.user.uid, 'mobileno': '' }).subscribe(function (data) {
                _this.myFinalizedOrders = JSON.parse(data.json).data;
                console.log(_this.myFinalizedOrders);
                if (_this.myFinalizedOrders == undefined) {
                    _this.myFinalizedOrders = [];
                    _this.loading['getBills'] = false;
                }
                else if (_this.myFinalizedOrders.length > 0) {
                    _this.myFinalizedOrders = _this.getBilltoArray(_this.myFinalizedOrders);
                }
                _this.loading['getBills'] = false;
            });
        });
    };
    OrderHistoryComponent.prototype.getBilltoArray = function (finalizedOrders) {
        // var i=0;
        var retArray = [];
        finalizedOrders.forEach(function (val) {
            var a = val.order_nos.split(",");
            val.order_nos = a;
            retArray.push(val);
            // i++;
        });
        retArray = retArray.sort();
        console.log(retArray);
        return retArray;
    };
    OrderHistoryComponent.prototype.getBillDetails = function (bill_no) {
        var _this = this;
        //// 
        // console.log(bill_no);
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
    OrderHistoryComponent.prototype.getHumanDate = function (dt) {
        dt = dt.replace("/Date(", "");
        dt = dt.replace(")/", "");
        dt = dt.split("+");
        var hr = dt[1].substring(0, 2) * 60 * 1000;
        var min = dt[1].substring(2, 4) * 60 * 1000;
        var fdt = parseInt(dt[0]) + hr + min;
        var theDate = new Date(fdt);
        var dateString = theDate.toUTCString();
        return dateString;
    };
    OrderHistoryComponent.prototype.deleteService = function (order_id, tid, bill_no) {
        // swal("Sorry this service is currently unavailable,Please contact our customer care!!! \n9900099000");
        // return;
        //  let res=confirm("Are you sure? \nDo you want to remove this service?");
        // if(res){
        //   // 
        //   this.tbill_no=bill_no;
        //   this._api.POST('CancelOrder', {token: 'SomeTokenHere','orderid':order_id,'serviceid':tid}).subscribe(data =>{
        //     this.billDetails=JSON.parse(data.json).data;
        //  // console.log(this.billDetails);
        //  this.addCancelAmountTowallet(this.tbill_no);
        //     });
        // }
    };
    OrderHistoryComponent.prototype.addCancelAmountTowallet = function (tbill_no) {
        //update wallet here
        this.getBillDetails(tbill_no);
    };
    OrderHistoryComponent.prototype.addMore = function (bill_no) {
        // console.log();
        swal("Sorry this service is currently unavailable,Please contact our customer care!!! \n9900099000");
        return;
        // localStorage.setItem("modify_bill",bill_no);
        // let m={"uid":this.billDetails[0].id,"user_name":this.billDetails[0].patient_name}
        // localStorage.setItem("modi_member",JSON.stringify(m));
        // this.router.navigate(['./book']);
    };
    OrderHistoryComponent.prototype.downloadReport = function (tid, bill_no) {
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
    OrderHistoryComponent.prototype.previewReport = function (file) {
        window.open('http://208.163.37.165/Intgcems/orderinvoice/' + file, '_blank');
    };
    return OrderHistoryComponent;
}());
OrderHistoryComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-order-history',
                templateUrl: './order-history.component.html',
                styleUrls: ['./order-history.component.css']
            },] },
];
/** @nocollapse */
OrderHistoryComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: router_1.Router, },
]; };
exports.OrderHistoryComponent = OrderHistoryComponent;
//# sourceMappingURL=order-history.component.js.map