import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { Walkin } from '../model/walkin';
import { HomeService } from './home.service';
import {JobFilterPipe} from '../pipes/jobfilter.pipe';
import {OrderBy} from '../pipes/orderby.pipe';
import {UniquePipe} from '../pipes/unique.pipe';
import {ReplaceStringPipe} from '../pipes/replace-string-pipe';
import { FBService } from '../fb.service';
@Component({
    styleUrls: ['./home.component.css', '../app.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    errorMessage: string;
    jobs: Array<Walkin> = [];
    filteredJobs: Array<Walkin> = [];
    cityFilteredJobs: Array<Walkin> = [];
    eduFilteredJobs: Array<Walkin> = [];
    jobCount = 0;
    showDetails: boolean;
    walkin: Walkin;
    criteria: string;
    parameter: string;
    cities: string[];
    filteredCities: string[];
    education: string[];
    filteredEducation: string[];
    nativeWindow: any;
    isLoggedIn: boolean;
    showSubscribeButton: boolean;
    showLoading: boolean;

    constructor(private router: Router, private homeService: HomeService, private fbService: FBService) {
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
        } else {
            this.showSubscribeButton = true;
        }
    }
    checkLoginState() {
        this.fbService.checkLoginState();
    }
    logOut() {
        this.fbService.logOut();
    }
    statusChangeCallback(response) {
        this.fbService.statusChangeCallback(response);
    };
    loadJobs() {
        this.homeService.getJobs()
            .subscribe(
            data => {
                this.jobs = data.jobs;
                this.filteredJobs = this.jobs;
                data.jobs.forEach(item => {
                    if (this.cities.indexOf(item.location) == -1) {
                        this.cities.push(item.location);
                    }
                });
            },
            error => this.errorMessage = <any>error);
            setTimeout(function() {
                this.showLoading = false;
            }.bind(this), 3000);
    }
    seeDetails(walkinObj) {
        let companyName = walkinObj.company;
        companyName = companyName.replace(/[^a-zA-Z0-9_-]/g,'-');
        companyName = "walk-in-drive-at-"+companyName;
        //let link = ['/walkin', walkinObj._id];
        //this.router.navigate(link);
        this.nativeWindow.open('/walkin/' + companyName + '-' + walkinObj._id);
    }

    selectedCities(checkedOption) {
        if (this.filteredCities.indexOf(checkedOption) == -1) {
            this.filteredCities.push(checkedOption);
        } else {
            this.filteredCities.splice(this.filteredCities.indexOf(checkedOption), 1);
        }
        this.filterResults();
    }

    selectedEducation(checkedOption) {
        if (this.filteredEducation.indexOf(checkedOption) == -1) {
            this.filteredEducation.push(checkedOption);
        } else {
            this.filteredEducation.splice(this.filteredEducation.indexOf(checkedOption), 1);
        }
        this.filterResults();
    }

    filterResults() {
        this.filteredJobs = [];
        this.jobs.forEach(job => {
            let cityMatch = false;
            let educationMatch = false;
            this.filteredCities.forEach(city => {
                if (job.location.toLowerCase() == city.toLowerCase()) {
                    cityMatch = true;
                }
            })
            this.filteredEducation.forEach(education => {
                if (job.eligibility.toLowerCase().indexOf(education.toLowerCase()) != -1) {
                    educationMatch = true;
                }
            })

            if (this.filteredCities.length == 0) {
                cityMatch = true;
            }
            if (this.filteredEducation.length == 0) {
                educationMatch = true;
            }

            if (cityMatch && educationMatch) {
                this.filteredJobs.push(job);
            }
        });
    }

}
