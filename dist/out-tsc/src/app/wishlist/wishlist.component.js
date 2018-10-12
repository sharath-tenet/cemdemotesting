"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var book_component_1 = require("../book/book.component");
var router_1 = require("@angular/router");
var WishlistComponent = (function () {
    function WishlistComponent(router, _api, _bookComponent) {
        this.router = router;
        this.user = [];
        this.obj = [];
        this.wishList = [];
        this.wishlistItems = [];
        this.temp = [];
        this._api = _api;
        this._bookComponent = _bookComponent;
        this.getTestWishList();
    }
    WishlistComponent.prototype.ngOnInit = function () {
    };
    WishlistComponent.prototype.getTestWishList = function () {
        var _this = this;
        var flag = 1;
        this.user = localStorage.getItem("user");
        this.user = JSON.parse(this.user);
        console.log("uid=", this.user.uid, flag);
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetTestWishList', { "TokenNo": token, "uid": _this.user.uid, "flag": flag }).subscribe(function (data) {
                _this.wishList = JSON.parse(data.json).data;
                console.log(_this.wishList);
                /*this.wishList.forEach(element => {
                  this.wishList.push(element);
                  });
                localStorage.setItem('wishlist',JSON.stringify(this.wishList));*/
            });
        });
    };
    WishlistComponent.prototype.getTestDetails = function (id) {
        this.router.navigate(['./book/test-details', { testId: id }]);
    };
    WishlistComponent.prototype.getAddTestCart2 = function (tests) {
        this._bookComponent.getAddTestCart(tests, 'test', '');
        // this.route.navigate(['./book']);
    };
    WishlistComponent.prototype.deleteWishlistItem = function (uid, tid) {
        var _this = this;
        this.status = 'D';
        var loc_id = 1;
        var is_wishlist = 1;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('AddtoWishList', { "TokenNo": token, "uid": uid, "test_id": tid, "loc_id": loc_id, "status": _this.status, "is_wishlist": is_wishlist }).subscribe(function (data) {
                _this.wishList = JSON.parse(data.json).data;
                //console.log("res=",this.wishList);
            });
        });
    };
    return WishlistComponent;
}());
WishlistComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-wishlist',
                templateUrl: './wishlist.component.html',
                styleUrls: ['./wishlist.component.css'],
                providers: [book_component_1.BookComponent]
            },] },
];
/** @nocollapse */
WishlistComponent.ctorParameters = function () { return [
    { type: router_1.Router, },
    { type: api_service_1.ApiService, },
    { type: book_component_1.BookComponent, },
]; };
exports.WishlistComponent = WishlistComponent;
//# sourceMappingURL=wishlist.component.js.map