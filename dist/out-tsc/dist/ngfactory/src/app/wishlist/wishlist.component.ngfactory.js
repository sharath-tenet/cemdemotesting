"use strict";
/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = require("./wishlist.component.css.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("@angular/common");
var i3 = require("../../../../../src/app/wishlist/wishlist.component");
var i4 = require("../../../../../src/app/book/book.component");
var i5 = require("../../../../../src/app/common/api.service");
var i6 = require("../../../../../src/app/app.component");
var i7 = require("@angular/router");
var styles_WishlistComponent = [i0.styles];
exports.RenderType_WishlistComponent = i1.ɵcrt({ encapsulation: 0,
    styles: styles_WishlistComponent, data: {} });
function View_WishlistComponent_2(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 43, 'div', [], null, null, null, null, null)), (_l()(),
            i1.ɵted(-1, null, ['\n                    '])), (_l()(), i1.ɵeld(2, 0, null, null, 40, 'div', [['class', 'bs-component']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                        '])), (_l()(), i1.ɵeld(4, 0, null, null, 37, 'table', [['class', 'table table-striped table-hover']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                        '])), (_l()(), i1.ɵeld(6, 0, null, null, 34, 'tbody', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                        '])),
        (_l()(), i1.ɵeld(8, 0, null, null, 12, 'tr', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                            '])), (_l()(), i1.ɵeld(10, 0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(11, null, ['', ''])), (_l()(), i1.ɵted(-1, null, ['\n                            '])),
        (_l()(), i1.ɵeld(13, 0, null, null, 0, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                            '])), (_l()(), i1.ɵeld(15, 0, null, null, 2, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(16, null, ['MRP:', '    Offer-Price:', '    Discount:', '%'])), i1.ɵppd(17, 2), (_l()(),
            i1.ɵted(-1, null, ['\n                            '])), (_l()(), i1.ɵeld(19, 0, null, null, 0, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                       '])), (_l()(), i1.ɵted(-1, null, ['\n                        '])),
        (_l()(), i1.ɵeld(22, 0, null, null, 17, 'tr', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                            '])), (_l()(), i1.ɵeld(24, 0, null, null, 3, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵeld(25, 0, null, null, 1, 'button', [['class', 'btn btn-info btn-sm']], null, [[null, 'click']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('click' === en)) {
                var pd_0 = (_co.getTestDetails(_v.context.$implicit.test_id) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i1.ɵted(-1, null, ['Click Here'])),
        (_l()(), i1.ɵted(-1, null, ['To know More About Test'])), (_l()(), i1.ɵted(-1, null, ['\n                            '])), (_l()(), i1.ɵeld(29, 0, null, null, 0, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                            '])), (_l()(), i1.ɵeld(31, 0, null, null, 2, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵeld(32, 0, null, null, 1, 'button', [['class', 'btn btn-primary btn-sm']], null, [[null,
                'click']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('click' === en)) {
                var pd_0 = (_co.getAddTestCart2(_v.context.$implicit) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i1.ɵted(-1, null, ['Add to Cart'])),
        (_l()(), i1.ɵted(-1, null, ['\n                           '])), (_l()(),
            i1.ɵted(-1, null, ['\n                           '])), (_l()(), i1.ɵeld(36, 0, null, null, 2, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵeld(37, 0, null, null, 1, 'a', [['href', 'javascript:void(0)']], null, [[null,
                'click']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('click' === en)) {
                var pd_0 = (_co.deleteWishlistItem(_co.user.uid, _v.context.$implicit.test_id) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i1.ɵeld(38, 0, null, null, 0, 'i', [['aria-hidden', 'true'], ['class', 'fa fa-trash-o']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                        '])), (_l()(), i1.ɵted(-1, null, ['\n                        '])),
        (_l()(), i1.ɵted(-1, null, ['\n                        '])), (_l()(), i1.ɵted(-1, null, [' \n                    '])), (_l()(), i1.ɵted(-1, null, ['\n                ']))], null, function (_ck, _v) {
        var currVal_0 = _v.context.$implicit.test_name;
        _ck(_v, 11, 0, currVal_0);
        var currVal_1 = _v.context.$implicit.test_price;
        var currVal_2 = _v.context.$implicit.final_price;
        var currVal_3 = i1.ɵunv(_v, 16, 2, _ck(_v, 17, 0, i1.ɵnov(_v.parent.parent, 0), (100 - ((_v.context.$implicit.final_price / _v.context.$implicit.final_price) * 100)), '1.2-2'));
        _ck(_v, 16, 0, currVal_1, currVal_2, currVal_3);
    });
}
function View_WishlistComponent_1(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, 'div', [['class',
                'col-lg-15']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['\n                '])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_WishlistComponent_2)), i1.ɵdid(3, 802816, null, 0, i2.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], { ngForOf: [0, 'ngForOf'] }, null), (_l()(), i1.ɵted(-1, null, ['\n\n            ']))], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.wishList;
        _ck(_v, 3, 0, currVal_0);
    }, null);
}
function View_WishlistComponent_3(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 19, 'div', [['class',
                'col-lg-15']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['\n                '])), (_l()(), i1.ɵeld(2, 0, null, null, 16, 'div', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                    '])), (_l()(), i1.ɵeld(4, 0, null, null, 13, 'div', [['class', 'bs-component']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                        '])),
        (_l()(), i1.ɵeld(6, 0, null, null, 10, 'table', [['class', 'table table-striped table-hover ']], null, null, null, null, null)),
        (_l()(), i1.ɵted(-1, null, ['\n                        '])), (_l()(), i1.ɵeld(8, 0, null, null, 7, 'tbody', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                        '])), (_l()(), i1.ɵeld(10, 0, null, null, 4, 'tr', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n                            '])),
        (_l()(), i1.ɵeld(12, 0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['Sorry For The Inconviniance,No Test Available'])), (_l()(),
            i1.ɵted(-1, null, ['\n                       '])), (_l()(), i1.ɵted(-1, null, ['\n                        '])), (_l()(), i1.ɵted(-1, null, ['\n                        '])), (_l()(), i1.ɵted(-1, null, [' \n                    '])),
        (_l()(), i1.ɵted(-1, null, ['\n                '])), (_l()(), i1.ɵted(-1, null, ['\n            ']))], null, null);
}
function View_WishlistComponent_0(_l) {
    return i1.ɵvid(0, [i1.ɵpid(0, i2.DecimalPipe, [i1.LOCALE_ID]), (_l()(), i1.ɵted(-1, null, [' '])), (_l()(), i1.ɵeld(2, 0, null, null, 30, 'div', [['class', 'content'],
            ['style', 'min-height:800px;']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n    '])), (_l()(), i1.ɵeld(4, 0, null, null, 27, 'div', [['class', 'container']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n\n '])), (_l()(), i1.ɵeld(6, 0, null, null, 12, 'ul', [['class', 'breadcrumb']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n    '])), (_l()(), i1.ɵeld(8, 0, null, null, 2, 'li', [['class', 'breadcrumb-item']], null, null, null, null, null)), (_l()(), i1.ɵeld(9, 0, null, null, 1, 'a', [['href', '/']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['Home'])), (_l()(), i1.ɵted(-1, null, ['\n    '])), (_l()(), i1.ɵeld(12, 0, null, null, 2, 'li', [['class', 'breadcrumb-item']], null, null, null, null, null)), (_l()(), i1.ɵeld(13, 0, null, null, 1, 'a', [['href', '/book']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['Test'])), (_l()(), i1.ɵted(-1, null, ['\n    '])), (_l()(), i1.ɵeld(16, 0, null, null, 1, 'li', [['class', 'breadcrumb-item active']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['Wishlist'])), (_l()(), i1.ɵted(-1, null, ['\n '])), (_l()(),
            i1.ɵted(-1, null, ['\n\n'])), (_l()(), i1.ɵeld(20, 0, null, null, 10, 'div', [['class', 'rightCol'], ['style', 'min-height:800px;']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['\n '])), (_l()(), i1.ɵeld(22, 0, null, null, 7, 'div', [['id', 'Wishlist']], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ['        \n              '])),
        (_l()(), i1.ɵand(16777216, null, null, 1, null, View_WishlistComponent_1)),
        i1.ɵdid(25, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, 'ngIf'] }, null), (_l()(), i1.ɵted(-1, null, ['\n            '])),
        (_l()(), i1.ɵand(16777216, null, null, 1, null, View_WishlistComponent_3)),
        i1.ɵdid(28, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, 'ngIf'] }, null), (_l()(), i1.ɵted(-1, null, ['\n           '])),
        (_l()(), i1.ɵted(-1, null, ['\n\n'])), (_l()(), i1.ɵted(-1, null, ['\n\n'])), (_l()(), i1.ɵted(-1, null, ['\n'])), (_l()(), i1.ɵted(-1, null, ['\n  ']))], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = (((_co.wishList == null) ? null : _co.wishList.length) > 0);
        _ck(_v, 25, 0, currVal_0);
        var currVal_1 = (((_co.wishList == null) ? null : _co.wishList.length) == 0);
        _ck(_v, 28, 0, currVal_1);
    }, null);
}
exports.View_WishlistComponent_0 = View_WishlistComponent_0;
function View_WishlistComponent_Host_0(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, 'app-wishlist', [], null, null, null, View_WishlistComponent_0, exports.RenderType_WishlistComponent)), i1.ɵprd(512, null, i4.BookComponent, i4.BookComponent, [i5.ApiService, i6.AppComponent, i7.Router, i7.ActivatedRoute, i1.ElementRef]), i1.ɵdid(2, 114688, null, 0, i3.WishlistComponent, [i7.Router, i5.ApiService, i4.BookComponent], null, null)], function (_ck, _v) {
        _ck(_v, 2, 0);
    }, null);
}
exports.View_WishlistComponent_Host_0 = View_WishlistComponent_Host_0;
exports.WishlistComponentNgFactory = i1.ɵccf('app-wishlist', i3.WishlistComponent, View_WishlistComponent_Host_0, {}, {}, []);
//# sourceMappingURL=wishlist.component.ngfactory.js.map