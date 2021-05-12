import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCustomer from './store/customer.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { CustomerRoutingModule } from './customer-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from './store/customer.effects';
import { CustomerComponent } from './customer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { SidebarMenuItemComponent } from './sidebar/sidebar-menu-item/sidebar-menu-item.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DescriptionComponent } from './customer-detail/description/description.component';

@NgModule({
    declarations: [
        CustomerComponent,
        SidebarComponent,
        SidebarMenuItemComponent,
        CreateCustomerComponent,
        CustomerDetailComponent,
        DescriptionComponent,
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NzLayoutModule,
        NzTypographyModule,
        NzSpaceModule,
        NzDividerModule,
        NzSpinModule,
        NzEmptyModule,
        NzAvatarModule,
        NzPageHeaderModule,
        NzFormModule,
        NzInputModule,
        NzModalModule,
        NzMessageModule,
        NzAlertModule,
        NzButtonModule,
        NzMenuModule,
        NzSkeletonModule,
        StoreModule.forFeature(
            fromCustomer.customersFeatureKey,
            fromCustomer.reducer
        ),
        EffectsModule.forFeature([CustomerEffects]),
    ],
})
export class CustomerModule {}
