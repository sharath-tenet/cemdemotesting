"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EqualValidator = (function () {
    function EqualValidator(validateEqual) {
        this.validateEqual = validateEqual;
    }
    EqualValidator.prototype.validate = function (c) {
        // self value (e.g. retype password)
        var v = c.value;
        // control value (e.g. password)
        var e = c.root.get(this.validateEqual);
        // value not equal
        if (e && v !== e.value)
            return {
                validateEqual: false
            };
        return null;
    };
    return EqualValidator;
}());
EqualValidator.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
                providers: [
                    { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return EqualValidator; }), multi: true }
                ]
            },] },
];
/** @nocollapse */
EqualValidator.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Attribute, args: ['validateEqual',] },] },
]; };
exports.EqualValidator = EqualValidator;
//# sourceMappingURL=password.match.directive.js.map