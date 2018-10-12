"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var book_component_1 = require("../book/book.component");
var api_service_1 = require("../common/api.service");
var router_1 = require("@angular/router");
var app_component_1 = require("../app.component");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
var OurFacilitiesComponent = (function () {
    function OurFacilitiesComponent(_bookComponent, _api, router, _appComponent) {
        var _this = this;
        this.router = router;
        this.searchTerm = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]);
        this.searchResult = [];
        this._packages = [];
        this.mpckgshow = true;
        this.ser_string = "";
        this.tokenSet = false;
        this._packagesSearchResult = [];
        this.top_tests = ["Complete Blood Picture (CBP), EDTA Whole Blood", "Lipid Profile, Serum", "Liver Function Test (LFT), Serum", "Thyroid Antibodies (TG & TPO), Serum", "Thyroid Profile (T3,T4,TSH), Serum", "1, 25-Dihydroxy Vitamin D, Serum", "25 - Hydroxy Vitamin D, Serum", "Urea, Serum", "Creatinine, Serum", "Triple Marker, Serum", "Magnesium, Serum",
            "Complete Urine Examination (CUE), Spot Urine", "Glucose Fasting (FBS),  Sodium Flouride Plasma", "Glycosylated Hemoglobin (HbA1C), EDTA Whole Blood", "Uric Acid, Serum", "Thyroglobulin (Tg), Serum", "Blood Urea Nitrogen (BUN), Serum", "Prolactin, Serum", "Prothrombin Time With INR, Sodium Citrate Whole Blood", "HIV 1 & 2 Antibodies, Serum", "Culture And Sensitivity (Aerobic), Urine"];
        this._appComponent = _appComponent;
        this.tokenSet = this._appComponent.isLoggedIn;
        this._bookComponent = _bookComponent;
        this._api = _api;
        this.router = router;
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
                    _this._api.POST('GetPackages', { TokenNo: token, "pincode": "", "package_name": data, "package_code": "", "sort_by": "", "sort_order": "", "alphaSearch": "", organ_id: "" }).subscribe(function (data) {
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
    OurFacilitiesComponent.prototype.ngOnInit = function () {
        window.scrollTo(0, 0);
    };
    // //SELCTION ITEM METHOD.
    // select(item){
    //     this.filterKey = item;
    //     this.searchResult = [];
    //     this._packages=[];
    //    // this.filteredItems = [];
    // }
    OurFacilitiesComponent.prototype.search = function (srt_by, searchString) {
        //this._bookComponent.serClick(srt_by,strng);
        this.router.navigate(['./book', { searchString: searchString }]);
    };
    //   searchBasedOnString(str:any){
    //   this.router.navigate(['./book', {searchString:str}]);
    // }
    OurFacilitiesComponent.prototype.loginSubmit = function (form, isValid) {
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
    OurFacilitiesComponent.prototype.getPopularTests = function (strng) {
        if (strng === '') {
            return this.top_tests;
        }
        else {
            return [];
        }
    };
    OurFacilitiesComponent.prototype.searchBasedOnString = function (str) {
        if (str != undefined) {
            this.router.navigate(['./book', { searchString: str }]);
        }
        else {
            return false;
        }
    };
    OurFacilitiesComponent.prototype.select = function (item, type) {
        this.filterKey = new String(item);
        this.searchResult = [];
        this._packages = [];
        var fk;
        var re = / /gi;
        fk = this.filterKey.replace(re, "_");
        fk = fk.replace("(", "__,_");
        fk = fk.replace(")", "_,__");
        if (type == "test") {
            window.location.href = "./book/test-details/" + fk;
        }
        else if (type = "package") {
            window.location.href = "./package-details/" + fk;
        }
        // this.filteredItems = [];
    };
    //book a test and status blocks
    OurFacilitiesComponent.prototype.getBookAnAppointment = function () {
        this.router.navigate(['./book']);
    };
    OurFacilitiesComponent.prototype.redir = function (val) {
        window.location.href = "./" + val;
    };
    OurFacilitiesComponent.prototype.getOTP = function () {
        this._appComponent.toLogin();
    };
    return OurFacilitiesComponent;
}());
OurFacilitiesComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-our-facilities',
                templateUrl: './our-facilities.component.html',
                styleUrls: ['./our-facilities.component.css'],
                providers: [book_component_1.BookComponent]
            },] },
    { type: core_1.Injectable },
];
/** @nocollapse */
OurFacilitiesComponent.ctorParameters = function () { return [
    { type: book_component_1.BookComponent, },
    { type: api_service_1.ApiService, },
    { type: router_1.Router, },
    { type: app_component_1.AppComponent, },
]; };
exports.OurFacilitiesComponent = OurFacilitiesComponent;
//# sourceMappingURL=our-facilities.component.js.map