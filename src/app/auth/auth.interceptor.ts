import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectUser } from './store/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.store.pipe(
            select(selectUser),
            take(1),
            exhaustMap((user) => {
                if (!user) {
                    return next.handle(req);
                }

                const modifiedReq = req.clone({
                    headers: new HttpHeaders().set(
                        'authorization',
                        `Bearer ${user.token}`
                    ),
                });

                return next.handle(modifiedReq);
            })
        );
    }
}
