import { AuthInterceptor } from './auth/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './customers/sidebar/sidebar.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { DescriptionComponent } from './customers/customer-detail/description/description.component';
import { CustomersComponent } from './customers/customers.component';
import { FilterPipe } from './customers/filter.pipe';
import { SidebarMenuItemComponent } from './customers/sidebar/sidebar-menu-item/sidebar-menu-item.component';
import { SortingPipe } from './customers/sorting.pipe';
import { WelcomeComponent } from './customers/welcome/welcome.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ApiInterceptor } from './shared/api.interceptor';

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
        AuthComponent,
        HeaderComponent,
        SignupComponent,
        LoginComponent,
        CustomersComponent,
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
        NzSpinModule,
        NzEmptyModule,
    ],
    providers: [
        { provide: NZ_I18N, useValue: en_US },
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
