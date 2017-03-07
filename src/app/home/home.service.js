"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var globals_1 = require("../globals");
var HomeService = (function () {
    function HomeService(http) {
        this.http = http;
        this.jobsListUrl = '/api/walkinsAll';
        this.jobUrl = '/api/walkin';
        this.host = '';
        this.port = globals_1.Globals.NODE_PORT;
        this.host = 'http://' + window.location.hostname + ':' + this.port;
    }
    HomeService.prototype.getJobs = function () {
        return this.http.get(this.host + this.jobsListUrl)
            .map(function (resp) { return ({
            jobs: resp.json()
        }); })
            .catch(this.handleError);
    };
    HomeService.prototype.getWalkin = function (id) {
        return this.http.get(this.host + this.jobUrl + '/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HomeService.prototype.getNativeWindow = function () {
        return window;
    };
    HomeService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    HomeService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'error');
    };
    return HomeService;
}());
HomeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map