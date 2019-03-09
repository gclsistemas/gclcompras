import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DashboardPage} from './dashboard.page';

const routes: Routes = [
    {path: '', component: DashboardPage}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DashboardPage],
    providers: [DatePipe]
})
export class DashboardPageModule {
}
