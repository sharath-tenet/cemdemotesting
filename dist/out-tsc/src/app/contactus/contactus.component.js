"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var ContactusComponent = (function () {
    function ContactusComponent(_api) {
        this._api = _api;
        this.msg = null;
    }
    ContactusComponent.prototype.ngOnInit = function () {
        window.scrollTo(0, 0);
    };
    ContactusComponent.prototype.contactusSubmit = function (form, isValid) {
        var _this = this;
        console.log(form.valid);
        if (form.valid) {
            form.value.purpose = "1";
            this._api.getToken().subscribe(function (token) {
                form.value.TokenNo = token;
                _this._api.POST('ContactUs', form.value).subscribe(function (data) {
                    var responce = JSON.parse(data.json).data;
                    _this.msg = responce[0].message;
                    form.resetForm();
                });
            });
        }
    };
    return ContactusComponent;
}());
ContactusComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-contactus',
                templateUrl: './contactus.component.html',
                styleUrls: ['./contactus.component.css']
            },] },
];
/** @nocollapse */
ContactusComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
]; };
exports.ContactusComponent = ContactusComponent;
//# sourceMappingURL=contactus.component.js.map