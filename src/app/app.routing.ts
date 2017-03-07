import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }      from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { RegisterComponent } from './register/register.component';
import { PostJobComponent } from './home/postjob.component';
import { ProfileComponent } from './profile/profile.component';
import { WalkinDetailsComponent } from './home/walkin.details.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { JobSeekersComponent } from './jobseekers/jobseekers.component';

const appRoutes: Routes = [
    {
        path: "home",
        component: HomeComponent
    }, {
        path: "dashboard",
        component: DashboardComponent
    }, {
        path: "uploadChethan",
        component: UploadComponent
    }, {
        path: "register",
        component: RegisterComponent
    }, {
        path: "postJob",
        component: PostJobComponent
    }, {
        path: "walkin/:id",
        component: WalkinDetailsComponent
    }, {
        path: "tutorials",
        component: TutorialsComponent
    }, {
        path: "profile",
        component: ProfileComponent
    }, {
        path: "jobseekers",
        component: JobSeekersComponent
    }, {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }, {
        path: "**",
        redirectTo: '/home'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
