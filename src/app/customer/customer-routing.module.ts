import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerComponent } from './customer.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: CustomerComponent,
        children: [
            { path: '', pathMatch: 'full', component: WelcomeComponent },
            { path: 'new', component: CreateCustomerComponent },
            { path: ':id', component: CustomerDetailComponent },
            { path: ':id/edit', component: CreateCustomerComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerRoutingModule {}
