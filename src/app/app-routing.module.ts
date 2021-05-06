import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { CustomersComponent } from './customers/customers.component';
import { WelcomeComponent } from './customers/welcome/welcome.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'customers' },
    {
        path: 'customers',
        component: CustomersComponent,
        children: [
            { path: '', pathMatch: 'full', component: WelcomeComponent },
            { path: 'new', component: CreateCustomerComponent },
            { path: ':id', component: CustomerDetailComponent },
            { path: ':id/edit', component: CreateCustomerComponent },
        ],
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
        ],
    },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' },
    // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
    // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
