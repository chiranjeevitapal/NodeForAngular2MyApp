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
var globals_1 = require("./globals");
var auth_model_1 = require("./model/auth.model");
var app_service_1 = require("./app.service");
var FBService = (function () {
    function FBService(http, appService) {
        this.http = http;
        this.appService = appService;
        //urls
        this.jobsListUrl = '/api/walkinsAll';
        this.jobUrl = '/api/walkinWithId';
        this.host = '';
        this.port = globals_1.Globals.NODE_PORT;
        this.authParams = new auth_model_1.AuthModel('', '', '', '', '', true, '');
    }
    FBService.prototype.initiate = function () {
        var _this = this;
        if (typeof (FB) != 'undefined' && FB != null) {
            FB.init({
                appId: '1646263562333117',
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.8'
            });
            FB.AppEvents.logPageView();
        }
        if (typeof (FB) != 'undefined' && FB != null) {
            FB.getLoginStatus(function (response) {
                _this.statusChangeCallback(response);
            });
        }
    };
    FBService.prototype.checkLoginState = function () {
        var _this = this;
        if (typeof (FB) != 'undefined' && FB != null) {
            FB.login(function (response) {
                _this.statusChangeCallback(response);
            }, { scope: 'public_profile,email' });
        }
    };
    FBService.prototype.logOut = function () {
        if (typeof (FB) != 'undefined' && FB != null) {
            FB.logout(function (response) {
                window.location.reload();
            });
            return false;
        }
    };
    FBService.prototype.statusChangeCallback = function (response) {
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.isLoggedIn = true;
            if (this.isLoggedIn) {
                document.getElementById("loggedIn").style.display = "block";
                document.getElementById("notLoggedIn").style.display = "none";
                localStorage.setItem("isLoggedIn", "true");
            }
            else {
                document.getElementById("loggedIn").style.display = "none";
                document.getElementById("notLoggedIn").style.display = "block";
                localStorage.setItem("isLoggedIn", "false");
            }
            var that_1 = this;
            if (typeof (FB) != 'undefined' && FB != null) {
                FB.api('/me', {
                    locale: 'en_US', fields: 'first_name, last_name, email, gender, verified, picture'
                }, function (response) {
                    var _this = this;
                    document.getElementById('username').innerHTML = response.first_name;
                    document.querySelector("#userImg").src = response.picture.data.url;
                    localStorage.setItem("user", response.id);
                    that_1.authParams.fb_id = response.id;
                    that_1.authParams.fb_first_name = response.first_name;
                    that_1.authParams.fb_last_name = response.last_name;
                    that_1.authParams.fb_email = response.email;
                    that_1.authParams.fb_gender = response.gender;
                    that_1.authParams.fb_verified = response.verified;
                    that_1.authParams.fb_picture = response.picture.data.url;
                    that_1.appService.registerUser(that_1.authParams)
                        .subscribe(function (data) {
                        //console.log("data uploaded successfully..");
                    }, function (error) {
                        //console.log("data upload failed..");
                        _this.errorMessage = error;
                    });
                });
            }
        }
        else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            this.isLoggedIn = false;
            document.getElementById("loggedIn").style.display = "none";
            document.getElementById("notLoggedIn").style.display = "block";
            localStorage.setItem("isLoggedIn", "false");
        }
        else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            this.isLoggedIn = false;
            document.getElementById("loggedIn").style.display = "none";
            document.getElementById("notLoggedIn").style.display = "block";
            localStorage.setItem("isLoggedIn", "false");
        }
    };
    ;
    return FBService;
}());
FBService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_service_1.AppService])
], FBService);
exports.FBService = FBService;
//# sourceMappingURL=fb.service.js.map