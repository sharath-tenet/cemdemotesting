"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var WalletComponent = (function () {
    function WalletComponent(_api) {
        this.isTokenSet = false;
        this.user = [];
        this.wallet = [];
        this.wa = [];
        this.addW = false;
        this.tmp = false;
        this.updatedWI = [];
        this.walletHistory = [];
        this._api = _api;
    }
    WalletComponent.prototype.ngOnInit = function () {
        this.tokenCheck();
        this.GetWallet();
        this.GetWalletHistory();
    };
    WalletComponent.prototype.tokenCheck = function () {
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
    WalletComponent.prototype.GetWallet = function () {
        var _this = this;
        // console.log(this.user.uid);
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetWallet', { 'TokenNo': token, 'userid': _this.user.uid }).subscribe(function (data) {
                _this.wallet = JSON.parse(data.json).data;
                if (_this.wallet == undefined) {
                    _this.wa.wallet_amount = 0;
                }
                else {
                    _this.wa = _this.wallet[0];
                }
            });
        });
    };
    WalletComponent.prototype.AW = function () {
        this.addW = true;
        this.tmp = false;
    };
    WalletComponent.prototype.hm2 = function () {
        this.addW = false;
        this.tmp = true;
    };
    WalletComponent.prototype.GetWalletHistory = function () {
        var _this = this;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetWalletHistory', { 'TokenNo': token, 'userid': _this.user.uid }).subscribe(function (data) {
                _this.walletHistory = JSON.parse(data.json).data;
                if (_this.walletHistory == undefined) {
                    _this.walletHistory = [];
                }
                else {
                    for (var key in _this.walletHistory) {
                        _this.walletHistory[key].create_date = _this.getHumanDate(_this.walletHistory[key].create_date);
                    }
                }
            });
        });
    };
    WalletComponent.prototype.addAmount = function (form) {
        var _this = this;
        //	console.log('wform==',form);
        var data = {
            "TokenNo": 'SomeTokenHere',
            "userid": form.userid,
            "type": 1,
            "amount": form.amount
        };
        this._api.getToken().subscribe(function (token) {
            data.TokenNo = token;
            _this._api.POST('UpdateWallet', data).subscribe(function (data) {
                _this.updatedWI = JSON.parse(data.json).data;
                console.log(_this.updatedWI[0].message);
                _this.tmp = true;
                _this.GetWallet();
                _this.GetWalletHistory();
            });
        });
    };
    WalletComponent.prototype.getHumanDate = function (dt) {
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
    return WalletComponent;
}());
WalletComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-wallet',
                templateUrl: './wallet.component.html',
                styleUrls: ['./wallet.component.css']
            },] },
];
/** @nocollapse */
WalletComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
]; };
exports.WalletComponent = WalletComponent;
//# sourceMappingURL=wallet.component.js.map