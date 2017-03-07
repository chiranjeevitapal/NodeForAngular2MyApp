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
var register_service_1 = require("./register.service");
var RegisterComponent = (function () {
    function RegisterComponent(router, formBuilder, registerService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.registerService = registerService;
        this.events = [];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registrationForm = this.formBuilder.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"), forms_1.Validators.required])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.minLength(6), forms_1.Validators.maxLength(15), forms_1.Validators.required])],
            active: false,
            role: ['user'],
            subscribe: true,
            passString: ''
        });
    };
    RegisterComponent.prototype.register = function (model, isValid) {
        var _this = this;
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        //console.log(model, isValid);
        if (isValid != undefined && isValid) {
            model._id = '' + model.email;
            model.passString = '' + model.password;
            this.registerService.registerUser(model)
                .subscribe(function (data) {
                if (data.code == 11000) {
                    alert("Email id is already in use");
                }
                else {
                    alert(model.email + " is successfully subscribed.");
                    var link = ['/home'];
                    _this.router.navigate(link);
                }
            }, function (error) {
                alert("Registration not successful. Please report the problem to walkinshub1@gmail.com");
            });
        }
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        templateUrl: './register.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, forms_1.FormBuilder, register_service_1.RegisterService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map