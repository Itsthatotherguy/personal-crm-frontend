import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DescriptionComponent } from './components/description/description.component';
import { SidebarMenuItemComponent } from './components/sidebar/sidebar-menu-item/sidebar-menu-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { SortingPipe } from './pipes/sorting.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FilterPipe } from './pipes/filter.pipe';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        CustomerDetailComponent,
        WelcomeComponent,
        DescriptionComponent,
        SidebarMenuItemComponent,
        FooterComponent,
        CreateCustomerComponent,
        SortingPipe,
        PageNotFoundComponent,
        FilterPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        NzAvatarModule,
        NzPageHeaderModule,
        NzButtonModule,
        NzTypographyModule,
        NzSpaceModule,
        NzModalModule,
        NzDividerModule,
        NzFormModule,
        NzInputModule,
        NzResultModule,
        NzGridModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
