import { Router } from '@angular/router';
import { LoginRequest } from './../requests/login.request.ts';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.initForm();
    }

    onSubmit() {
        const emailAddress = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        const request = new LoginRequest(emailAddress, password);

        this.authService.login(request).subscribe({
            next: (responseData) => {
                console.log('Successful login: ', responseData);
                this.router.navigate(['/']);
            },
            error: (errorMessage) => {
                console.log('Error during login: ', errorMessage);
            },
        });

        this.loginForm.reset();
    }

    private initForm() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl(null, [Validators.required]),
        });
    }
}
