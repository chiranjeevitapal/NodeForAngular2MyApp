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
var JobFilterPipe = (function () {
    function JobFilterPipe() {
    }
    JobFilterPipe.prototype.transform = function (allJobs, criteria, parameter) {
        // filter items array, items which match and return true will be kept, false will be filtered out
        if (criteria == 'location') {
            if (parameter == 'All') {
                return allJobs;
            }
            return allJobs.filter(function (job) { return job.location.toLowerCase().indexOf(parameter.toLowerCase()) != -1; });
        }
        if (criteria == 'eligibility') {
            if (parameter == 'All') {
                return allJobs;
            }
            return allJobs.filter(function (job) { return job.eligibility.toLowerCase().indexOf(parameter.toLowerCase()) != -1; });
        }
        if (criteria == 'experience') {
            if (parameter == 'All') {
                return allJobs;
            }
            return allJobs.filter(function (job) { return job.experience.toLowerCase().indexOf(parameter.toLowerCase()) != -1; });
        }
        return allJobs;
    };
    return JobFilterPipe;
}());
JobFilterPipe = __decorate([
    core_1.Pipe({
        name: 'jobfilter',
        pure: false
    }),
    __metadata("design:paramtypes", [])
], JobFilterPipe);
exports.JobFilterPipe = JobFilterPipe;
//# sourceMappingURL=jobfilter.pipe.js.map