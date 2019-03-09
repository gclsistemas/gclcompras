import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MyCartPage} from './my-cart.page';

const routes: Routes = [
    {
        path: '',
        component: MyCartPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MyCartPage],
    providers: [DatePipe]
})
export class MyCartPageModule {
}
