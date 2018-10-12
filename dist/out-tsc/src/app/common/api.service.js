"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//import {BookComponent} from '../book/book.component';
require("rxjs/add/operator/map");
var ApiService = (function () {
    function ApiService(http) {
        // bookcomponent:any;
        this.labDetails = [];
        this.token = null;
        //private url:any='http://192.168.0.169:2007/api/';
        this.mdata = [];
        this.url = 'http://208.163.37.165/IntgCEMS/CemsDataRequest.asmx/';
        this.url1 = 'http://208.163.37.165/IntgCEMS/CemsDataRequest.asmx/GetAuthorization';
        this.http = http;
        // this.labDetails =[];
        this.mdata = [];
    }
    ApiService.prototype.getToken = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'x-www-form-urlencoded');
        return this.http.get(this.url1).map(function (data) {
            var data2 = JSON.parse(_this.trimxmltag(data._body));
            localStorage.setItem('req_token', _this.token);
            return _this.token = data2.data[0].GUID;
        });
    };
    //  push(token:any,url:any,data:any){
    //  } 
    ApiService.prototype.masterCall = function (url, data) {
        var _this = this;
        //data.TokenNo=localStorage.getItem('req_token')
        var body = this.transform(data);
        // console.log(body);
        return this.http.post(this.url + url, body, {
            headers: {
                'Accept': 'application/xml',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .map(function (res) {
            var res1 = _this.trimxmltag(res['_body']);
            //console.log(res1);
            var tstat = JSON.parse(res1).status;
            if (tstat == 1) {
                return { status: tstat, json: res1 };
            }
            else {
                return { status: tstat, json: "[]" };
            }
        });
    };
    ApiService.prototype.POST = function (url, data) {
        var _this = this;
        //request token here
        //localStorage.setItem('req_token','');
        this.getToken().map(function (data2) {
            _this.token = data2.data[0].GUID;
            localStorage.setItem('req_token', _this.token);
        });
        return this.masterCall(url, data).debounceTime(2000).map(function (res) {
            return _this.mdata = res;
        });
    };
    ApiService.prototype.trimxmltag = function (dt) {
        var re0 = '<?xml version="1.0" encoding="utf-8"?>';
        var re = '<string xmlns="http://Suvarna.org/">';
        var re1 = '</string>';
        var str = dt;
        var newstr = str.replace(re, "");
        var newstr = newstr.replace(re1, "");
        var newstr = newstr.replace(re0, "");
        //var newstr = newstr.replace(null, ""); 
        var parsed_data = newstr.trim();
        return parsed_data;
    };
    ApiService.prototype.transform = function (data) {
        var ret = "";
        var i = 0;
        for (var key in data) {
            if (i == 0) {
                ret = ret + '' + key + '=' + data[key];
            }
            else {
                ret = ret + '&' + key + '=' + data[key];
            }
            i++;
        }
        //console.log(ret);
        return ret;
    };
    ApiService.prototype.PinByGoogle = function (req_url) {
        var _this = this;
        //console.log(req_url);
        return this.http.get(req_url).map(function (data) {
            return JSON.parse(_this.trimxmltag(data._body)).results;
        });
    };
    return ApiService;
}());
ApiService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
ApiService.ctorParameters = function () { return [
    { type: http_1.Http, },
]; };
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map