import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {WebService} from '../../services/web.service';
import {CartService} from '../../services/cart.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

    cliente: any = null;
    datos: any = [];
    logoEmpresa = '../../../assets/logo.png';
    misDatos: any = [];
    myCart = [];
    /*sliderConfig = {
        slidesPerView: 1.6,
        spaceBetween: 10,
        centeredSlides: true
    };*/
    sliderConfig = {
        effect: 'fade',
        centeredSlides: true
    };

    constructor(private authService: AuthenticationService, private cartService: CartService, private loadingController: LoadingController, private router: Router,
                private toast: ToastController, private ws: WebService) {
    }

    private async getProducts() {
        const loading = await this.loadingController.create({
            message: 'Obteniendo productos...'
        });
        await loading.present();
        this.ws.sendGet('download/productos/' + this.cliente.empresa_id)
            .then(
                (res: any) => {
                    loading.dismiss();
                    console.log(res);
                    this.datos = res.productos;
                    this.misDatos = this.datos;
                    console.log(this.misDatos);
                    if (this.datos.length < 1) {
                        this.toast.create({
                            message: 'La empresa "' + this.cliente.empresa + '" no tiene productos a la venta.',
                            position: 'bottom',
                            duration: 3000,
                            showCloseButton: false
                        }).then(toast => {
                            console.log(toast);
                        });
                    }
                },
                error => {
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
                }
            );
    }

    addItemToMyCart(item) {
        this.cartService.cart = item;
    }

    delItemFromMyCart(id) {
        this.cartService.delItem(id);
        this.myCart = this.cartService.cart;
    }

    getFoto(id) {
        // if (foto === null) {
        //     return '../../../assets/300x300.png';
        // }
        return this.ws.urlFotoArticulo + `${this.cliente.empresa_id}/${id}.jpg`;
    }

    // get logoEmpresa() {
    //     const logoDefault = '../../../assets/logo.png';
    //     this.ws.sendGet('logo/empresa', {empresa_id: this.cliente.empresa_id});
    // }

    ngOnInit() {
        console.log('ProductsPage - ngOnInit');
        this.authService.token.then(
            (user: any) => {
                // console.log(data);
                this.cliente = user;
                this.logoEmpresa = this.cliente.logoEmpresa;
                this.getProducts();
                this.myCart = this.cartService.cart;
            },
            error => {
                console.log(error);
            });
    }

    openMyCart() {
        this.router.navigate(['members', 'my-cart']);
    }

    onSearchChange(event) {
        const val = event.target.value;
        // console.log(val);
        if (val === '') {
            this.misDatos = this.datos;
        } else {
            this.misDatos = this.datos.filter((item: any) => {
                return (item.producto.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.articulo_id === Number(val));
                // if (isNaN(val)) {
                //     return item.producto.toLowerCase().indexOf(val.toLowerCase()) > -1;
                // } else {
                //     return item.articulo_id === Number(val);
                // }
            });
        }
    }

}
