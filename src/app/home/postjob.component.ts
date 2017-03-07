import { Component, OnInit} from '@angular/core';
import { Walkin } from '../model/walkin';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PostJobService } from './postjob.service';

@Component({
    templateUrl: './postjob.component.html',
    styleUrls: ['../app.component.css'],
})
export class PostJobComponent implements OnInit {
    public postJobForm: FormGroup;
    public submitted: boolean;
    public successMessage: string;
    public errorMessage: string;
    constructor(private router: Router, private formBuilder: FormBuilder, private postJobService: PostJobService) { }

    ngOnInit() {
        this.successMessage = '';
        this.errorMessage = '';
        this.postJobForm = this.formBuilder.group({
            company: new FormControl('', [<any>Validators.required]),
            companyProfile: [''],
            website: new FormControl('', [<any>Validators.required]),
            title: new FormControl('', [<any>Validators.required]),
            position: new FormControl('', [<any>Validators.required]),
            location: new FormControl('', [<any>Validators.required]),
            eligibility: new FormControl('', [<any>Validators.required]),
            experience: new FormControl('', [<any>Validators.required]),
            jobDescription: new FormControl('', [<any>Validators.required]),
            walkinDate: new FormControl('', [<any>Validators.required]),
            walkinTime: new FormControl('', [<any>Validators.required]),
            salary: new FormControl('', [<any>Validators.required]),
            howToApply: new FormControl('', [<any>Validators.required]),
            contactDetails: new FormControl('', [<any>Validators.required]),
            email: new FormControl('', [<any>Validators.required]),
            date: new FormControl({ value: new Date(), disabled: true })
        });
    }

    submit(model: Walkin, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);

        if (isValid != undefined && isValid) {
            this.postJobService.postWalkin(model)
                .subscribe(
                data => {
                    alert("Job details submitted for approval. " +
                        "You will receive an email once it is approved.");
                        let link = ['/home'];
                        this.router.navigate(link);

                }, error => {
                    this.errorMessage = "Job posting failed. Please send the job details to walkinshubindia@gmail.com"
                })
        }
    }

}
