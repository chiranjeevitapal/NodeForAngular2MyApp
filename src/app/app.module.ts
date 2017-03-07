import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HomeComponent }      from './home/home.component';
import { PostJobComponent }      from './home/postjob.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { RegisterComponent } from './register/register.component';
import { WalkinDetailsComponent } from './home/walkin.details.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { ProfileComponent } from './profile/profile.component';
import { JobSeekersComponent } from './jobseekers/jobseekers.component';
import { routing } from './app.routing';
import { HomeService } from './home/home.service';
import { AppService } from './app.service';
import { UploadService } from './upload/upload.service';
import { PostJobService } from './home/postjob.service';
import { RegisterService } from './register/register.service';
import { ProfileService } from './profile/profile.service';
import { FBService } from './fb.service';
import {JobFilterPipe} from './pipes/jobfilter.pipe';
import {OrderBy} from './pipes/orderby.pipe';
import {UniquePipe} from './pipes/unique.pipe';
import {ReplaceStringPipe} from './pipes/replace-string-pipe';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    declarations: [AppComponent, HomeComponent, DashboardComponent, UploadComponent, RegisterComponent, PostJobComponent,
      WalkinDetailsComponent, TutorialsComponent, ProfileComponent, JobSeekersComponent, JobFilterPipe, OrderBy, UniquePipe, ReplaceStringPipe],
    providers: [HomeService, UploadService, PostJobService, RegisterService, AppService, ProfileService, FBService],
    bootstrap: [AppComponent],
})

export class AppModule {
}
