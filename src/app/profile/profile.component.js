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
var profile_service_1 = require("./profile.service");
var forms_1 = require("@angular/forms");
var ProfileComponent = (function () {
    function ProfileComponent(router, formBuilder, profileService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.profileService = profileService;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.successMessage = '';
        this.errorMessage = '';
        this.profileForm = this.formBuilder.group({
            fb_first_name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            fb_last_name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            fb_email: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            fb_phone: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            fb_qualification: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            fb_experience: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(2)]],
            fb_about: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(60)]],
            fb_skills: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            fb_location: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(25)]],
            fb_role: ['user'],
            fb_resume: ['']
        });
        this.loadProfile();
    };
    ProfileComponent.prototype.loadProfile = function () {
        var _this = this;
        this.profileService.getProfile(localStorage.getItem("user"))
            .subscribe(function (data) {
            _this.profile = data[0];
            _this.profileId = _this.profile.fb_id;
            _this.profileForm = _this.formBuilder.group({
                fb_first_name: [_this.profile.fb_first_name, [forms_1.Validators.required]],
                fb_last_name: [_this.profile.fb_last_name, [forms_1.Validators.required]],
                fb_email: [_this.profile.fb_email, [forms_1.Validators.required]],
                fb_phone: [_this.profile.fb_phone, [forms_1.Validators.required]],
                fb_qualification: [_this.profile.fb_qualification, [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
                fb_experience: [_this.profile.fb_experience, [forms_1.Validators.required, forms_1.Validators.maxLength(2)]],
                fb_about: [_this.profile.fb_about, [forms_1.Validators.required, forms_1.Validators.maxLength(60)]],
                fb_skills: [_this.profile.fb_skills, [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
                fb_location: [_this.profile.fb_location, [forms_1.Validators.required, forms_1.Validators.maxLength(25)]]
            });
        }, function (error) {
        });
    };
    ProfileComponent.prototype.save = function (profile, isValid) {
        var _this = this;
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        if (isValid != undefined && isValid) {
            profile.fb_id = this.profileId;
            this.profileService.updateProfile(profile)
                .subscribe(function (data) {
                _this.successMessage = "Profile updated successfully";
            }, function (error) {
                _this.errorMessage = "Profile updation failed.";
            });
        }
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        templateUrl: './profile.component.html',
        styleUrls: ['../app.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, forms_1.FormBuilder, profile_service_1.ProfileService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map