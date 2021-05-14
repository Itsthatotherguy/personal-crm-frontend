import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { map, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private store: Store) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const baseUrl = environment.production
            ? 'http://personal-crm-backend-dev.eu-west-1.elasticbeanstalk.com'
            : 'http://localhost:3000';

        const apiRequest = request.clone({
            url: baseUrl + '/' + request.url,
        });

        return next.handle(apiRequest).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 401) {
                    this.store.dispatch(AuthActions.logout());
                }

                return throwError(errorResponse);
            })
        );
    }
}
