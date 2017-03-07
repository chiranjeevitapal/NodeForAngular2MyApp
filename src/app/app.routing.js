"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var upload_component_1 = require("./upload/upload.component");
var register_component_1 = require("./register/register.component");
var postjob_component_1 = require("./home/postjob.component");
var profile_component_1 = require("./profile/profile.component");
var walkin_details_component_1 = require("./home/walkin.details.component");
var tutorials_component_1 = require("./tutorials/tutorials.component");
var jobseekers_component_1 = require("./jobseekers/jobseekers.component");
var appRoutes = [
    {
        path: "home",
        component: home_component_1.HomeComponent
    }, {
        path: "dashboard",
        component: dashboard_component_1.DashboardComponent
    }, {
        path: "uploadChethan",
        component: upload_component_1.UploadComponent
    }, {
        path: "register",
        component: register_component_1.RegisterComponent
    }, {
        path: "postJob",
        component: postjob_component_1.PostJobComponent
    }, {
        path: "walkin/:id",
        component: walkin_details_component_1.WalkinDetailsComponent
    }, {
        path: "tutorials",
        component: tutorials_component_1.TutorialsComponent
    }, {
        path: "profile",
        component: profile_component_1.ProfileComponent
    }, {
        path: "jobseekers",
        component: jobseekers_component_1.JobSeekersComponent
    }, {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }, {
        path: "**",
        redirectTo: '/home'
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map