import { Router } from '@angular/router';
import { LoginRequest } from './../requests/login.request.ts';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoggingIn = false;
    errors: string[] = [];

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.initForm();
    }

    onSubmit(): void {
        const emailAddress = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        const request = new LoginRequest(emailAddress, password);

        this.isLoggingIn = true;

        this.authService.login(request).subscribe({
            next: (responseData) => {
                this.isLoggingIn = false;
                this.router.navigate(['/']);
            },
            error: (errorMessages) => {
                this.errors = errorMessages;
                this.isLoggingIn = false;
            },
        });

        this.loginForm.reset();
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
