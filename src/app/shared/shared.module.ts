import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzResultModule } from 'ng-zorro-antd/result';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    imports: [CommonModule, NzMenuModule, NzResultModule, NzButtonModule],
    declarations: [FooterComponent, PageNotFoundComponent, HeaderComponent],
    exports: [
        FooterComponent,
        PageNotFoundComponent,
        HeaderComponent,
        CommonModule,
    ],
})
export class SharedModule {}
