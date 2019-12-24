import {LoadingController, Platform, ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {WebService} from './web.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    authenticationState = new BehaviorSubject(false);
    protected CTRL_CHECK_ORDER_DATE = '/check/order/date'; // Obtiene las fechas de inicio y finalización de pedidos
    protected CTRL_LOGIN = '/check/login';
    protected CTRL_REGISTER = '/register/user';

    constructor(private ws: WebService, private loadingController: LoadingController, private plt: Platform, private toast: ToastController, private storage: Storage) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }

    checkToken() {
        this.storage.get(TOKEN_KEY).then(res => {
            if (res) {
                this.authenticationState.next(true);
            }
        });
    }

    get token() {
        return this.storage.get(TOKEN_KEY);
    }

    private async presentToast(message) {
        const toast = await this.toast.create({
            message: message,
            position: 'bottom',
            duration: 3000,
            showCloseButton: false
        });
        toast.present();
    }

    async fehcas_inicio_fin_pedidos(obj: any) {
        const loading = await this.loadingController.create({
            message: 'Obteniendo fechas de inicio y finalización de pedidos...'
        });
        await loading.present();
        /*return this.ws.sendGet(this.CTRL_CHECK_ORDER_DATE, obj)
            .then(
                (res: any) => {
                    console.log(res);
                    loading.dismiss().then(() => {
                        return res;
                    });
                },
                error => {
                    loading.dismiss().then(() => {
                        this.presentToast(error);
                    });
                }
            );*/
        const res = this.ws.sendGet(this.CTRL_CHECK_ORDER_DATE, obj);
        res.then(() => { loading.dismiss(); })
        return res;
    }

    async login(obj: any) {
        // return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
        //     this.authenticationState.next(true);
        // });
        const loading = await this.loadingController.create({
            message: 'Validando usuario...'
        });
        await loading.present();
        return this.ws.sendGet(this.CTRL_LOGIN, obj)
            .then(
                (res: any) => {
                    console.log(res);
                    loading.dismiss().then(() => {
                        if (res.message) {
                            this.presentToast(res.message);
                            return;
                        }
                        const usr: any = res.user;
                        if (usr.logoEmpresa === false) {
                            usr.logoEmpresa = '../../../assets/logo.png';
                        }
                        return this.storage.set(TOKEN_KEY, usr).then(() => {
                            this.authenticationState.next(true);
                        });
                    });
                },
                error => {
                    loading.dismiss().then(() => {
                        this.presentToast(error);
                    });
                }
            );
    }

    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }

    async register(obj: any) {
        const loading = await this.loadingController.create({
            message: 'Registrando usuario...',
            duration: 1500
        });
        await loading.present();
        return this.ws.sendGet(this.CTRL_REGISTER, obj)
            .then(
                (res: any) => {
                    console.log(res);
                    /*loading.dismiss();
                    if (res.message) {
                        this.toast.create({
                            message: res.message,
                            position: 'bottom',
                            duration: 3000,
                            showCloseButton: false
                        }).then(toast => {
                            console.log(toast);
                        });
                        return;
                    }
                    const usr: any = res.user;
                    if (usr.logoEmpresa === false) {
                        usr.logoEmpresa = '../../../assets/logo.png';
                    }
                    return this.storage.set(TOKEN_KEY, usr).then(() => {
                        this.authenticationState.next(true);
                    });*/
                    loading.dismiss().then(() => {
                        if (res.message) {
                            this.presentToast(res.message);
                            return;
                        }
                        const usr: any = res.user;
                        if (usr.logoEmpresa === false) {
                            usr.logoEmpresa = '../../../assets/logo.png';
                        }
                        return this.storage.set(TOKEN_KEY, usr).then(() => {
                            this.authenticationState.next(true);
                        });
                    });
                },
                error => {
                    /*loading.dismiss();
                    this.toast.create({
                        message: error,
                        position: 'bottom',
                        duration: 3000,
                        showCloseButton: false
                    }).then(toast => {
                        console.log(toast);
                    });*/
                    loading.dismiss().then(() => {
                        this.presentToast(error);
                    });
                }
            );
    }
}
