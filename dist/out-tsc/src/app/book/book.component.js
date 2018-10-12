"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var home_component_1 = require("../home/home.component");
var app_component_1 = require("../app.component");
// import {TestDetailsComponent} from '../test-details/test-details.component';
// import {Repeater} from './app/repeater';
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
// @ViewChild('category') category: ElementRef;
var BookComponent = (function () {
    function BookComponent(_api, _appComponent, router, rou, _elementRef) {
        this.router = router;
        this.rou = rou;
        this._elementRef = _elementRef;
        this.sel_rad = [];
        this._packagesSearchResult = [];
        this.top_tests = ["Complete Blood Picture (CBP), EDTA Whole Blood", "Lipid Profile, Serum", "Liver Function Test (LFT), Serum", "Thyroid Antibodies (TG & TPO), Serum", "Thyroid Profile (T3,T4,TSH), Serum", "1, 25-Dihydroxy Vitamin D, Serum", "25 - Hydroxy Vitamin D, Serum", "Urea, Serum", "Creatinine, Serum", "Triple Marker, Serum", "Magnesium, Serum",
            "Complete Urine Examination (CUE), Spot Urine", "Glucose Fasting (FBS),  Sodium Flouride Plasma", "Glycosylated Hemoglobin (HbA1C), EDTA Whole Blood", "Uric Acid, Serum", "Thyroglobulin (Tg), Serum", "Blood Urea Nitrogen (BUN), Serum", "Prolactin, Serum", "Prothrombin Time With INR, Sodium Citrate Whole Blood", "HIV 1 & 2 Antibodies, Serum", "Culture And Sensitivity (Aerobic), Urine"];
        this.sortString = "Featured";
        this.event = '';
        this.pa = 1;
        this.config = {};
        this.organ_id = null;
        this.organsList = [];
        this.organsList1 = [];
        this.showMore = [];
        this.filterLength = 5; //length of filter default
        this._tempTest = [];
        this.temp2 = [];
        this._packages = [];
        this._packageServices = [];
        this.packageServiceListSw = false;
        this._pckg = [];
        this.tmp = [];
        this.pincode = 0;
        this.sort_order = 1; //1-ASC,2-DESC,Default Asending 
        this.AlphaSearch = "";
        this.getpackagecnf = false;
        this.gettestcnf = false;
        this.visible = false;
        this.user = [];
        this.wishList = [];
        this.is_wishlist = 0;
        this.wl = [];
        this.temp3 = [];
        this.wList = false;
        this.packages = [];
        this.tests = [];
        this.testIds = [];
        this.alphap = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        this.searchTerm = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]);
        this.searchResult = [];
        this._packages1 = [];
        this.loading = [];
        this.mpckgshow = false;
        this._api = _api;
        //this._homeComponent=_homeComponent;
        this._appComponent = _appComponent;
        this.getAddToVisable(); //add to cart visibility button
        this._appComponent.setFlag();
        //console.log(this.testsList);
        this.user.uid = "";
        if (this.searchTerm != undefined) {
            this.autoSuggestTrigger();
        }
        this.event = this.rou.snapshot.paramMap.get('event');
        var a = parseInt(this.event);
        if (!isNaN(a)) {
            this.config = {
                id: 'custom',
                itemsPerPage: 9,
                currentPage: a
            };
        }
        else {
            this.config = {
                id: 'custom',
                itemsPerPage: 9,
                currentPage: 1
            };
        }
    }
    BookComponent.prototype.getAddToVisable = function () {
        this.addtovisible = localStorage.getItem("addTocart");
    };
    BookComponent.prototype.autoSuggestTrigger = function () {
        /* this.searchTerm.valueChanges
         .debounceTime(400)
         .subscribe(data => {
         let term = new String(data);
        // if(this.searchString!=''){
         if(data==undefined){
               this.mpckgshow=false;
               return false;
             }
           if(term.length >=3){
            
             this._api.getToken().subscribe(
               token => {
             this._api.POST('GetServices', {TokenNo: token,pincode:'' ,test_name:data,test_code:'',test_type:'',condition_id:'',speciality_id:'',sort_by:'',sort_order:'',AlphaSearch:'',user_id:'',is_home_collection:"",organ_id:""}).subscribe(data =>{
                             if(data.status==1){
                               this.searchResult=JSON.parse(data.json).data;
                             }else{
                               this.searchResult=[];
                             }
                              
                            });
                           });
             this._api.getToken().subscribe(
               token => {
             this._api.POST('GetPackages',{TokenNo: token,"pincode":"","package_name":data,"package_code":"","sort_by":"","sort_order":"","alphaSearch":"","type":""}).subscribe(data =>{
                       if(data.status==1){
                         this._packages1=JSON.parse(data.json).data;
                       }else{
                         this._packages1=[];
                       }
                     
                    });
                   });
         
         
                  //}
         }
          
         })*/
        var _this = this;
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
    };
    BookComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tests = JSON.parse(localStorage.getItem('tests'));
        this.packages = JSON.parse(localStorage.getItem('packages'));
        this.testIds = [];
        if (this.tests != null) {
            this.tests.forEach(function (element) {
                _this.testIds.push(element.tid);
            });
        }
        if (this.packages != null) {
            this.packages.forEach(function (element) {
                _this.testIds.push(element.id);
            });
        }
        this.postalCode = localStorage.getItem('postalCode');
        //this.postalCode =500033;
        var data = {
            'tests': this.testIds,
            'postalCode': this.postalCode
        };
        this.nearestLabLocation = { name: "Loading...", address: "Loading..." };
        //  this._api.POST('getLabLocation.php', {token: 'SomeTokenHere',coordinates:  this._homeComponent.getCordinates()}).subscribe(data =>{
        //   this.nearestLabLocation=JSON.parse(data.json).data;
        //   localStorage.setItem('nearestLabLocation',JSON.stringify(this.nearestLabLocation));
        //  });
        /*  this._api.POST('getLabLocation.php', {token: 'SomeTokenHere',data:data}).subscribe(data =>{
           this.nearestLabLocation=JSON.parse(data.json).data;
           localStorage.setItem('nearestLabLocation',JSON.stringify(this.nearestLabLocation));
          });*/
        this.rou.params.subscribe(function (params) { return _this.searchString = params.searchString; });
        //console.log(this.searchString);
        this.tempstr = this.searchString;
        this.filterKey = this.searchString;
        this.loading['condition'] = true;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetTestCondition', { TokenNo: token }).subscribe(function (data) {
                _this.testConditions1 = JSON.parse(data.json).data;
                _this.testConditions = _this.testConditions1.slice(0, _this.filterLength);
                _this.showMore['cond'] = "Show More";
                _this.loading['condition'] = false;
                _this.urlParseSearch("cond");
            });
        });
        //ebugger;
        this.loading['speciality'] = true;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetTestSpecality', { TokenNo: token }).subscribe(function (data) {
                _this.testSpecialityList1 = JSON.parse(data.json).data;
                _this.testSpecialityList = _this.testSpecialityList1.slice(0, _this.filterLength);
                _this.showMore['speciality'] = "Show More";
                _this.loading['speciality'] = false;
                _this.urlParseSearch("spl");
            });
        });
        // GetTestOrgans
        this.loading['organs'] = true;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetTestOrgans', { TokenNo: token }).subscribe(function (data) {
                _this.organsList1 = JSON.parse(data.json).data;
                _this.organsList = _this.organsList1.slice(0, _this.filterLength);
                _this.showMore['organs'] = "Show More";
                _this.loading['organs'] = false;
                _this.urlParseSearch("organ");
            });
        });
        // this._api.POST('GetServices', {pincode: '',test_name:'',test_code:'',test_type:'',condition_id:'',speciality_id:'',sort_by:'',sort_order:''}).subscribe(data =>{
        //   this.testsList=JSON.parse(data.json).data;
        //  });
        if (this.event == 'packages') {
            this.ptype = "H";
            this.getPackages();
        }
        else if (this.event == 'profiles') {
            this.ptype = "P";
            this.getPackages();
            //profile will be loaded here
        }
        else {
            this.masterSearch();
        }
        if (localStorage.getItem('user') != null)
            this.wList = true;
        window.scrollTo(0, 0);
    };
    BookComponent.prototype.getTestDetails = function (id) {
        this.router.navigate(['./book/test-details/' + id]);
        // this.router.navigate(['./book/test-details', {testId:id}]);
    };
    //SELCTION ITEM METHOD.
    /*  select(item){
          this.filterKey = item;
          this.searchResult = [];
          this._packages1=[];
         // this.filteredItems = [];
      }*/
    BookComponent.prototype.select = function (item, type) {
        this.filterKey = new String(item);
        this.searchResult = [];
        //this._packagesSearchResult=[];
        this._packages1 = [];
        var re = / /gi;
        this.filterKey = this.filterKey.replace(re, "_");
        this.filterKey = this.filterKey.replace("(", "__,_");
        this.filterKey = this.filterKey.replace(")", "_,__");
        this.filterKey = this.filterKey.replace("/", "?slh?");
        if (type == "test") {
            window.location.href = "./test-details/" + this.filterKey;
        }
        else if (type = "package") {
            var base_url = "";
            if (this.ptype == "H") {
                base_url = "package-details";
            }
            else if (this.ptype == "P") {
                base_url = "profile-details";
            }
            window.location.href = "./" + base_url + "/" + this.filterKey;
        }
        // this.filteredItems = [];
    };
    BookComponent.prototype.getTestId = function () {
        return this.test_id;
    };
    BookComponent.prototype.myIndexOf = function (o) {
        this._tempTest = JSON.parse(localStorage.getItem('tests'));
        var k = -1;
        for (var i = 0; i < this._tempTest.length; i++) {
            var a = this._tempTest[i];
            var b = o;
            if (a.tid === b.tid) {
                k = i;
            }
        }
        return k;
    };
    BookComponent.prototype.IndexOf = function (p) {
        for (var i = 0; i < this._pckg.length; i++) {
            /* let a=JSON.stringify(this._pckg[i]);
             let b=JSON.stringify(p);
               if (a===b) {
                   return i;
               }*/
            var a = this._pckg[i];
            var b = p;
            if (a.id === b.id) {
                return i;
            }
        }
        return -1;
    };
    BookComponent.prototype.shortIndex = function (tid) {
        var stest = JSON.parse(localStorage.getItem('tests'));
        // console.log(stest);
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
    BookComponent.prototype.getAddTestCart = function (test, attrib, event) {
        var _this = this;
        if (event === void 0) { event = ''; }
        // console.log(event.target.classList.add('added'));
        //localStorage.setItem('btncls',event.target.classList.add('added'));
        //event.target.textContent = "ADDED";
        //console.log(test);
        if (attrib == 'pckg') {
            var test1 = test;
            test = {};
            test.tid = test1.id;
            test.test_name = test1.package_code;
            test.test_code = test1.package_discpr;
            test.test_finalpr = test1.package_finalpr;
            test.test_name = test1.package_name;
            test.test_price = test1.package_price;
            test.quant = test1.quant;
            test.report_avb = "";
            test.test_ptn = "";
            test.type = "";
        }
        this._tempTest = [];
        this.temp2 = [];
        var testshere = JSON.parse(localStorage.getItem('tests'));
        if (testshere) {
            this.temp2 = JSON.parse(localStorage.getItem('tests'));
            this.temp2.forEach(function (element) {
                _this._tempTest.push(element);
            });
            if (this.myIndexOf(test) < 0) {
                test.quant = 1;
                this._tempTest.push(test);
            }
            else {
                var i = this.myIndexOf(test);
                var t = this._tempTest[i].quant;
                t = t + 1;
                this._tempTest[i].quant = t;
            }
        }
        else {
            test.quant = 1;
            this._tempTest.push(test);
        }
        //console.log(this._tempTest);
        localStorage.setItem('tests', JSON.stringify(this._tempTest));
        this._appComponent.setCart();
    };
    BookComponent.prototype.getRemoveTestCart = function (test, type) {
        if (type === void 0) { type = null; }
        if (this._tempTest.length == 0) {
            this._tempTest = JSON.parse(localStorage.getItem("tests"));
        }
        if (type == 'package') {
            test.tid = test.id;
        }
        var i = this.myIndexOf(test);
        //console.log(i);
        var t = this._tempTest[i].quant;
        if (t > 1) {
            t = t - 1;
            this._tempTest[i].quant = t;
            localStorage.setItem('tests', JSON.stringify(this._tempTest));
            this._appComponent.setCart();
        }
        ;
    };
    BookComponent.prototype.isadded = function (test) {
        var b = this.shortIndex(test);
        return b;
    };
    BookComponent.prototype.getTestByTidnAdd = function (tid, test_name) {
        var _this = this;
        var a = {};
        this.searchString = test_name;
        // this.test_code=tid;
        this.checkUndefined();
        return this._api.getToken().subscribe(function (token) {
            return _this._api.POST('GetServices', { TokenNo: token, pincode: _this.pincode, test_name: _this.searchString, test_code: _this.test_code, test_type: _this.test_type, condition_id: _this.condition_id, speciality_id: _this.speciality_id, sort_by: _this.sortBy, sort_order: _this.sort_order, AlphaSearch: _this.AlphaSearch, user_id: _this.user.uid, is_home_collection: "", organ_id: _this.organ_id }).subscribe(function (data) {
                if (data.status == 1) {
                    _this.loading["service"] = false;
                    _this.gettestcnf = false;
                    _this.testsList = JSON.parse(data.json).data;
                }
                else {
                    _this.loading["service"] = false;
                    _this.gettestcnf = true;
                    _this.testsList = [];
                }
                // console.log(this.testsList)
                var stest = _this.testsList;
                //console.log(stest);
                if (stest) {
                    stest.forEach(function (element) {
                        if (element.tid === tid) {
                            _this.getAddTestCart(element, 'test', '');
                        }
                    });
                }
            });
        });
        //console.log(a);
    };
    BookComponent.prototype.getRemovePackageCart = function (pckg) {
        var i = this.IndexOf(pckg);
        var t = this._pckg[i].quant;
        if (t > 1) {
            t = t - 1;
            this._pckg[i].quant = t;
            localStorage.setItem('packages', JSON.stringify(this._pckg));
            this._appComponent.setCart();
        }
    };
    BookComponent.prototype.getTestQuant = function (test) {
        var a = 1;
        var stest = JSON.parse(localStorage.getItem('tests'));
        //console.log(stest);
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
    BookComponent.prototype.getPckgQuant = function (pckg) {
        var b = 1;
        if (this.IndexOf(pckg) >= 0) {
            b = this._pckg[this.IndexOf(pckg)].quant;
        }
        //console.log('b=',b);
        return b;
    };
    BookComponent.prototype.getAddPackageCart = function (pckg) {
        var _this = this;
        this._pckg = [];
        var pshare = JSON.parse(localStorage.getItem('packages'));
        if (pshare) {
            this.tmp = JSON.parse(localStorage.getItem('packages'));
            this.tmp.forEach(function (element) {
                _this._pckg.push(element);
            });
            //console.log('indexOfpckgs',this.IndexOf(pckg));
            if (this.IndexOf(pckg) < 0) {
                pckg.quant = 1;
                this._pckg.push(pckg);
            }
            else {
                var i = this.IndexOf(pckg);
                var t = this._pckg[i].quant;
                t = t + 1;
                console.log('t=', t);
                this._pckg[i].quant = t;
            }
        }
        else {
            pckg.quant = 1;
            this._pckg.push(pckg);
        }
        localStorage.setItem('packages', JSON.stringify(this._pckg));
        this._appComponent.setCart();
    };
    /* getAddPackageCart(pckg:any){
       
     this._pckg=[];
    // console.log('pkgs=',(localStorage.getItem('packages')));
     if(localStorage.getItem('packages')===null){
         this._pckg.push(pckg);
         localStorage.setItem('packages',JSON.stringify(this._pckg));
      
     }else{
         
        this.tmp=JSON.parse(localStorage.getItem('packages'));
         this.tmp.forEach(element => {
                   this._pckg.push(element);
               });
       //console.log('pkgs=',(localStorage.getItem('packages')));
      /* if(this.tmp){
 
               this.tmp.forEach(element => {
                   this._pckg.push(element);
               });
               
       }else{
           this._pckg.push(pckg);
       }*/
    /* if(this.IndexOf(pckg) < 0){
      this._pckg.push(pckg);
     }
      localStorage.setItem('packages',JSON.stringify(this._pckg));
  
  }

  localStorage.setItem('showcart',"true");
  this._appComponent.setCart();

}*/
    /*getAddPackageCart(pckg:any){
      this._pckg=[];
    console.log('pkgs=',localStorage.getItem('packages'));
      if((localStorage.getItem('packages'))!==null){
  
        this.tmp=JSON.parse(localStorage.getItem('packages'));
  
          this.tmp.forEach(element => {
              this._pckg.push(element);
          });
         if(this.IndexOf(pckg) < 0){
          this._pckg.push(pckg);
         }
          localStorage.setItem('packages',JSON.stringify(this._pckg));
       
      }else{
        this._pckg.push(pckg);
        localStorage.setItem('packages',JSON.stringify(this._pckg));
      }
  
      this._appComponent.setCart();
  
    }*/
    BookComponent.prototype.hideCart = function () {
        localStorage.setItem('showcart', "false");
        this._appComponent.setCart();
    };
    BookComponent.prototype.getNearestLabLocation = function () {
        return this.nearestLabLocation;
    };
    BookComponent.prototype.search = function (event, attrib) {
        var sId = '';
        if (event.target.checked) {
            sId = event.target.id;
        }
        if (attrib == "cond") {
            this.condition_id = sId;
            this.masterSearch();
        }
        if (attrib == "spl") {
            this.speciality_id = sId;
            this.masterSearch();
        }
        if (attrib == "organ") {
            this.organ_id = sId;
            this.masterSearch();
        }
        if (attrib == "pckgs") {
            this.getPackages();
        }
    };
    BookComponent.prototype.shload = function (val) {
        return false;
    };
    BookComponent.prototype.masterSearch = function () {
        var _this = this;
        this.checkUndefined();
        this._packages = [];
        //console.log("pin=",this.pincode,"search=",this.searchString,"tt",this.test_type,"cond=",this.condition_id,"spc",this.speciality_id,"srtby",this.sortBy,"so",this.sort_order,"as",this.AlphaSearch);
        this.user = localStorage.getItem('user');
        this.user = JSON.parse(this.user);
        if (this.user == null) {
            this.user = [];
            this.user.uid = "";
        }
        this.loading["service"] = true;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetServices', { TokenNo: token, pincode: _this.pincode, test_name: _this.searchString, test_code: '', test_type: _this.test_type, condition_id: _this.condition_id, speciality_id: _this.speciality_id, sort_by: _this.sortBy, sort_order: _this.sort_order, AlphaSearch: _this.AlphaSearch, user_id: _this.user.uid, is_home_collection: "", organ_id: _this.organ_id }).subscribe(function (data) {
                if (data.status == 1) {
                    _this.loading["service"] = false;
                    _this.gettestcnf = false;
                    _this.testsList = JSON.parse(data.json).data;
                }
                else {
                    _this.loading["service"] = false;
                    _this.gettestcnf = true;
                    _this.testsList = [];
                }
                //console.log(this.testsList)
            });
        });
        //Packages
        /* this._api.POST('GetPackages',{"pincode":this.pincode,"package_name":this.searchString,"package_code":"","sort_by":"","sort_order":"","alphaSearch":""}).subscribe(data =>{
           if(data.status==1){
             this._packages=JSON.parse(data.json).data;
           }else{
             this._packages=[];
           }
           
          });*/
    };
    BookComponent.prototype.serClick = function (srt_by, strng) {
        //console.log(strng);
        if (strng === undefined) {
            return false;
        }
        else {
            this.sortBy = srt_by;
            this.searchString = strng;
            this.masterSearch1();
        }
    };
    BookComponent.prototype.getPopularTests = function (strng) {
        if (strng === '') {
            return this.top_tests;
        }
        else {
            return [];
        }
    };
    BookComponent.prototype.sortingFun = function (srtby, strng, val) {
        this.sortBy = srtby;
        this.sortString = strng;
        this.sort_order = val;
        this.masterSearch();
    };
    BookComponent.prototype.checkUndefined = function () {
        if (typeof this.searchString == 'string') {
            if (this.searchString.length == 0) {
                this.searchString = "";
            }
        }
        if (this.searchString === undefined) {
            this.searchString = "";
        }
        if (this.speciality_id === undefined) {
            this.speciality_id = "";
        }
        if (this.condition_id === undefined) {
            this.condition_id = "";
        }
        if (this.test_type === undefined) {
            this.test_type = "";
        }
        if (this.organ_id === undefined || this.organ_id === null) {
            this.organ_id = "";
        }
        if (this.test_code === undefined || this.test_code === null) {
            this.test_code = "";
        }
        if (this.sortBy === undefined || this.sortBy === null) {
            this.sortBy = "";
        }
    };
    BookComponent.prototype.clrClick = function () {
        this.cat_checkbox = false;
        this.cond_checkbox = false;
        this.spl_checkbox = false;
        this.organ_checkbox = false;
        this.tempstr = "";
        this.sortBy = "";
        this.searchString = "";
        this.speciality_id = "";
        this.condition_id = "";
        this.organ_id = "";
        this.test_type = "";
        this.AlphaSearch = "";
        this.sortString = "Featured";
        this.sort_order = "1";
        this.filterKey = "";
        // this.ngOnInit();
        this.masterSearch();
        this.router.navigate(['./book']);
    };
    BookComponent.prototype.alphaPaginate = function (alpha) {
        this.AlphaSearch = alpha;
        this.masterSearch();
    };
    BookComponent.prototype.getPackages = function () {
        var _this = this;
        // console.log("packages");
        this.loading['service'] = true;
        this.testsList = [];
        this._packages = [];
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetPackages', { TokenNo: token, "pincode": "", "package_name": "", "package_code": "", "sort_by": "", "sort_order": "", "alphaSearch": "", "type": _this.ptype }).subscribe(function (data) {
                if (data.status == 1) {
                    var p = JSON.parse(data.json).data;
                    p.forEach(function (element) {
                        if (element.package_price >= 0) {
                            _this._packages.push(element);
                        }
                    });
                    //this.testsList=[];//package_price
                }
                else {
                    _this.getpackagecnf = true;
                    _this._packages = [];
                }
                //console.log(this._packages);
                _this.loading['service'] = false;
                return _this._packages;
            });
        });
    };
    BookComponent.prototype.getPackageDetails = function (package_id, selpackagename) {
        var _this = this;
        //console.log(package_id);  
        this.selpackagename = selpackagename;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetPackageServices', { "TokenNo": token, "Pckage_id": package_id }).subscribe(function (data) {
                if (data.status == 1) {
                    _this._packageServices = JSON.parse(data.json).data;
                    _this.testsList = [];
                    _this.packageServiceListSw = true;
                }
                else {
                    _this._packageServices = [];
                }
                console.log(_this._packageServices);
            });
        });
    };
    BookComponent.prototype.addToWishlist = function (event, test, i) {
        var _this = this;
        //console.log("heart id",event.currentTarget.firstChild.id);
        this.visible = !this.visible;
        if (this.visible == true) {
            event.currentTarget.firstChild.style.color = "red";
            //Add
            if (localStorage.getItem('user') != null) {
                this.user = localStorage.getItem('user');
                this.user = JSON.parse(this.user);
                this.status = 'A';
                this.loc_id = 1;
                this.is_wishlist = 1;
                this._api.POST('AddtoWishList', { "uid": this.user.uid, "test_id": test.tid, "loc_id": this.loc_id, "status": this.status, "is_wishlist": this.is_wishlist }).subscribe(function (data) {
                    _this.temp3 = JSON.parse(data.json).data;
                    //console.log(this.wishList);
                    _this.temp3.forEach(function (element) {
                        _this.temp3.push(element);
                    });
                    localStorage.setItem('wishlist', JSON.stringify(_this.temp3));
                    _this.wl = localStorage.getItem('wishlist');
                    _this.wl = JSON.parse(_this.wl);
                });
            }
            else {
                this.msg = "Please enter your details to continue...";
                this.router.navigate(['./login', { msg: this.msg }]);
                console.log("Please enter your details to continue...");
            }
        }
        else {
            event.currentTarget.firstChild.style.color = "";
            this.user = localStorage.getItem('user');
            this.user = JSON.parse(this.user);
            var status_1 = 'D';
            var loc_id = 1;
            var is_wishlist = 1;
            this._api.POST('AddtoWishList', { "uid": this.user.uid, "test_id": test.tid, "loc_id": loc_id, "status": status_1, "is_wishlist": is_wishlist }).subscribe(function (data) {
                _this.wishList = JSON.parse(data.json).data;
                //console.log("res=",this.wishList);
            });
        }
    };
    BookComponent.prototype.getWishlist = function () {
        if (localStorage.getItem('user') != null) {
            this.router.navigate(['./book/wishlist']);
        }
        else {
            this.msg = "Please enter your details to continue...";
            this.router.navigate(['./login', { msg: this.msg }]);
        }
    };
    BookComponent.prototype.masterSearch1 = function () {
        var _this = this;
        this.checkUndefined();
        this.user = localStorage.getItem('user');
        this.user = JSON.parse(this.user);
        if (this.user == null) {
            this.user = [];
            this.user.uid = "";
        }
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetServices', { TokenNo: token, pincode: _this.pincode, test_name: _this.searchString, test_code: '', test_type: _this.test_type, condition_id: _this.condition_id, speciality_id: _this.speciality_id, sort_by: _this.sortBy, sort_order: _this.sort_order, AlphaSearch: _this.AlphaSearch, user_id: _this.user.uid, is_home_collection: "", organ_id: _this.organ_id }).subscribe(function (data) {
                if (data.status == 1) {
                    _this.testsList = JSON.parse(data.json).data;
                }
                else {
                    _this.testsList = [];
                }
            });
        });
        //Packages
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetPackages', { TokenNo: token, "pincode": _this.pincode, "package_name": _this.searchString, "package_code": "", "sort_by": "", "sort_order": "", "alphaSearch": "", "type": "" }).subscribe(function (data) {
                if (data.status == 1) {
                    _this._packages = JSON.parse(data.json).data;
                }
                else {
                    _this._packages = [];
                }
            });
        });
    };
    BookComponent.prototype.showMoreLess = function (val, type) {
        if (val <= 5) {
            this.showMore[type] = "Show Less";
            if (type == "cond") {
                this.testConditions = this.testConditions1;
            }
            if (type == "speciality") {
                this.testSpecialityList = this.testSpecialityList1;
            }
            if (type == "organs") {
                this.organsList = this.organsList1;
            }
        }
        else {
            this.showMore[type] = "Show More";
            if (type == "cond") {
                this.testConditions = this.testConditions1.slice(0, this.filterLength);
            }
            if (type == "speciality") {
                this.testSpecialityList = this.testSpecialityList1.slice(0, this.filterLength);
            }
            if (type == "organs") {
                this.organsList = this.organsList1.slice(0, this.filterLength);
            }
        }
    };
    BookComponent.prototype.whatSelected = function (val) {
        console.log(val);
        if (this.event == val) {
            return true;
        }
        else {
            return false;
        }
    };
    BookComponent.prototype.setPagiUrl = function (page) {
        if (page > 0) {
            window.location.href = "./book/" + page;
        }
    };
    BookComponent.prototype.filter_masters = function (val) {
        if (val == "Packages") {
            this.ptype = "H";
            this.getPackages();
        }
        else if (val == "Profiles") {
            this.ptype = "P";
            this.getPackages();
        }
    };
    BookComponent.prototype.revStrings = function (data) {
        data = data.replace("__,_", "(");
        data = data.replace("_,__", ")");
        var re = /_/gi;
        data = data.replace(re, " ");
        data = data.replace(/^\s+|\s+$/g, "");
        return data;
    };
    BookComponent.prototype.getIndex = function (thread, needle, type) {
        var k = -1;
        if (type == "organ") {
            thread.forEach(function (element) {
                //console.log(element.organ_name);
                if (needle.toLowerCase() == element.organ_name.toLowerCase()) {
                    k = element.test_organ_id;
                }
            });
        }
        else if (type == "cond") {
            thread.forEach(function (element) {
                if (needle.toLowerCase() == element.condition_name.toLowerCase()) {
                    k = element.test_type_id;
                }
            });
        }
        else if (type == "spl") {
            thread.forEach(function (element) {
                if (needle.toLowerCase() == element.speciality_name.toLowerCase()) {
                    k = element.id;
                }
            });
        }
        return k;
    };
    BookComponent.prototype.urlParseSearch = function (typ) {
        var _this = this;
        if (typ == "organ") {
            this.rou.params.subscribe(function (params) {
                _this.organ_name = params.organ;
                _this.ser_string = _this.organ_name;
                if (_this.ser_string !== undefined || _this.ser_string == '') {
                    _this.ser_string = _this.revStrings(_this.ser_string);
                    var a = { "target": { "id": 0, "checked": false } };
                    a.target.id = _this.getIndex(_this.organsList1, _this.ser_string, "organ");
                    if (a.target.id >= 0) {
                        a.target.checked = true;
                        //this.organ_id="";
                        _this.category_id = "";
                        _this.speciality_id = "";
                        _this.condition_id = "";
                        _this.search(a, "organ");
                    }
                }
            });
        }
        else if (typ == "cond") {
            this.rou.params.subscribe(function (params) {
                _this.organ_name = params.condition;
                _this.ser_string = _this.organ_name;
                if (_this.ser_string !== undefined || _this.ser_string == '') {
                    _this.ser_string = _this.revStrings(_this.ser_string);
                    var a = { "target": { "id": 0, "checked": false } };
                    a.target.id = _this.getIndex(_this.testConditions1, _this.ser_string, "cond");
                    if (a.target.id >= 0) {
                        a.target.checked = true;
                        _this.showMoreLess(_this.testConditions.length, 'cond');
                        _this.sel_rad['cond'] = a.target.id;
                        _this.organ_id = "";
                        _this.category_id = "";
                        _this.speciality_id = "";
                        // this.condition_id="";
                        _this.search(a, "cond");
                    }
                }
            });
        }
        else if (typ == "spl") {
            this.rou.params.subscribe(function (params) {
                _this.organ_name = params.speciality;
                _this.ser_string = _this.organ_name;
                if (_this.ser_string !== undefined || _this.ser_string == '') {
                    _this.ser_string = _this.revStrings(_this.ser_string);
                    var a = { "target": { "id": 0, "checked": false } };
                    a.target.id = _this.getIndex(_this.testSpecialityList1, _this.ser_string, "spl");
                    if (a.target.id >= 0) {
                        a.target.checked = true;
                        _this.organ_id = "";
                        _this.category_id = "";
                        // this.speciality_id="";
                        _this.condition_id = "";
                        _this.search(a, "spl");
                    }
                }
            });
        }
    };
    return BookComponent;
}());
BookComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-book',
                templateUrl: './book.component.html',
                styleUrls: ['./book.component.css'],
                providers: [home_component_1.HomeComponent]
            },] },
    { type: core_1.Injectable },
];
/** @nocollapse */
BookComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: app_component_1.AppComponent, },
    { type: router_1.Router, },
    { type: router_1.ActivatedRoute, },
    { type: core_1.ElementRef, },
]; };
exports.BookComponent = BookComponent;
//# sourceMappingURL=book.component.js.map