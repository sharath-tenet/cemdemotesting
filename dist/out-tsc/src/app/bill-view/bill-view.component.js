"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var router_1 = require("@angular/router");
var app_component_1 = require("../app.component");
var BillViewComponent = (function () {
    function BillViewComponent(_api, router, route, app) {
        this._api = _api;
        this.router = router;
        this.route = route;
        this.app = app;
        this.loading = [];
        this.statusMan = { "Bill Done": 1, "Collected Samples": 2, "Sample Received": 3, "Result Done": 4, "Verified": 5, "Approved": 6, "Dispatched": 7 };
        this.loading['billDetails'] = false;
    }
    BillViewComponent.prototype.ngOnInit = function () {
        this.bill_no = this.router.snapshot.paramMap.get('bill');
        if (this.app.isLoggedIn) {
            this.getBillDetails(this.bill_no);
        }
        else {
            this.route.navigate(['./login']);
        }
    };
    BillViewComponent.prototype.getBillDetails = function (bill_no) {
        //// 
        // console.log(bill_no);
        var _this = this;
        //  this.router.navigate(['./bill-view']);
        this.loading['billDetails'] = true;
        this.billDetails = [];
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetOrderDetails', { TokenNo: token, 'orderno': bill_no, 'mobileno': '' }).subscribe(function (data) {
                _this.billDetails = JSON.parse(data.json).data;
                var i = 0;
                _this.billDetails.forEach(function (element) {
                    _this.billDetails[i]['test_status'] = _this.getStatusNumber(element.test_status);
                    i++;
                });
                console.log(_this.billDetails);
                _this.partient_name = _this.billDetails[0].patient_name;
                _this.loading['billDetails'] = false;
            });
        });
    };
    BillViewComponent.prototype.getStatusNumber = function (val) {
        if (this.statusMan[val]) {
            return this.statusMan[val];
        }
        else {
            return 0;
        }
    };
    BillViewComponent.prototype.downloadReport = function (tid, bill_no) {
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
    BillViewComponent.prototype.previewReport = function (file) {
        window.open('http://208.163.37.165/Intgcems/orderinvoice/' + file, '_blank');
    };
    return BillViewComponent;
}());
BillViewComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-bill-view',
                templateUrl: './bill-view.component.html',
                styleUrls: ['./bill-view.component.css']
            },] },
];
/** @nocollapse */
BillViewComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: router_1.ActivatedRoute, },
    { type: router_1.Router, },
    { type: app_component_1.AppComponent, },
]; };
exports.BillViewComponent = BillViewComponent;
//# sourceMappingURL=bill-view.component.js.map