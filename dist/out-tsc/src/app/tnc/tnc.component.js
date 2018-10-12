"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TncComponent = (function () {
    function TncComponent() {
    }
    TncComponent.prototype.ngOnInit = function () {
        window.scrollTo(0, 0);
    };
    return TncComponent;
}());
TncComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-tnc',
                templateUrl: './tnc.component.html',
                styleUrls: ['./tnc.component.css']
            },] },
];
/** @nocollapse */
TncComponent.ctorParameters = function () { return []; };
exports.TncComponent = TncComponent;
//# sourceMappingURL=tnc.component.js.map