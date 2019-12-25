import {AuthenticationService} from './../../services/authentication.service';
import {Component, OnInit} from '@angular/core';
import {WebService} from '../../services/web.service';
import {LoadingController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-myorders',
    templateUrl: './myorders.page.html',
    styleUrls: ['./myorders.page.scss'],
})
export class MyOrdersPage implements OnInit {

    protected CTRL_DOWNLOAD = '/download/pedidos/cliente/';
    cliente: any = null;
    compras: any = [];
    logoEmpresa = '../../../assets/logo.png';
    misCompras: any = [];

    constructor(private authService: AuthenticationService, private datePipe: DatePipe, private loadingController: LoadingController, private router: Router, private toast: ToastService,
                private ws: WebService) {
    }

    private async misOrdenesCompras() {
        const loading = await this.loadingController.create({
            message: 'Obteniendo mis pedidos de compras...'
        });
        await loading.present();
        this.ws.sendGet(this.CTRL_DOWNLOAD + this.cliente.id)
            .then(
                (res: any) => {
                    loading.dismiss().then(() => {
                        this.compras = res.mis_compras;
                        this.misCompras = this.compras;
                        console.log(this.misCompras);
                    });
                },
                error => {
                    console.log(error);
                    loading.dismiss().then(() => {
                        this.toast.presentToast(error);
                    });
                }
            );
    }

    cantidadProductos(compras: any[]) {
        let cantProd = 0;
        for (const dato of compras) {
            cantProd += dato.cantidad;
        }
        return cantProd;
    }

    // colorEstado(item) {
    //     if (item.cancelado) {
    //         return 'danger';
    //     } else if (item.enviado) {
    //         return 'success';
    //     } else if (item.embalada) {
    //         return 'medium';
    //     } else if (item.pagado) {
    //         return 'primary';
    //     }
    // }
    colorEstado(estado_id) {
        estado_id = Number(estado_id) || 0;
        if (estado_id === 2) { // Cancelada
            return 'danger';
        } else if (estado_id === 1 || estado_id === 3) { // Facturada ó Pagada
            return 'success';
        } else if (estado_id === 0) { // Sin facturar
            return 'dark-light';
        }
    }

    // estado(item) {
    //     if (item.cancelado) {
    //         return 'Cancelada el ' + this.datePipe.transform(item.fechaCancelado, 'dd/MM/yyyy');
    //     } else if (item.enviado) {
    //         return 'Enviada el ' + this.datePipe.transform(item.fechaEnviado, 'dd/MM/yyyy');
    //     } else if (item.embalada) {
    //         return 'Embalada el ' + this.datePipe.transform(item.fechaEmbalada, 'dd/MM/yyyy');
    //     } else if (item.pagado) {
    //         return 'Pagada el ' + this.datePipe.transform(item.fechaPago, 'dd/MM/yyyy');
    //     }
    //     return 'Sin procesar';
    // }

    goToOrdenCompra(item) {
        console.log('MyOrders - goToOrdenCompra');
        this.router.navigate(['members', 'myorder', {logoEmpresa: this.logoEmpresa, orden: JSON.stringify(item)}]);
    }

    importeTotal(compras: any[]) {
        let total = 0;
        for (const dato of compras) {
            total += (dato.cantidad * dato.precio);
        }
        return total;
    }

    ngOnInit() {
        console.log('MyOrders - ngOnInit');
        this.authService.token.then(
            (user: any) => {
                // console.log(data);
                this.cliente = user;
                console.log(this.cliente);
                this.logoEmpresa = this.cliente.logoEmpresa;
                this.misOrdenesCompras();
            },
            error => {
                console.log(error);
                this.toast.presentToast(error);
            });
    }

    /*logout() {
        this.authService.logout();
    }*/

    onSearchChange(event) {
        const val = event.target.value;
        // console.log(val);
        if (val === '') {
            this.misCompras = this.compras;
        } else {
            this.misCompras = this.compras.filter((item: any) => {
                // return (item.fecha.indexOf(val) > -1 || item.id === Number(val));
                if (isNaN(val)) {
                    return this.datePipe.transform(item.fecha, 'dd/MM/yyyy').indexOf(val) > -1;
                } else {
                    return item.id === Number(val);
                }
            });
        }
    }

}
