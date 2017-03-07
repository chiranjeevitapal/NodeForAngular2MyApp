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
var forms_1 = require("@angular/forms");
var upload_service_1 = require("./upload.service");
var UploadComponent = (function () {
    function UploadComponent(router, formBuilder, uploadService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.uploadService = uploadService;
        this.events = [];
    }
    UploadComponent.prototype.ngOnInit = function () {
        this.websites = ['todaywalkins'];
        this.myForm = this.formBuilder.group({
            title: [''],
            date: [''],
            position: [''],
            location: [''],
            company: [''],
            eligibility: [''],
            experience: [''],
            jobDescription: [''],
            salary: [''],
            lastDate: [''],
            walkinDate: [''],
            walkinTime: [''],
            companyProfile: [''],
            howToApply: [''],
            website: [''],
            contactDetails: [''],
            jobRequirements: [''],
            candidateProfile: [''],
            websiteName: [this.websites[0]],
            websiteLink: [''],
            message: ['']
        });
    };
    UploadComponent.prototype.sendMessage = function (message) {
        this.uploadService.sendEmail(message)
            .subscribe(function (data) {
            alert("Message sent.");
        }, function (error) {
            alert("Message not sent.");
        });
    };
    UploadComponent.prototype.save = function (model, isValid) {
        var _this = this;
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
        if (isValid != undefined && isValid) {
            this.uploadService.postWalkin(model)
                .subscribe(function (data) {
                alert("Data Uploaded..");
                _this.myForm = _this.formBuilder.group({
                    title: [''],
                    date: [''],
                    position: [''],
                    location: [''],
                    company: [''],
                    eligibility: [''],
                    experience: [''],
                    jobDescription: [''],
                    salary: [''],
                    lastDate: [''],
                    walkinDate: [''],
                    walkinTime: [''],
                    companyProfile: [''],
                    howToApply: [''],
                    website: [''],
                    contactDetails: [''],
                    jobRequirements: [''],
                    candidateProfile: [''],
                    websiteName: [_this.websites[0]],
                    websiteLink: ['']
                });
                var link = ['/uploadChethan'];
                _this.router.navigate(link);
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    UploadComponent.prototype.scrapeWalkin = function (model) {
        var _this = this;
        this.uploadService.scrapeWeb(model.websiteName, model.websiteLink)
            .subscribe(function (data) {
            _this.myForm = _this.formBuilder.group({
                title: [data.title],
                date: [data.date],
                position: [data.position],
                location: [data.location],
                company: [data.company],
                eligibility: [data.eligibility],
                experience: [data.experience],
                jobDescription: [data.jobDescription],
                salary: [data.salary],
                lastDate: [data.lastDate],
                walkinDate: [data.walkinDate],
                walkinTime: [data.walkinTime],
                companyProfile: [data.companyProfile],
                howToApply: [data.howToApply],
                website: [data.website],
                contactDetails: [data.contactDetails],
                jobRequirements: [data.jobRequirements],
                candidateProfile: [data.candidateProfile],
                websiteName: [data.websiteName],
                websiteLink: [data.websiteLink]
            });
        }, function (error) { return _this.errorMessage = error; });
    };
    UploadComponent.prototype.scrapeAndSave = function (model) {
        var _this = this;
        this.uploadService.getAllJobLinks(model.websiteName)
            .subscribe(function (data) {
            data.forEach(function (walkinLink) {
                _this.uploadService.scrapeWeb(model.websiteName, walkinLink)
                    .subscribe(function (walkinsObj) {
                    console.log(walkinsObj);
                    _this.uploadService.postWalkin(walkinsObj)
                        .subscribe(function (successUpload) {
                    }, function (error) { return _this.errorMessage = error; });
                }, function (error) { return _this.errorMessage = error; });
            });
            alert("Data Uploaded..");
        }, function (error) { return _this.errorMessage = error; });
    };
    UploadComponent.prototype.notify = function () {
        this.uploadService.notifySubscribers()
            .subscribe(function (data) {
            alert(data + " Notified Subscribers");
        }, function (error) {
            alert("Notification Failed");
        });
    };
    return UploadComponent;
}());
UploadComponent = __decorate([
    core_1.Component({
        templateUrl: './upload.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, forms_1.FormBuilder, upload_service_1.UploadService])
], UploadComponent);
exports.UploadComponent = UploadComponent;
//# sourceMappingURL=upload.component.js.map