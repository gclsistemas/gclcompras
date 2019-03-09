import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {AuthenticationService} from '../../services/authentication.service';
import {WebService} from '../../services/web.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-my-cart',
    templateUrl: './my-cart.page.html',
    styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

    cliente: any = null;
    logoEmpresa = '../../../assets/logo.png';
    selectedItems = [];
    total = 0;

    constructor(private authService: AuthenticationService, private cartService: CartService, private datePipe: DatePipe, private loadingController: LoadingController, private router: Router,
                private toast: ToastController, private ws: WebService) {
    }

    private setLista() {
        const items = this.cartService.cart;
        const selected = {};
        for (const obj of items) {
            if (selected[obj.id]) {
                selected[obj.id].cantidad++;
            } else {
                selected[obj.id] = {...obj, cantidad: 1};
            }
        }
        this.selectedItems = Object.keys(selected).map(key => selected[key]);
        this.total = this.selectedItems.reduce((a, b) => a + (b.cantidad * b.precio), 0);

        // const selected: any[] = [];
        // for (const obj of items) {
        //     if (selected.length === 0) {
        //         obj.cantidad = 1;
        //         selected[selected.length] = obj;
        //     } else {
        //         let enc = false;
        //         for (let i = 0; i < selected.length; i++) {
        //             if (selected[i].articulo_id === obj.articulo_id && selected[i].presentacion_id === obj.presentacion_id) {
        //                 selected[i].cantidad++;
        //                 enc = true;
        //                 break;
        //             }
        //         }
        //         if (!enc) {
        //             obj.cantidad = 1;
        //             selected[selected.length] = obj;
        //         }
        //     }
        // }
        // this.selectedItems = Object.keys(selected).map(key => selected[key]);
        // this.total = this.selectedItems.reduce((a, b) => a + (b.cantidad * b.precio), 0);
    }

    addItemCart(item) {
        item.cantidad = 1;
        this.cartService.cart = item;
        this.setLista();
    }

    async orderMyCart() {
        const loading = await this.loadingController.create({
            message: 'Enviando pedido...'
        });
        await loading.present();
        const objCart = {
            fecha: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
            cliente_id: this.cliente.id,
            empresa_id: this.cliente.empresa_id,
            venta_detalles: this.selectedItems
        };
        this.ws.sendPost('pedido/create', objCart)
            .then((res: any) => {
                loading.dismiss();
                console.log('MyCartPage - orderMyCart', res);
                this.toast.create({
                    message: res.message,
                    position: 'bottom',
                    duration: 3000,
                    showCloseButton: false
                }).then(toast => {
                    console.log(toast);
                });
                this.cartService.delCart();
                this.router.navigate(['members', 'orden-compra', {logoEmpresa: this.logoEmpresa, orden: JSON.stringify(res.pedido)}]);
            }, error => {
                loading.dismiss();
                console.log(error);
                this.toast.create({
                    message: error,
                    position: 'bottom',
                    duration: 3000,
                    showCloseButton: false
                }).then(toast => {
                    console.log(toast);
                });
            });
    }

    delItemCart(id) {
        this.cartService.delItem(id);
        this.setLista();
    }
    /*delItemCart(articulo_id, presentacion_id) {
        this.cartService.delItem(articulo_id, presentacion_id);
        this.setLista();
    }*/

    ngOnInit() {
        console.log('MyCartPage - ngOnInit');
        this.authService.token.then(
            (user: any) => {
                this.cliente = user;
                this.logoEmpresa = this.cliente.logoEmpresa;
                this.setLista();
            },
            error => {
                console.log(error);
            });
    }

}
