// 13.05.19 GCL: Uso ChangeDetectorRef para actualizar el ion-slides ya que al buscar dejaba slide en blanco.

import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {LoadingController, IonSlides, ToastController, IonSlide} from '@ionic/angular';
import {Router} from '@angular/router';
import {WebService} from '../../services/web.service';
import {CartService} from '../../services/cart.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

    @ViewChild(IonSlides) slides: IonSlides;
    protected CTRL_DOWNLOAD = '/download/productos/';
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
    // sliderConfig = {
    //     // initialSlide: 0,
    //     effect: 'fade',
    //     centeredSlides: true
    // };
    sliderConfig = {
        autoHeight: true
        , centeredSlides: true
        , effect: 'fade'
        /*, on: {
            beforeInit() {
                const swiper = this;
                swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
                const overwriteParams = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    spaceBetween: 0,
                    virtualTranslate: true,
                };
                swiper.params = Object.assign(swiper.params, overwriteParams);
                swiper.params = Object.assign(swiper.originalParams, overwriteParams);
            },
            setTranslate() {
                const swiper = this;
                const { slides } = swiper;
                for (let i = 0; i < slides.length; i += 1) {
                    const $slideEl = swiper.slides.eq(i);
                    const offset$$1 = $slideEl[0].swiperSlideOffset;
                    let tx = -offset$$1;
                    if (!swiper.params.virtualTranslate) tx -= swiper.translate;
                    let ty = 0;
                    if (!swiper.isHorizontal()) {
                        ty = tx;
                        tx = 0;
                    }
                    const slideOpacity = swiper.params.fadeEffect.crossFade
                        ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
                        : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
                    $slideEl
                        .css({
                            opacity: slideOpacity,
                        })
                        .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
                }
            },
            setTransition(duration) {
                const swiper = this;
                const { slides, $wrapperEl } = swiper;
                slides.transition(duration);
                if (swiper.params.virtualTranslate && duration !== 0) {
                    let eventTriggered = false;
                    slides.transitionEnd(() => {
                        if (eventTriggered) return;
                        if (!swiper || swiper.destroyed) return;
                        eventTriggered = true;
                        swiper.animating = false;
                        const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                        for (let i = 0; i < triggerEvents.length; i += 1) {
                            $wrapperEl.trigger(triggerEvents[i]);
                        }
                    });
                }
            },
        }*/
    };

    constructor(private authService: AuthenticationService, private cartService: CartService, private loadingController: LoadingController, private router: Router,
                private toastController: ToastController, private ws: WebService, private cdr: ChangeDetectorRef) {
    }

    private async toastPresent(msg) {
        const toast = await this.toastController.create({
            message: msg,
            position: 'bottom',
            duration: 3000,
            showCloseButton: false
        });
        return await toast.present();
    }

    private async getProducts() {
        const loading = await this.loadingController.create({
            message: 'Obteniendo productos...'
        });
        await loading.present();

        this.ws.sendGet(this.CTRL_DOWNLOAD + this.cliente.empresa_id)
            .then(
                (res: any) => {
                    loading.dismiss();
                    // console.log(res);
                    this.datos = res.productos;
                    this.misDatos = this.datos;
                    console.log(this.misDatos);
                    if (this.datos.length < 1) {
                        this.toastPresent('La empresa "' + this.cliente.empresa + '" no tiene productos a la venta.');
                    }
                },
                error => {
                    console.log(error);
                    loading.dismiss();
                    this.toastPresent(error);
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
        this.router.navigate(['members', 'mycart']);
    }

    onSearchChange(event) {
        const val = event.target.value;
        // console.log(val);
        this.misDatos = this.datos;
        if (val && val.trim() !== '') {
            this.misDatos = this.misDatos.filter((item: any) => {
                return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.id === Number(val));
            });
            this.slides.update();
            this.cdr.detectChanges();
        }
    }

}
