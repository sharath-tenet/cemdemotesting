"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../common/api.service");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var SlotsComponent = (function () {
    function SlotsComponent(_api, render, router, grouter) {
        this.render = render;
        this.router = router;
        this.grouter = grouter;
        this.dates = [];
        this.slots = [];
        this.sel_date = null;
        this.sel_slot = null;
        this.slots_list = [];
        this.test_id = null;
        this._tempSlots = [];
        this._api = _api;
        // this.render
    }
    SlotsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //available_dates
        this.router.params.subscribe(function (params) { return _this.test_id = params.testId; });
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetAvailableDates', { TokenNo: token, 'test_id': _this.test_id }).subscribe(function (data) {
                _this.dates = JSON.parse(data.json).data;
                _this.checkDate();
            });
        });
    };
    SlotsComponent.prototype.showSlots = function (date) {
        var dtn = date.available_date.split("-");
        this.sel_date = dtn[2].concat(dtn[1]).concat(dtn[0]);
        this.sel_slot = null;
    };
    SlotsComponent.prototype.myIndexOf = function (o) {
        for (var i = 0; i < this._tempSlots.length; i++) {
            var a = JSON.stringify(this._tempSlots[i][0].tid);
            var b = JSON.stringify(o[0].tid);
            // console.log(o[0].temp[0].slot_date);
            //console.log(this._tempSlots[i][0]['temp'][0].slot_date);
            if (a === b) {
                this._tempSlots[i][0]['temp'][0].slot_date = o[0].temp[0].slot_date;
                this._tempSlots[i][0]['temp'][0].slot_time = o[0].temp[0].slot_time;
                return i;
            }
        }
        return -1;
    };
    SlotsComponent.prototype.getSlots = function (date) {
        var _this = this;
        this._api.getToken().subscribe(function (token) {
            _this._api.POST('GetAvailableTimeSlots', { TokenNo: token, 'test_id': _this.test_id, 'date': date, 'center_id': '1' }).subscribe(function (data) {
                _this.slots = JSON.parse(data.json).data;
                _this.slots_list = _this.slots.slots_list;
                console.log('date', date);
                console.log(_this.slots);
            });
        });
    };
    SlotsComponent.prototype.checkDate = function () {
        if (this.sel_date) {
            this.getSlots(this.sel_date);
        }
        else {
            var dt = new Date(Date.now());
            var odate = dt.getDate().toString();
            if (odate < 10) {
                odate = "0".concat(odate.toString());
            }
            else {
                odate = odate.toString();
            }
            var omonth = dt.getMonth() + 1;
            if (omonth < 10) {
                omonth = "0".concat(omonth.toString());
            }
            else {
                omonth = omonth.toString();
            }
            var oyear = dt.getFullYear().toString();
            this.sel_date = oyear.concat(omonth).concat(odate);
            this.getSlots(this.sel_date);
        }
    };
    SlotsComponent.prototype.bookSlot = function (slot) {
        var _this = this;
        if (confirm('Are you sure? \nDo you want to book slot on ' + this.sel_date + ' at ' + slot + ' ?')) {
            this.sel_slot = slot;
            this.router.params.subscribe(function (params) {
                _this.test_id = params.testId;
                var temp = [];
                var a = {};
                var b = {};
                var slo = [];
                _this._tempSlots = [];
                if (localStorage.getItem('slot_details') === null) {
                    a['slot_date'] = _this.sel_date;
                    a['slot_time'] = _this.sel_slot;
                    temp.push(a);
                    b.tid = _this.test_id;
                    b.temp = temp;
                    slo.push(b);
                    _this._tempSlots.push(slo);
                    localStorage.setItem('slot_details', JSON.stringify(_this._tempSlots));
                }
                else {
                    var temp2 = [];
                    slo = [];
                    temp2 = JSON.parse(localStorage.getItem('slot_details'));
                    temp2.forEach(function (element) {
                        _this._tempSlots.push(element);
                    });
                    a['slot_date'] = _this.sel_date;
                    a['slot_time'] = _this.sel_slot;
                    temp.push(a);
                    b.tid = _this.test_id;
                    b.temp = temp;
                    slo.push(b);
                    if (_this.myIndexOf(slo) < 0) {
                        _this._tempSlots.push(slo);
                    }
                    localStorage.setItem('slot_details', JSON.stringify(_this._tempSlots));
                }
                _this.grouter.navigate(['./cart']);
            });
        }
    };
    return SlotsComponent;
}());
SlotsComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-slots',
                templateUrl: './slots.component.html',
                styleUrls: ['./slots.component.css']
            },] },
];
/** @nocollapse */
SlotsComponent.ctorParameters = function () { return [
    { type: api_service_1.ApiService, },
    { type: core_1.Renderer, },
    { type: router_1.ActivatedRoute, },
    { type: router_2.Router, },
]; };
exports.SlotsComponent = SlotsComponent;
//# sourceMappingURL=slots.component.js.map