"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** Pass untouched request through to the next request handler. */
var NoopInterceptor = (function () {
    function NoopInterceptor() {
    }
    NoopInterceptor.prototype.intercept = function (req, next) {
        return next.handle(req);
    };
    return NoopInterceptor;
}());
NoopInterceptor.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NoopInterceptor.ctorParameters = function () { return []; };
exports.NoopInterceptor = NoopInterceptor;
//# sourceMappingURL=noop-interceptor.js.map