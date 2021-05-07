import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ApiInterceptor } from './shared/api.interceptor';

@NgModule({
    providers: [
        { provide: NZ_I18N, useValue: en_US },
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
})
export class CoreModule {}
