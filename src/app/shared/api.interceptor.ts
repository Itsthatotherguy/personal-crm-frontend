import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { map, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpEventType,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const apiRequest = request.clone({
            url: `http://localhost:3000/${request.url}`,
        });

        return next.handle(apiRequest).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 401) {
                    this.authService.logout();
                }

                return throwError(errorResponse);
            })
            // tap((event: HttpEvent<unknown>) => {
            //     console.log(event);
            //     if (event instanceof HttpResponse) {
            //         console.log('Hallo');
            //         const response = <HttpResponse<any>>event;

            //         if (response.status === 401) {
            //             this.authService.logout();
            //         }
            //     }
            // })
        );
    }
}
