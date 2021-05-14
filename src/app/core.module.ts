import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ApiInterceptor } from './shared/api.interceptor';

import { IconDefinition } from '@ant-design/icons-angular';
import { ArrowLeftOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons: IconDefinition[] = [ArrowLeftOutline];

@NgModule({
    imports: [NzIconModule.forRoot(icons)],
    providers: [
        { provide: NZ_I18N, useValue: en_US },
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    exports: [NzIconModule],
})
export class CoreModule {}
