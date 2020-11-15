import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassesComponent } from './components/classes/classes.component';
import { AuthGuard } from './auth.guard';
import { ClassListComponent } from './components/classes/class-list/class-list.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { ClassPostsComponent } from './components/class-posts/class-posts.component';
import { CreateTipComponent } from './components/create-tip/create-tip.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  }, {
    path: 'classes',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        {
          path: '',
          component: ClassesComponent
        },
        {
          path: 'class-list',
          component: ClassListComponent
        }, {
          path: 'class-posts',
          component: ClassPostsComponent
        }
    ]
  }, {
    path: 'create-tip',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CreateTipComponent
      }
    ]
  }, {
    path: 'edit-tip',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: EditPostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
