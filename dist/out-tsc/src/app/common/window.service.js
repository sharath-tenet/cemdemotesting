"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WindowService = (function () {
    function WindowService() {
    }
    Object.defineProperty(WindowService.prototype, "windowRef", {
        get: function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    return WindowService;
}());
WindowService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
WindowService.ctorParameters = function () { return []; };
exports.WindowService = WindowService;
//# sourceMappingURL=window.service.js.map