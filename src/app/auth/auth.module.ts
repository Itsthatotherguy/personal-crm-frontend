import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { HttpWarningComponent } from './http-warning/http-warning.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NzLayoutModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzAlertModule,
        StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
        EffectsModule.forFeature([AuthEffects]),
    ],
    declarations: [
        AuthComponent,
        SignupComponent,
        LoginComponent,
        HttpWarningComponent,
    ],
    providers: [],
    exports: [],
})
export class AuthModule {}
