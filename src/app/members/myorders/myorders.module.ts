import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MyOrdersPage} from './myorders.page';

const routes: Routes = [
    {path: '', component: MyOrdersPage}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MyOrdersPage],
    providers: [DatePipe]
})
export class MyOrdersPageModule {
}
