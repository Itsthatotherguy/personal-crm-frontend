import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.user.pipe(
            take(1),
            map((user) => {
                const isAuthenticated = !!user;
                if (isAuthenticated) {
                    return true;
                }

                return this.router.createUrlTree(['/auth/login']);
            })
        );
    }
}
