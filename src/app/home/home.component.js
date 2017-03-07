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
var home_service_1 = require("./home.service");
var fb_service_1 = require("../fb.service");
var HomeComponent = (function () {
    function HomeComponent(router, homeService, fbService) {
        this.router = router;
        this.homeService = homeService;
        this.fbService = fbService;
        this.jobs = [];
        this.filteredJobs = [];
        this.cityFilteredJobs = [];
        this.eduFilteredJobs = [];
        this.jobCount = 0;
        this.fbService.initiate();
        this.nativeWindow = homeService.getNativeWindow();
        this.loadJobs();
        this.showLoading = true;
        this.cities = [];
        this.filteredCities = [];
        this.education = ['10th', '12th', 'BA', 'BCOM', 'BBA', 'BBM', 'BSC',
            'BHM', 'MBA', 'PGDM', 'BMS', 'MBA', 'MCOM', 'BE', 'BTECH', 'BCA', 'MCA',
            'MTECH', 'ME', 'BS', 'MS', 'MSC', 'MIB', 'MSW', 'MBBS', 'MD', 'MEDICAL',
            'MPHIL', 'BPHARM', 'MPHARM', 'PG', 'UG', 'DIPLOMA', 'INTER', 'ANY',
            'ITI', 'DEGREE'];
        this.filteredEducation = [];
        if (localStorage.getItem("user") != undefined && localStorage.getItem("user") != null) {
            this.showSubscribeButton = false;
        }
        else {
            this.showSubscribeButton = true;
        }
    }
    HomeComponent.prototype.checkLoginState = function () {
        this.fbService.checkLoginState();
    };
    HomeComponent.prototype.logOut = function () {
        this.fbService.logOut();
    };
    HomeComponent.prototype.statusChangeCallback = function (response) {
        this.fbService.statusChangeCallback(response);
    };
    ;
    HomeComponent.prototype.loadJobs = function () {
        var _this = this;
        this.homeService.getJobs()
            .subscribe(function (data) {
            _this.jobs = data.jobs;
            _this.filteredJobs = _this.jobs;
            data.jobs.forEach(function (item) {
                if (_this.cities.indexOf(item.location) == -1) {
                    _this.cities.push(item.location);
                }
            });
        }, function (error) { return _this.errorMessage = error; });
        setTimeout(function () {
            this.showLoading = false;
        }.bind(this), 3000);
    };
    HomeComponent.prototype.seeDetails = function (walkinObj) {
        var companyName = walkinObj.company;
        companyName = companyName.replace(/[^a-zA-Z0-9_-]/g, '-');
        companyName = "walk-in-drive-at-" + companyName;
        this.nativeWindow.open('/walkin/' + companyName + '-' + walkinObj._id);
    };
    HomeComponent.prototype.selectedCities = function (checkedOption) {
        if (this.filteredCities.indexOf(checkedOption) == -1) {
            this.filteredCities.push(checkedOption);
        }
        else {
            this.filteredCities.splice(this.filteredCities.indexOf(checkedOption), 1);
        }
        this.filterResults();
    };
    HomeComponent.prototype.selectedEducation = function (checkedOption) {
        if (this.filteredEducation.indexOf(checkedOption) == -1) {
            this.filteredEducation.push(checkedOption);
        }
        else {
            this.filteredEducation.splice(this.filteredEducation.indexOf(checkedOption), 1);
        }
        this.filterResults();
    };
    HomeComponent.prototype.filterResults = function () {
        var _this = this;
        this.filteredJobs = [];
        this.jobs.forEach(function (job) {
            var cityMatch = false;
            var educationMatch = false;
            _this.filteredCities.forEach(function (city) {
                if (job.location.toLowerCase() == city.toLowerCase()) {
                    cityMatch = true;
                }
            });
            _this.filteredEducation.forEach(function (education) {
                if (job.eligibility.toLowerCase().indexOf(education.toLowerCase()) != -1) {
                    educationMatch = true;
                }
            });
            if (_this.filteredCities.length == 0) {
                cityMatch = true;
            }
            if (_this.filteredEducation.length == 0) {
                educationMatch = true;
            }
            if (cityMatch && educationMatch) {
                _this.filteredJobs.push(job);
            }
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        styleUrls: ['./home.component.css', '../app.component.css'],
        templateUrl: './home.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, home_service_1.HomeService, fb_service_1.FBService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map