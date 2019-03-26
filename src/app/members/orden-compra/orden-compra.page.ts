import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-orden-compra',
    templateUrl: './orden-compra.page.html',
    styleUrls: ['./orden-compra.page.scss'],
})
export class OrdenCompraPage implements OnInit {

    datos: any;
    logoEmpresa = '../../../assets/logo.png';
    total = 0;

    constructor(private datePipe: DatePipe, private route: ActivatedRoute) {
    }

    private totales() {
        for (const item of this.datos.detalle_compra) {
            this.total += (item.cantidad * item.precio);
        }
    }

    colorEstado(estado_id) {
        if (estado_id === 2) {
            return 'danger';
        } else if (estado_id === 1) {
            return 'success';
        } else if (estado_id === 0) {
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

    ngOnInit() {
        console.log('OrdenCompraPage - ngOnInit');
        this.route.params.subscribe(params => {
            this.datos = JSON.parse(params['orden']);
            console.log(this.datos);
            this.logoEmpresa = params['logoEmpresa'];
            this.totales();
        });
    }

}
