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
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var home_component_1 = require("./home/home.component");
var postjob_component_1 = require("./home/postjob.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var upload_component_1 = require("./upload/upload.component");
var register_component_1 = require("./register/register.component");
var walkin_details_component_1 = require("./home/walkin.details.component");
var tutorials_component_1 = require("./tutorials/tutorials.component");
var profile_component_1 = require("./profile/profile.component");
var jobseekers_component_1 = require("./jobseekers/jobseekers.component");
var app_routing_1 = require("./app.routing");
var home_service_1 = require("./home/home.service");
var app_service_1 = require("./app.service");
var upload_service_1 = require("./upload/upload.service");
var postjob_service_1 = require("./home/postjob.service");
var register_service_1 = require("./register/register.service");
var profile_service_1 = require("./profile/profile.service");
var fb_service_1 = require("./fb.service");
var jobfilter_pipe_1 = require("./pipes/jobfilter.pipe");
var orderby_pipe_1 = require("./pipes/orderby.pipe");
var unique_pipe_1 = require("./pipes/unique.pipe");
var replace_string_pipe_1 = require("./pipes/replace-string-pipe");
var app_component_1 = require("./app.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            app_routing_1.routing
        ],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, dashboard_component_1.DashboardComponent, upload_component_1.UploadComponent, register_component_1.RegisterComponent, postjob_component_1.PostJobComponent,
            walkin_details_component_1.WalkinDetailsComponent, tutorials_component_1.TutorialsComponent, profile_component_1.ProfileComponent, jobseekers_component_1.JobSeekersComponent, jobfilter_pipe_1.JobFilterPipe, orderby_pipe_1.OrderBy, unique_pipe_1.UniquePipe, replace_string_pipe_1.ReplaceStringPipe],
        providers: [home_service_1.HomeService, upload_service_1.UploadService, postjob_service_1.PostJobService, register_service_1.RegisterService, app_service_1.AppService, profile_service_1.ProfileService, fb_service_1.FBService],
        bootstrap: [app_component_1.AppComponent],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map