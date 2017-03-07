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
var postjob_service_1 = require("./postjob.service");
var PostJobComponent = (function () {
    function PostJobComponent(router, formBuilder, postJobService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.postJobService = postJobService;
    }
    PostJobComponent.prototype.ngOnInit = function () {
        this.successMessage = '';
        this.errorMessage = '';
        this.postJobForm = this.formBuilder.group({
            company: new forms_1.FormControl('', [forms_1.Validators.required]),
            companyProfile: [''],
            website: new forms_1.FormControl('', [forms_1.Validators.required]),
            title: new forms_1.FormControl('', [forms_1.Validators.required]),
            position: new forms_1.FormControl('', [forms_1.Validators.required]),
            location: new forms_1.FormControl('', [forms_1.Validators.required]),
            eligibility: new forms_1.FormControl('', [forms_1.Validators.required]),
            experience: new forms_1.FormControl('', [forms_1.Validators.required]),
            jobDescription: new forms_1.FormControl('', [forms_1.Validators.required]),
            walkinDate: new forms_1.FormControl('', [forms_1.Validators.required]),
            walkinTime: new forms_1.FormControl('', [forms_1.Validators.required]),
            salary: new forms_1.FormControl('', [forms_1.Validators.required]),
            howToApply: new forms_1.FormControl('', [forms_1.Validators.required]),
            contactDetails: new forms_1.FormControl('', [forms_1.Validators.required]),
            email: new forms_1.FormControl('', [forms_1.Validators.required]),
            date: new forms_1.FormControl({ value: new Date(), disabled: true })
        });
    };
    PostJobComponent.prototype.submit = function (model, isValid) {
        var _this = this;
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
        if (isValid != undefined && isValid) {
            this.postJobService.postWalkin(model)
                .subscribe(function (data) {
                alert("Job details submitted for approval. " +
                    "You will receive an email once it is approved.");
                var link = ['/home'];
                _this.router.navigate(link);
            }, function (error) {
                _this.errorMessage = "Job posting failed. Please send the job details to walkinshubindia@gmail.com";
            });
        }
    };
    return PostJobComponent;
}());
PostJobComponent = __decorate([
    core_1.Component({
        templateUrl: './postjob.component.html',
        styleUrls: ['../app.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router, forms_1.FormBuilder, postjob_service_1.PostJobService])
], PostJobComponent);
exports.PostJobComponent = PostJobComponent;
//# sourceMappingURL=postjob.component.js.map