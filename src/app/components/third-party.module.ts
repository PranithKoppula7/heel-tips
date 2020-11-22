import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassListComponent } from './classes/class-list/class-list.component';
import { ClassPostsComponent } from './class-posts/class-posts.component';
import { AuthService } from '../shared/auth.service';
import { CreateTipComponent } from './create-tip/create-tip.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        FlexLayoutModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        RouterModule,
        BrowserModule,
        MatAutocompleteModule,
        MatIconModule,
        MatSnackBarModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        FlexLayoutModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        RouterModule,
        BrowserModule,
        MatAutocompleteModule,
        MatIconModule,
        MatSnackBarModule
    ],
    providers: [AuthService],
    declarations: [LoginComponent, RegisterComponent, DashboardComponent, ClassListComponent, ClassPostsComponent, CreateTipComponent, ProfileComponent]
})

export class ThirdPartyModule{}