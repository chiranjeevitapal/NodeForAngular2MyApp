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
var fb_service_1 = require("../fb.service");
var TutorialsComponent = (function () {
    function TutorialsComponent(router, fbService) {
        this.router = router;
        this.fbService = fbService;
        this.fbService.initiate();
        if (localStorage.getItem("user") != undefined && localStorage.getItem("user") != null) {
            this.showSubscribeButton = false;
        }
        else {
            this.showSubscribeButton = true;
        }
    }
    TutorialsComponent.prototype.checkLoginState = function () {
        this.fbService.checkLoginState();
    };
    TutorialsComponent.prototype.logOut = function () {
        this.fbService.logOut();
    };
    TutorialsComponent.prototype.statusChangeCallback = function (response) {
        this.fbService.statusChangeCallback(response);
    };
    ;
    TutorialsComponent.prototype.showTutotials = function (obj) {
        this.isCoreJava = false;
        this.isAngularjs = false;
        this.isNodeJs = false;
        this.isHtml5Css3 = false;
        if (obj.value == 'coreJava') {
            this.isCoreJava = true;
        }
        if (obj.value == 'angularJs') {
            this.isAngularjs = true;
        }
        if (obj.value == 'nodeJs') {
            this.isNodeJs = true;
        }
        if (obj.value == 'htmlCss') {
            this.isHtml5Css3 = true;
        }
    };
    return TutorialsComponent;
}());
TutorialsComponent = __decorate([
    core_1.Component({
        templateUrl: './tutorials.component.html',
        styleUrls: ['./tutorials.component.css', '../app.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, fb_service_1.FBService])
], TutorialsComponent);
exports.TutorialsComponent = TutorialsComponent;
//# sourceMappingURL=tutorials.component.js.map