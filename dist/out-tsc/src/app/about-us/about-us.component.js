"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var router_1 = require("@angular/router");
var app_component_1 = require("../app.component");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
var AboutUsComponent = (function () {
    function AboutUsComponent(_api, router, _appComponent) {
        var _this = this;
        this._api = _api;
        this.router = router;
        this._packagesSearchResult = [];
        this.searchTerm = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]);
        this.searchResult = [];
        this._packages = [];
        this.top_tests = ["Complete Blood Picture (CBP), EDTA Whole Blood", "Lipid Profile, Serum", "Liver Function Test (LFT), Serum", "Thyroid Antibodies (TG & TPO), Serum", "Thyroid Profile (T3,T4,TSH), Serum", "1, 25-Dihydroxy Vitamin D, Serum", "25 - Hydroxy Vitamin D, Serum", "Urea, Serum", "Creatinine, Serum", "Triple Marker, Serum", "Magnesium, Serum",
            "Complete Urine Examination (CUE), Spot Urine", "Glucose Fasting (FBS),  Sodium Flouride Plasma", "Glycosylated Hemoglobin (HbA1C), EDTA Whole Blood", "Uric Acid, Serum", "Thyroglobulin (Tg), Serum", "Blood Urea Nitrogen (BUN), Serum", "Prolactin, Serum", "Prothrombin Time With INR, Sodium Citrate Whole Blood", "HIV 1 & 2 Antibodies, Serum", "Culture And Sensitivity (Aerobic), Urine"];
        this.loading = [];
        this.mpckgshow = false;
        this._pckg = [];
        this.tmp = [];
        this.tokenSet = false;
        this._appComponent = [];
        this.ser_string = "";
        this._appComponent = _appComponent;
        this.tokenSet = this._appComponent.isLoggedIn;
        this.queryString;
        this.searchTerm.valueChanges
            .debounceTime(400)
            .subscribe(function (data) {
            var term = new String(data);
            if (data == undefined) {
                _this.mpckgshow = false;
                return false;
            }
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
                    _this._api.POST('GetPackages', { TokenNo: token, "pincode": "", "package_name": data, "package_code": "", "sort_by": "", "sort_order": "", "alphaSearch": "", "type": "" }).subscribe(function (data) {
                        if (data.status == 1) {
                            _this._packagesSearchResult = JSON.parse(data.json).data;
                            //this.testsList=[];
                        }
                        else {
                            _this._packagesSearchResult = [];
                        }
                        _this.mpckgshow = true;
                    });
                });
            }
        });
    }
    AboutUsComponent.prototype.ngOnInit = function () {
        window.scrollTo(0, 0);
    };
    AboutUsComponent.prototype.getPopularTests = function (strng) {
        if (strng === '') {
            return this.top_tests;
        }
        else {
            return [];
        }
    };
    AboutUsComponent.prototype.searchBasedOnString = function (str) {
        if (str != undefined) {
            this.router.navigate(['./book', { searchString: str }]);
        }
        else {
            return false;
        }
    };
    //SELCTION ITEM METHOD.
    AboutUsComponent.prototype.select = function (item, type) {
        this.filterKey = new String(item);
        this.searchResult = [];
        this._packages = [];
        var re = / /gi;
        var fk;
        fk = this.filterKey.replace(re, "_");
        fk = fk.replace("(", "__,_");
        fk = fk.replace(")", "_,__");
        if (type == "test") {
            window.location.href = "./test-details/" + fk;
        }
        else if (type = "package") {
            window.location.href = "./package-details/" + fk;
        }
        // this.filteredItems = [];
    };
    AboutUsComponent.prototype.redir = function (url) {
        this.router.navigate(['./' + url]);
    };
    return AboutUsComponent;
}());
AboutUsComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-about-us',
                templateUrl: './about-us.component.html',
                styleUrls: ['./about-us.component.css']
            },] },
];
/** @nocollapse */
AboutUsComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: router_1.Router, },
    { type: app_component_1.AppComponent, },
]; };
exports.AboutUsComponent = AboutUsComponent;
//# sourceMappingURL=about-us.component.js.map