import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: WelcomeComponent },
    { path: 'customers/new', component: CreateCustomerComponent },
    { path: 'customers/:id', component: CustomerDetailComponent },
    { path: 'customers/:id/edit', component: CreateCustomerComponent },
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
