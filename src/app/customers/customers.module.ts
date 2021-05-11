import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DescriptionComponent } from './customer-detail/description/description.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { FilterPipe } from './filter.pipe';
import { SidebarMenuItemComponent } from './sidebar/sidebar-menu-item/sidebar-menu-item.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SortingPipe } from './sorting.pipe';
import { WelcomeComponent } from './welcome/welcome.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
    imports: [
        CustomersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CustomersRoutingModule,
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
    ],
    declarations: [
        SidebarComponent,
        CustomerDetailComponent,
        WelcomeComponent,
        DescriptionComponent,
        SidebarMenuItemComponent,
        CreateCustomerComponent,
        SortingPipe,
        FilterPipe,
        CustomersComponent,
    ],
    exports: [],
})
export class CustomersModule {}
