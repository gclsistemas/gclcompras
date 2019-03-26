import {AuthenticationService} from './../../services/authentication.service';
import {Component, OnInit} from '@angular/core';
import {WebService} from '../../services/web.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    cliente: any = null;
    compras: any = [];
    logoEmpresa = '../../../assets/logo.png';
    misCompras: any = [];

    constructor(private authService: AuthenticationService, private datePipe: DatePipe, private loadingController: LoadingController, private router: Router, private toast: ToastController,
                private ws: WebService) {
    }

    private async misOrdenesCompras() {
        const loading = await this.loadingController.create({
            message: 'Obteniendo mis ordenes de compras...'
        });
        await loading.present();
        this.ws.sendGet('/download/pedidos/cliente/' + this.cliente.id)
            .then(
                (res: any) => {
                    loading.dismiss();
                    this.compras = res.mis_compras;
                    this.misCompras = this.compras;
                    console.log(this.misCompras);
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
        } else if (estado_id === 1) { // Facturada
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
        console.log('DashboardPage - goToOrdenCompra');
        this.router.navigate(['members', 'orden-compra', {logoEmpresa: this.logoEmpresa, orden: JSON.stringify(item)}]);
    }

    importeTotal(compras: any[]) {
        let total = 0;
        for (const dato of compras) {
            total += (dato.cantidad * dato.precio);
        }
        return total;
    }

    ngOnInit() {
        console.log('DashboardPage - ngOnInit');
        this.authService.token.then(
            (user: any) => {
                // console.log(data);
                this.cliente = user;
                this.logoEmpresa = this.cliente.logoEmpresa;
                this.misOrdenesCompras();
                console.log(this.cliente);
            },
            error => {
                console.log(error);
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
