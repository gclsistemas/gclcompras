import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {OrdenCompraPage} from './orden-compra.page';

const routes: Routes = [
    {
        path: '',
        component: OrdenCompraPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [OrdenCompraPage],
    providers: [DatePipe]
})
export class OrdenCompraPageModule {
}
