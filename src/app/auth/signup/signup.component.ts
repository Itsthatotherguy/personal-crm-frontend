import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignupRequest } from '../requests/signup.request';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    isSigningUp = false;
    errors: string[] = [];

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.initForm();
    }

    onSubmit(): void {
        const name = this.signupForm.value.name;
        const email = this.signupForm.value.email;
        const password = this.signupForm.value.password;

        const request = new SignupRequest(name, email, password);
        console.log(request);
        this.isSigningUp = true;

        this.authService.signup(request).subscribe({
            next: (responseData) => {
                this.isSigningUp = false;
                this.router.navigate(['/']);
            },
            error: (errorMessages) => {
                this.errors = errorMessages;
                this.isSigningUp = false;
            },
        });

        this.signupForm.reset();
    }

    private initForm(): void {
        this.signupForm = new FormGroup({
            name: new FormControl(null, {
                validators: [Validators.required],
                updateOn: 'blur',
            }),
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
