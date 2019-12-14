import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: 'myorders', loadChildren: './myorders/myorders.module#MyOrdersPageModule'},
    {path: 'myorder', loadChildren: './myorder/myorder.module#MyOrderPageModule'},
    {path: 'products', loadChildren: './products/products.module#ProductsPageModule'},
  { path: 'mycart', loadChildren: './mycart/mycart.module#MyCartPageModule' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberRoutingModule {
}
