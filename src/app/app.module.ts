import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzLayoutModule,
        CoreModule,
        SharedModule,
        CustomersModule,
        AuthModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
