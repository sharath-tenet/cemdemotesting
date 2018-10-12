"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var book_component_1 = require("../book/book.component");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
var app_component_1 = require("../app.component");
var OurPackagesComponent = (function () {
    function OurPackagesComponent(router, _api, bc, rou, _appComponent) {
        var _this = this;
        this.router = router;
        this.rou = rou;
        this._appComponent = _appComponent;
        this.loading = [];
        this._packages = [];
        this._packageServices = [];
        this.testsList = [];
        this.packageServicesList = [];
        this.msg = null;
        this.searchTerm = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]);
        this.searchResult = [];
        this._packages1 = [];
        this._api = _api;
        this.bookComponent = bc;
        this.event = this.rou.snapshot.paramMap.get('event');
        this.ser_string = this.event;
        this.ser_string = this.ser_string.replace("__,_", "(");
        this.ser_string = this.ser_string.replace("_,__", ")");
        var re = /_/gi;
        this.ser_string = this.ser_string.replace(re, " ");
        this.ser_string = this.ser_string.replace("?slh?", "/");
        this.ser_string = this.ser_string.replace(/^\s+|\s+$/g, "");
        //console.log(this.ser_string);
        this.ser_string = new String(this.ser_string);
        //debugger;
        //console.log(this.event);
        this.curl = this._appComponent.currentUrl.split("/")[0];
        this.getPackages();
        //AutoComplete search
        this.searchTerm.valueChanges
            .debounceTime(400)
            .subscribe(function (data) {
            var term = new String(data);
            if (term.length >= 3) {
                _this._api.getToken().subscribe(function (token) {
                    _this._api.POST('GetServices', { TokenNo: token, pincode: '', test_name: data, test_code: '', test_type: '', condition_id: '', speciality_id: '', sort_by: '', sort_order: '', AlphaSearch: '', user_id: '', is_home_collection: "" }).subscribe(function (data) {
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
                            _this._packages1 = JSON.parse(data.json).data;
                        }
                        else {
                            _this._packages1 = [];
                        }
                    });
                });
            }
        });
    }
    OurPackagesComponent.prototype.ngOnInit = function () {
        window.scrollTo(0, 0);
    };
    //SELCTION ITEM METHOD.
    OurPackagesComponent.prototype.select = function (item) {
        this.filterKey = item;
        this.searchResult = [];
        this._packages1 = [];
        // this.filteredItems = [];
    };
    OurPackagesComponent.prototype.searchBasedOnString = function (str) {
        this.router.navigate(['./book', { searchString: str }]);
    };
    OurPackagesComponent.prototype.contactusSubmit = function (data) {
        var _this = this;
        data.purpose = "2";
        this._api.POST('ContactUs', data).subscribe(function (data) {
            var responce = JSON.parse(data.json).data;
            _this.msg = responce[0].message;
        });
    };
    OurPackagesComponent.prototype.removeUndefined = function () {
        if (this.ser_string == undefined) {
            this.ser_string = "";
        }
    };
    OurPackagesComponent.prototype.getPackages = function () {
        var _this = this;
        var type = "";
        console.log(this.curl);
        if (this.curl == "package-details") {
            type = "H";
        }
        else if (this.curl == "profile-details") {
            type = "P";
        }
        this.loading['_packages'] = true;
        this.removeUndefined();
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetPackages', { TokenNo: token, "pincode": "", "package_name": _this.ser_string, "package_code": "", "sort_by": "", "sort_order": "", "alphaSearch": "", "type": type }).subscribe(function (data) {
                if (data.status == 1) {
                    _this._packages = JSON.parse(data.json).data;
                    //this.testsList=[];
                }
                else {
                    _this._packages = [];
                    _this.router.navigate(['./404']);
                }
                //console.log('packages',this._packages);
                if (_this._packages.length > 0) {
                    _this.getPackagesDetails();
                }
                //console.log(this._packages);
            });
        });
    };
    OurPackagesComponent.prototype.getPackagesDetails = function () {
        var _this = this;
        this._packages.forEach(function (element) {
            _this.getTests(element);
        });
        this.loading['_packages'] = false;
        console.log(this.packageServicesList);
    };
    OurPackagesComponent.prototype.getTests = function (element) {
        var _this = this;
        //this.packageServicesList=[];
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetPackageServices', { TokenNo: token, "Pckage_id": element.id }).subscribe(function (data) {
                if (data.status == 1) {
                    var _packageServices = JSON.parse(data.json).data;
                    _this.packageServicesList[element.id] = [];
                    _this.packageServicesList[element.id] = _packageServices;
                }
                else {
                    _this._packageServices = [];
                }
            });
        });
    };
    OurPackagesComponent.prototype.addPackageCart = function (pckg) {
        // this.bookComponent.getAddPackageCart(pckg);
        /*this.router.navigate(['./book', {searchString:str}]);*/
        this.bookComponent.getAddTestCart(pckg, "pckg");
    };
    OurPackagesComponent.prototype.isadded = function (tid) {
        //console.log(tid);
        var k = this.bookComponent.shortIndex(tid);
        return k;
    };
    OurPackagesComponent.prototype.testQuantPlus = function (tid) {
        this._appComponent.quantAddByIndex(tid);
    };
    OurPackagesComponent.prototype.testQuantMinus = function (tid) {
        this._appComponent.quantMinusByIndex(tid);
    };
    OurPackagesComponent.prototype.getTestQuant = function (test) {
        var a = 1;
        var stest = JSON.parse(localStorage.getItem('tests'));
        if (stest) {
            stest.forEach(function (element) {
                if (element.tid === test) {
                    a = element.quant;
                }
            });
        }
        return a;
    };
    return OurPackagesComponent;
}());
OurPackagesComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-our-packages',
                templateUrl: './our-packages.component.html',
                styleUrls: ['./our-packages.component.css'],
                providers: [book_component_1.BookComponent],
            },] },
];
/** @nocollapse */
OurPackagesComponent.ctorParameters = function () { return [
    { type: router_1.Router, },
    { type: api_service_1.ApiService, },
    { type: book_component_1.BookComponent, },
    { type: router_1.ActivatedRoute, },
    { type: app_component_1.AppComponent, },
]; };
exports.OurPackagesComponent = OurPackagesComponent;
//# sourceMappingURL=our-packages.component.js.map