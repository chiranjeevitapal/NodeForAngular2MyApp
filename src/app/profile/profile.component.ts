import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['../app.component.css']
})
export class ProfileComponent implements OnInit {
    profile : any;
    public submitted: boolean;
    public profileForm: FormGroup;
    successMessage: string;
    errorMessage: string;
    profileId: string;
    constructor(private router: Router, private formBuilder: FormBuilder, private profileService: ProfileService) { }

    ngOnInit() {
      this.successMessage = '';
      this.errorMessage = '';
        this.profileForm = this.formBuilder.group({
            fb_first_name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            fb_last_name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            fb_email: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            fb_phone: ['', [<any>Validators.required, <any>Validators.maxLength(10)]],
            fb_qualification: ['', [<any>Validators.required, <any>Validators.maxLength(10)]],
            fb_experience: ['', [<any>Validators.required, <any>Validators.maxLength(2)]],
            fb_about: ['', [<any>Validators.required, <any>Validators.maxLength(60)]],
            fb_skills: ['', [<any>Validators.required, <any>Validators.maxLength(50)]],
            fb_location: ['', [<any>Validators.required, <any>Validators.maxLength(25)]],
            fb_role:['user'],
            fb_resume:['']
        });
        this.loadProfile();
    }

    loadProfile() {
        this.profileService.getProfile(localStorage.getItem("user"))
            .subscribe(
            data => {
              this.profile = data[0];
              this.profileId = this.profile.fb_id
              this.profileForm = this.formBuilder.group({
                  fb_first_name: [this.profile.fb_first_name, [<any>Validators.required]],
                  fb_last_name: [this.profile.fb_last_name, [<any>Validators.required]],
                  fb_email: [this.profile.fb_email, [<any>Validators.required]],
                  fb_phone: [this.profile.fb_phone, [<any>Validators.required]],
                  fb_qualification: [this.profile.fb_qualification, [<any>Validators.required, <any>Validators.maxLength(10)]],
                  fb_experience: [this.profile.fb_experience, [<any>Validators.required, <any>Validators.maxLength(2)]],
                  fb_about: [this.profile.fb_about, [<any>Validators.required, <any>Validators.maxLength(60)]],
                  fb_skills: [this.profile.fb_skills, [<any>Validators.required, <any>Validators.maxLength(50)]],
                  fb_location: [this.profile.fb_location, [<any>Validators.required, <any>Validators.maxLength(25)]]
                  //fb_role:['user'],
                  //fb_resume:['']
              });
            },
            error => {

            });
    }

    save(profile: any, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        if (isValid != undefined && isValid) {
          profile.fb_id = this.profileId;
            this.profileService.updateProfile(profile)
                .subscribe(
                data => {
                    this.successMessage = "Profile updated successfully"
                },
                error => {
                    this.errorMessage = "Profile updation failed.";
                });
        }
    }
}
