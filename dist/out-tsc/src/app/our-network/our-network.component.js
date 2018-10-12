"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var api_service_1 = require("../common/api.service");
var app_component_1 = require("../app.component");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
var OurNetworkComponent = (function () {
    function OurNetworkComponent(_api, router, _appComponent) {
        var _this = this;
        this._api = _api;
        this.router = router;
        this.searchTerm = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]);
        this.searchResult = [];
        this._packages = [];
        this.tokenSet = false;
        this.mpckgshow = true;
        this.ser_string = "";
        this.top_tests = ["Complete Blood Picture (CBP), EDTA Whole Blood", "Lipid Profile, Serum", "Liver Function Test (LFT), Serum", "Thyroid Antibodies (TG & TPO), Serum", "Thyroid Profile (T3,T4,TSH), Serum", "1, 25-Dihydroxy Vitamin D, Serum", "25 - Hydroxy Vitamin D, Serum", "Urea, Serum", "Creatinine, Serum", "Triple Marker, Serum", "Magnesium, Serum",
            "Complete Urine Examination (CUE), Spot Urine", "Glucose Fasting (FBS),  Sodium Flouride Plasma", "Glycosylated Hemoglobin (HbA1C), EDTA Whole Blood", "Uric Acid, Serum", "Thyroglobulin (Tg), Serum", "Blood Urea Nitrogen (BUN), Serum", "Prolactin, Serum", "Prothrombin Time With INR, Sodium Citrate Whole Blood", "HIV 1 & 2 Antibodies, Serum", "Culture And Sensitivity (Aerobic), Urine"];
        this._appComponent = _appComponent;
        this.tokenSet = this._appComponent.isLoggedIn;
        this._api = _api;
        //AutoComplete search
        this.searchTerm.valueChanges
            .debounceTime(400)
            .subscribe(function (data) {
            var term = new String(data);
            if (term.length >= 3) {
                _this._api.getToken().subscribe(function (token) {
                    _this._api.POST('GetServices', { TokenNo: token, pincode: '', test_name: data, test_code: '', test_type: '', condition_id: '', speciality_id: '', sort_by: '', sort_order: '', AlphaSearch: '', user_id: '', is_home_collection: "", organ_id: "" }).subscribe(function (data) {
                        if (data.status == 1) {
                            _this.searchResult = JSON.parse(data.json).data;
                        }
                        else {
                            _this.searchResult = [];
                        }
                    });
                });
                _this._api.getToken().subscribe(function (token) {
                    _this._api.POST('GetPackages', { TokenNo: token, "pincode": "", "package_name": data, "package_code": "", "sort_by": "", "sort_order": "", "alphaSearch": "", organ_id: "", type: "H" }).subscribe(function (data) {
                        if (data.status == 1) {
                            _this._packagesSearchResult = JSON.parse(data.json).data;
                            //this.testsList=[];
                        }
                        else {
                            _this._packagesSearchResult = [];
                        }
                    });
                });
            }
        });
    }
    OurNetworkComponent.prototype.ngOnInit = function () {
        window.scrollTo(0, 0);
    };
    //SELCTION ITEM METHOD.
    OurNetworkComponent.prototype.select = function (item, type) {
        this.filterKey = new String(item);
        var re = / /gi;
        var fk;
        fk = this.filterKey.replace(re, "_");
        fk = fk.replace("(", "__,_");
        fk = fk.replace(")", "_,__");
        this.searchResult = [];
        this._packages = [];
        if (type == "test") {
            window.location.href = "./test-details/" + fk;
        }
        else if (type = "package") {
            window.location.href = "./package-details/" + fk;
        }
        // this.filteredItems = [];
    };
    OurNetworkComponent.prototype.searchBasedOnString = function (str) {
        this.router.navigate(['./book', { searchString: str }]);
    };
    OurNetworkComponent.prototype.movescaro = function (obj, dir) {
        if (dir == "left") {
            obj.previous();
        }
        else if (dir == "right") {
            obj.next();
        }
    };
    OurNetworkComponent.prototype.loginSubmit = function (form, isValid) {
        //console.log(form.value, isValid);
        var _this = this;
        var data = {
            "TokenNo": "",
            "login_username": form.value.phone,
            "password": form.value.password1
        };
        /*  if(rm==true){
           var date = new Date();
           var midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
           //Cookies.set('visits', number, { expires: midnight });
    
            this._cookieService.put(newLocal, username, {expires:midnight});
    
            this._cookieService.put('PASSWORD', password, {expires:midnight});
    
            this._cookieService.put('RM', "true", {expires:midnight});
          }else{
            this._cookieService.removeAll();
          }*/
        if (isValid) {
            this._api.getToken().subscribe(function (token) {
                data.TokenNo = token;
                _this._api.POST('GetLoginUser', data).subscribe(function (data) {
                    var res = JSON.parse(data.json).data;
                    if (res == undefined) {
                        swal("<small>Invalid Authentication.</small>");
                        form.resetForm();
                    }
                    else {
                        //console.log('res',res);
                        if (res[0].user_token != null) {
                            localStorage.setItem('token', res[0].user_token);
                            localStorage.setItem('user', JSON.stringify(res[0]));
                            //get temp cart data
                            // this.getCartData();
                            _this.redir('order-history');
                            console.log("logged in successfully");
                            //swal("<small>Logged in successfully</small>");
                        }
                        else {
                            console.log("invalid authentication");
                            //swal("<small>Invalid Authentication.</small>");
                            form.resetForm();
                        }
                    }
                });
            });
        }
        else {
            console.log("");
        }
    };
    OurNetworkComponent.prototype.getPopularTests = function (strng) {
        if (strng === '') {
            return this.top_tests;
        }
        else {
            return [];
        }
    };
    //book a test and status blocks
    OurNetworkComponent.prototype.getBookAnAppointment = function () {
        this.router.navigate(['./book']);
    };
    OurNetworkComponent.prototype.redir = function (val) {
        window.location.href = "./" + val;
    };
    OurNetworkComponent.prototype.getOTP = function () {
        this._appComponent.toLogin();
    };
    return OurNetworkComponent;
}());
OurNetworkComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-our-network',
                templateUrl: './our-network.component.html',
                styleUrls: ['./our-network.component.css']
            },] },
];
/** @nocollapse */
OurNetworkComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: router_1.Router, },
    { type: app_component_1.AppComponent, },
]; };
exports.OurNetworkComponent = OurNetworkComponent;
//# sourceMappingURL=our-network.component.js.map