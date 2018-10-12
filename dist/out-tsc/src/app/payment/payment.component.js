"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var PaymentComponent = (function () {
    function PaymentComponent(router, rou) {
        this.router = router;
        this.rou = rou;
        this.tokenCheck();
        this.testCheck();
        if (this.paymentOpt == '3') {
            this.demoSuccess();
        }
        this.transtoken = this.rou.snapshot.paramMap.get('token');
        console.log(this.transtoken);
    }
    PaymentComponent.prototype.ngAfterViewInit = function () {
        this.sub();
    };
    PaymentComponent.prototype.ngOnInit = function () {
        window.scrollTo(0, 0);
    };
    PaymentComponent.prototype.tokenCheck = function () {
        if (localStorage.getItem('token') === null) {
            this.isTokenSet = false;
        }
        else {
            this.isTokenSet = true;
            if (JSON.parse(localStorage.getItem('user'))) {
                this.user = JSON.parse(localStorage.getItem('user'));
            }
            this.paymentOpt = localStorage.getItem("paymentOpt");
        }
    };
    PaymentComponent.prototype.sub = function () {
        this.payform.nativeElement.submit();
    };
    PaymentComponent.prototype.testCheck = function () {
        if (this.isTokenSet) {
            this.invoice = JSON.parse(localStorage.getItem('invoice'))[0];
            this.txn_amount = JSON.parse(localStorage.getItem('tempTotal'));
            //  console.log(this.txn_amount);
            //bring all test details name,location,slot time and date
            //payment gateway redirection here
        }
    };
    PaymentComponent.prototype.demoSuccess = function () {
        this.router.navigate(['./invoice']);
    };
    return PaymentComponent;
}());
PaymentComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-payment',
                templateUrl: './payment.component.html',
                styleUrls: ['./payment.component.css']
            },] },
];
/** @nocollapse */
PaymentComponent.ctorParameters = function () { return [
    { type: router_1.Router, },
    { type: router_1.ActivatedRoute, },
]; };
PaymentComponent.propDecorators = {
    'payform': [{ type: core_1.ViewChild, args: ['payform',] },],
};
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=payment.component.js.map