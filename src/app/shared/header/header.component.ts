import { AuthService } from './../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSubscription: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.userSubscription = this.authService.user.subscribe((user) => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onClickLogout(): void {
        this.authService.logout();
    }
}
