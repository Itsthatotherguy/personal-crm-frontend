import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'customers' },
    {
        path: 'customers',
        loadChildren: () =>
            import('./customers/customers.module').then(
                (m) => m.CustomersModule
            ),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
