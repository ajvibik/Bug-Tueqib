import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { RegisterUserComponent } from './core/login/register-user/register-user.component';
import { AuthGuardService } from './core/services/auth-guard.service';

//import { AuthGuard } from './auth/auth.guard';
import { } from './modules/issue/issue.module'
export const AppRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: '',
      loadChildren: './session/session.module#SessionModule'
    }]
  },
  { path: '', pathMatch: 'full', component: AdminLayoutComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuardService],
    children: [{
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
      path: 'issues',
      loadChildren: './modules/issue/issue.module#IssueModule'
    },
    {
      path: 'account',
      loadChildren: './modules/account/account.module#AccountModule'
    },
    {
      path: 'apps',
      loadChildren: './modules/apps/apps.module#AppsModule'
    }]
  },
  { path: 'register', component: RegisterUserComponent },
  {
    path: 'reg', component: RegisterUserComponent
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }

];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);