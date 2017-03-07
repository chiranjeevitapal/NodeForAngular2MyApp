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
var UploadService = (function () {
    function UploadService(http) {
        this.http = http;
        //urls
        this.jobsListUrl = '/api/walkinsAll';
        this.postWalkinUrl = '/api/postWalkin';
        this.scrapeWalkinUrl = '/api/scrape';
        this.scrapeAllWalkinsUrl = '/api/scrapeAll';
        this.todayWalkinsObjectUrl = '/api/scrapeTodayUrls';
        this.notifyUrl = '/api/notifyfbsubscribers';
        this.sendEmailUrl = '/api/bulkmailer';
        this.host = '';
        this.port = globals_1.Globals.NODE_PORT;
        this.host = 'http://' + window.location.hostname + ':' + this.port;
    }
    UploadService.prototype.postWalkin = function (walkin) {
        var bodyString = JSON.stringify({ walkin: walkin }); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON , { 'X- Token': 'Chinna@*27' }
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.host + this.postWalkinUrl, bodyString, options) // ...using post request
            .map(this.extractData)
            .catch(this.handleError);
    };
    UploadService.prototype.scrapeWeb = function (websiteName, websiteLink) {
        //let urlParams = paramsToQueryString(params);
        return this.http.get(this.host + this.scrapeWalkinUrl + '/' + websiteName + "/" + websiteLink)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UploadService.prototype.getAllJobLinks = function (websiteName) {
        return this.http.get(this.host + this.todayWalkinsObjectUrl + '/' + websiteName)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UploadService.prototype.notifySubscribers = function () {
        return this.http.get(this.host + this.notifyUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UploadService.prototype.sendEmail = function (message) {
        var bodyString = JSON.stringify({ message: message }); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON , { 'X- Token': 'Chinna@*27' }
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.host + this.sendEmailUrl, bodyString, options) // ...using post request
            .map(this.extractData)
            .catch(this.handleError);
    };
    UploadService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    UploadService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'error');
    };
    return UploadService;
}());
UploadService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map