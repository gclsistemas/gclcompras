import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
    {path: 'orden-compra', loadChildren: './orden-compra/orden-compra.module#OrdenCompraPageModule'},
    {path: 'products', loadChildren: './products/products.module#ProductsPageModule'},
  { path: 'my-cart', loadChildren: './my-cart/my-cart.module#MyCartPageModule' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberRoutingModule {
}
