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
var router_1 = require("@angular/router");
var walkin_1 = require("../model/walkin");
var home_service_1 = require("./home.service");
var fb_service_1 = require("../fb.service");
var WalkinDetailsComponent = (function () {
    function WalkinDetailsComponent(router, route, homeService, fbService) {
        this.router = router;
        this.route = route;
        this.homeService = homeService;
        this.fbService = fbService;
        this.walkin = new walkin_1.Walkin('', new Date(), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        this.fbService.initiate();
        this.nativeWindow = homeService.getNativeWindow();
        this.similarJobs = [];
        if (localStorage.getItem("user") != undefined && localStorage.getItem("user") != null) {
            this.showSubscribeButton = false;
        }
        else {
            this.showSubscribeButton = true;
        }
    }
    WalkinDetailsComponent.prototype.checkLoginState = function () {
        this.fbService.checkLoginState();
    };
    WalkinDetailsComponent.prototype.logOut = function () {
        this.fbService.logOut();
    };
    WalkinDetailsComponent.prototype.statusChangeCallback = function (response) {
        this.fbService.statusChangeCallback(response);
    };
    ;
    WalkinDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.homeService.getWalkin(id)
                .subscribe(function (data) {
                if (data.code == 500) {
                    _this.errorMessage = '' + data.error;
                }
                else {
                    _this.walkin = data[0];
                    _this.loadSimilarJobs(_this.walkin.date, _this.walkin.location);
                    _this.errorMessage = '';
                }
            }, function (error) {
                _this.errorMessage = error;
            });
        });
    };
    WalkinDetailsComponent.prototype.loadSimilarJobs = function (date, location) {
        var _this = this;
        this.homeService.getJobs()
            .subscribe(function (data) {
            data.jobs.forEach(function (item) {
                if (item.location == location) {
                    _this.similarJobs.push(item);
                }
            });
        }, function (error) { return _this.errorMessage = error; });
    };
    WalkinDetailsComponent.prototype.seeDetails = function (walkinObj) {
        var companyName = walkinObj.company;
        companyName = companyName.replace(/[^a-zA-Z0-9_-]/g, '-');
        companyName = "walk-in-drive-at-" + companyName;
        this.nativeWindow.open('/walkin/' + companyName + '-' + walkinObj._id);
    };
    WalkinDetailsComponent.prototype.goBack = function () {
        var link = ['/home'];
        this.router.navigate(link);
    };
    WalkinDetailsComponent.prototype.openWebsite = function (website) {
        if (website.indexOf('http') == -1) {
            window.open('http://' + website, '_blank');
        }
        else {
            window.open(website, '_blank');
        }
    };
    return WalkinDetailsComponent;
}());
WalkinDetailsComponent = __decorate([
    core_1.Component({
        templateUrl: './walkin.details.component.html',
        styleUrls: ['../app.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, home_service_1.HomeService, fb_service_1.FBService])
], WalkinDetailsComponent);
exports.WalkinDetailsComponent = WalkinDetailsComponent;
//# sourceMappingURL=walkin.details.component.js.map