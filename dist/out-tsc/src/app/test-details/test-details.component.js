"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var book_component_1 = require("../book/book.component");
var router_1 = require("@angular/router");
var ngx_scroll_to_1 = require("@nicky-lenaers/ngx-scroll-to");
var app_component_1 = require("../app.component");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
var TestDetailsComponent = (function () {
    function TestDetailsComponent(_api, _bookComponent, router, route, _scrollToService, _appComponent) {
        var _this = this;
        this.router = router;
        this.route = route;
        this._scrollToService = _scrollToService;
        this.testDetails = [];
        this.loading = [];
        this._packages = [];
        this.mpckgshow = false;
        this.searchTerm = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]);
        this.searchResult = [];
        this._packagesSearchResult = [];
        this.top_tests = ["Complete Blood Picture (CBP), EDTA Whole Blood", "Lipid Profile, Serum", "Liver Function Test (LFT), Serum", "Thyroid Antibodies (TG & TPO), Serum", "Thyroid Profile (T3,T4,TSH), Serum", "1, 25-Dihydroxy Vitamin D, Serum", "25 - Hydroxy Vitamin D, Serum", "Urea, Serum", "Creatinine, Serum", "Triple Marker, Serum", "Magnesium, Serum",
            "Complete Urine Examination (CUE), Spot Urine", "Glucose Fasting (FBS),  Sodium Flouride Plasma", "Glycosylated Hemoglobin (HbA1C), EDTA Whole Blood", "Uric Acid, Serum", "Thyroglobulin (Tg), Serum", "Blood Urea Nitrogen (BUN), Serum", "Prolactin, Serum", "Prothrombin Time With INR, Sodium Citrate Whole Blood", "HIV 1 & 2 Antibodies, Serum", "Culture And Sensitivity (Aerobic), Urine"];
        this.static_data = "<p>1) My CBC report includes a result for immature platelet fraction (IPF). What is it?</p> <p>IPF is the relative number of immature platelets (also called reticulated platelets) in the blood. Platelets are produced in the bone marrow and are normally not released into the bloodstream until they have matured. When platelet numbers in the blood are low (thrombocytopenia), it stimulates the bone marrow to produce platelets faster. When the need is great and when production cannot keep up with &quot,demand,&quot, then an increased number of immature platelets will be released into the bloodstream.</p> <p>This IPF test result would be one of the values reported when blood is evaluated using an automated hematology analyzer. The IPF may be used to help a healthcare provider determine the likely cause of a person's thrombocytopenia, that is, decrease in production by the bone marrow (IPF is low) versus increased loss of platelets in the blood (IPF is higher). Lab test results including platelet count and IPF can also help determine if a person needs a platelet transfusion and help monitor bone marrow recovery, such as after a bone marrow transplant. Other uses are being studied and the test's ultimate clinical utility has not yet been well determined.</p> <p>2) My CBC report includes a result for reticulocyte hemoglobin. What is it?</p> <p>The hemoglobin inside of reticulocytes can be measured and reported as either a mean reticulocyte hemoglobin content (CHr) or a reticulocyte hemoglobin equivalent (Ret-He), depending upon the test method used. This test result would be one of the values reported when blood is evaluated using an automated hematology analyzer.</p> <p>Reticulocytes are &quot,young&quot, red blood cells that are released by the bone marrow before they become fully mature. The amount of hemoglobin inside of reticulocytes can help determine if there has been enough iron available, to be incorporated into hemoglobin production and then into red blood cell production in the bone marrow, within the past few days. This makes the test useful in identifying functional iron deficiency in certain clinical conditions and in assessing iron deficiency anemia in children.</p> <p>3) My CBC report includes a result for immature granulocytes (IG). What are they?</p> <p>Some automated hematology analyzers report the total number of immature granulocytes (IG) present in a person's blood sample. Immature granulocytes are white blood cells that have not fully developed before being released from the bone marrow into the blood. They may include metamyelocytes, myelocytes, and promyelocytes. These cells are normally only present in the bone marrow because they are precursors of neutrophils, the predominant type of white cells in blood. The presence of immature granulocytes in the blood may occur in various diseases, such as infection or a blood cancer, and thus will often prompt further investigation, which may include additional laboratory testing.</p> <p>4) Is there anything I can do to improve results of my CBC?</p> <p>People who have a keen interest in their own health care frequently want to know what they can do to change their WBCs, RBCs, and platelets. Unlike &quot,good&quot, and &quot,bad&quot, cholesterol, cell populations are not generally affected by lifestyle changes unless the individual has an underlying deficiency (such as vitamin B12 or folate deficiency or iron deficiency). There is no way that a person can directly raise the number of his WBCs or change the size or shape of his RBCs. Addressing any underlying diseases or conditions and following a healthy lifestyle will help optimize your body's cell production, and your body will take care of the rest.</p> <p>5) If I have an abnormal result on my CBC, what other tests might my doctor order as follow up?</p><p>It depends on the results that are abnormal and the suspected cause as well as your medical history and findings from your physical examination. Your healthcare provider may request that a blood smear examination be done. Other general tests to check your health and to look for possible causes may include a comprehensive metabolic panel (CMP). A few other general examples include:</p> <p>Abnormal results for WBCs may be followed by a culture of the affected area (e.g., blood culture, urine culture, sputum culture), a strep test or tests for viruses such as mononucleosis or EBV. If inflammation is suspected, then a CRP or ESR test may be done.</p> <p>Abnormal RBC results may prompt a reticulocyte count, iron studies, tests for vitamin B12 and folate, G6PD, or hemoglobinopathy evaluation to help make a diagnosis.</p> <p>An abnormal platelet count may be followed by tests that further evaluate platelets, such as platelet function tests or HIT antibody. Additional tests may be done to check for bleeding disorders or excessive clotting disorders such as PT, PTT, von Willebrand factor or coagulation factors.</p> <p>When a serious condition such as leukemia, myelodysplasia or another bone marrow disorder is suspected, then a bone marrow biopsy and examination may be necessary. Numerous other tests specific for certain conditions may be needed to establish a diagnosis. Talk to your healthcare provider about the results of your CBC, whether additional tests are necessary, and why.</p>";
        this._api = _api;
        this._bookComponent = _bookComponent;
        this._appComponent = _appComponent;
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
    TestDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAddToVisable();
        // this.router.params.subscribe(params => this.test_id=params.testId);
        this.test_id = this.router.snapshot.paramMap.get('any');
        this.city = this.router.snapshot.paramMap.get('city');
        this.area = this.router.snapshot.paramMap.get('area');
        // console.log(this.test_id);
        if (isNaN(this.test_id)) {
            this.ser_string = this.test_id;
            this.ser_string = this.ser_string.replace("__,_", "(");
            this.ser_string = this.ser_string.replace("_,__", ")");
            var re = /_/gi;
            this.ser_string = this.ser_string.replace(re, " ");
            this.ser_string = this.ser_string.replace("?slh?", "/");
            this.ser_string = this.ser_string.replace(/^\s+|\s+$/g, "");
            this.ser_string = new String(this.ser_string);
            this.test_id = '';
        }
        else {
            this.ser_string = '';
        }
        //console.log(this.ser_string);
        this.loading['testdetails'] = true;
        this.sw = 1;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetTestDetails', { TokenNo: token, test_id: _this.test_id, 'test_name': _this.ser_string }).subscribe(function (data) {
                if (JSON.parse(data.json).data !== undefined) {
                    _this.testDetails = JSON.parse(data.json).data[0];
                    _this.testDetails.report_avb = _this.getHumanDate(_this.testDetails.report_avb);
                    _this.testDetails.parameters = _this.splitParams(_this.testDetails.parameters);
                    if (_this.testDetails.faq) {
                        _this.testDetails.faq = _this.strReplaceFaq(_this.testDetails.faq);
                    }
                }
                else {
                    _this.route.navigate(['./404']);
                }
                _this.loading['testdetails'] = false;
                //report_avb
                // console.log(this.testDetails.test_finalpr);
            });
        });
        // this.testDetails={
        //   "tid":1,
        //   "test_spec" : "Endocrinologist",
        //   "test_cdn" : "Disorders of Adrenal Gland",
        //   "test_code" : "R053",
        //   "test_name" : "17-Hydroxyprogesterone(17-OHP)-Serum",
        //   "test_other_names": "17-HP",
        //   "test_price" : 1300,
        //   "test_discpr": 200 ,
        //   "test_finalpr": 1100 ,
        //   "spec_type" : "Serum",
        //   "spec_inst" :  "text",
        //   "test_ptn" : "text",
        //   "test_sch" : "daily",
        //   "report_avb" : "3 Days",
        //   "test_whygt" : "text",
        //   "test_whengt" : "text",
        //   "test_rel" :  "test1, test 2" 
        //   };
        window.scrollTo(0, 0);
    };
    TestDetailsComponent.prototype.getTestQuant = function (test) {
        var a = 1;
        var stest = JSON.parse(localStorage.getItem('tests'));
        if (stest) {
            stest.forEach(function (element) {
                if (element.tid === test) {
                    a = element.quant;
                }
            });
        }
        //console.log(a);
        return a;
    };
    TestDetailsComponent.prototype.triggerScrollToOffsetOnly = function (offset, dest) {
        if (offset === void 0) { offset = 0; }
        var de = document.documentElement;
        var box = dest.getBoundingClientRect();
        //let top1:number=0;
        offset = box.top + window.pageYOffset - de.clientTop;
        console.log(dest);
        var config = {
            offset: offset
        };
        this._scrollToService.scrollTo(config);
    };
    TestDetailsComponent.prototype.shortIndex = function (tid) {
        var stest = JSON.parse(localStorage.getItem('tests'));
        var a = false;
        if (stest) {
            stest.forEach(function (element) {
                if (element.tid === tid) {
                    a = true;
                }
            });
        }
        return a;
    };
    TestDetailsComponent.prototype.isadded = function (test) {
        var b = this.shortIndex(test);
        return b;
    };
    TestDetailsComponent.prototype.getAddToVisable = function () {
        this.addtovisible = localStorage.getItem("addTocart");
    };
    TestDetailsComponent.prototype.strReplaceFaq = function (va) {
        var a = va.replace("?", "?<br>");
        var b = a.replace(/nn/gi, "\n\n");
        console.log(b);
        return b;
    };
    TestDetailsComponent.prototype.getTestDetails = function (data) {
        var _this = this;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetTestDetails', { token: token, test_id: data }).subscribe(function (data) {
                _this.testDetails = JSON.parse(data.json).data;
                _this.testDetails.parameters = _this.splitParams(_this.testDetails.parameters);
                _this.testDetails.report_avb = _this.getHumanDate(_this.testDetails.report_avb);
            });
        });
    };
    TestDetailsComponent.prototype.showHide = function (num) {
        this.sw = num;
    };
    TestDetailsComponent.prototype.getAddTestCart1 = function (tests) {
        // console.log(tests);
        this._bookComponent.getTestByTidnAdd(tests.test_id, tests.test_name);
        // this._bookComponent.getAddTestCart(tests,'test','');
        // this.route.navigate(['./book']);
    };
    TestDetailsComponent.prototype.getHumanDate = function (dt) {
        dt = dt.replace("/Date(", "");
        dt = dt.replace(")/", "");
        dt = dt.split("+");
        var hr = dt[1].substring(0, 2) * 60 * 1000;
        var min = dt[1].substring(2, 4) * 60 * 1000;
        var fdt = parseInt(dt[0]) + hr + min;
        var theDate = new Date(fdt);
        var dateString = theDate.toUTCString();
        return dateString;
    };
    TestDetailsComponent.prototype.getPopularTests = function (strng) {
        if (strng === '') {
            return this.top_tests;
        }
        else {
            return [];
        }
    };
    TestDetailsComponent.prototype.searchBasedOnString = function (str) {
        if (str != undefined) {
            this.route.navigate(['./book', { searchString: str }]);
        }
        else {
            return false;
        }
    };
    TestDetailsComponent.prototype.select = function (item, type) {
        this.filterKey = new String(item);
        this.searchResult = [];
        this._packages = [];
        var re = / /gi;
        var fk;
        fk = this.filterKey.replace(re, "_");
        fk = fk.replace("(", "__,_");
        fk = fk.replace(")", "_,__");
        fk = fk.replace("/", "?slh?");
        if (type == "test") {
            window.location.href = "./test-details/" + fk;
        }
        else if (type = "package") {
            window.location.href = "./package-details/" + fk;
        }
        // this.filteredItems = [];
    };
    TestDetailsComponent.prototype.scroll = function (val) {
        val.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
    };
    TestDetailsComponent.prototype.testQuantPlus = function (tid) {
        this._appComponent.quantAddByIndex(tid);
    };
    TestDetailsComponent.prototype.testQuantMinus = function (tid) {
        this._appComponent.quantMinusByIndex(tid);
    };
    TestDetailsComponent.prototype.noObjHide = function (val) {
        var a = false;
        if (val === null || val == '' || val == 'undefined') {
            a = false;
        }
        else if (val.length > 0) {
            a = true;
        }
        return a;
    };
    TestDetailsComponent.prototype.splitParams = function (val) {
        return val.split("*");
    };
    return TestDetailsComponent;
}());
TestDetailsComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-test-details',
                templateUrl: './test-details.component.html',
                styleUrls: ['./test-details.component.css'],
                providers: [book_component_1.BookComponent]
            },] },
    { type: core_1.Injectable },
];
/** @nocollapse */
TestDetailsComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: book_component_1.BookComponent, },
    { type: router_1.ActivatedRoute, },
    { type: router_1.Router, },
    { type: ngx_scroll_to_1.ScrollToService, },
    { type: app_component_1.AppComponent, },
]; };
exports.TestDetailsComponent = TestDetailsComponent;
//# sourceMappingURL=test-details.component.js.map