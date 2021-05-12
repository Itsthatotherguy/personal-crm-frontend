import { LoginRequest } from './../requests/login.request.ts';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import {
    selectAuthenticating,
    selectAuthErrors,
} from '../store/auth.selectors';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    isLoggingIn$: Observable<boolean>;
    errors$: Observable<string[]>;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.isLoggingIn$ = this.store.pipe(select(selectAuthenticating));
        this.errors$ = this.store.pipe(select(selectAuthErrors));

        this.initForm();
    }

    onSubmit(): void {
        const emailAddress = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        const request = new LoginRequest(emailAddress, password);

        this.store.dispatch(AuthActions.loginStart({ loginRequest: request }));
    }

    private initForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(null, {
                validators: [Validators.required, Validators.email],
                updateOn: 'blur',
            }),
            password: new FormControl(null, {
                validators: [Validators.required],
                updateOn: 'blur',
            }),
        });
    }
}
