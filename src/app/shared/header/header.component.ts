import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'src/app/auth/store/auth.selectors';

import * as AuthActions from '../../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    isAuthenticated = false;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.pipe(select(selectUser)).subscribe({
            next: (user) => {
                this.isAuthenticated = !!user;
            },
        });
    }

    onClickLogout(): void {
        this.store.dispatch(AuthActions.logout());
    }
}
