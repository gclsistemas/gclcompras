import {LoadingController, Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {WebService} from './web.service';
import {ToastService} from './toast.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    authenticationState = new BehaviorSubject(false);
    protected CTRL_CHECK_ORDER_DATE = '/check/order/date'; // Obtiene las fechas de inicio y finalización de pedidos
    protected CTRL_LOGIN = '/check/login';
    protected CTRL_REGISTER = '/register/user';

    constructor(private ws: WebService, private loadingController: LoadingController, private plt: Platform, private toast: ToastService, private storage: Storage) {
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

    async fehcas_inicio_fin_pedidos(obj: any) {
        const loading = await this.loadingController.create({
            message: 'Obteniendo fechas de inicio y finalización de pedidos...'
        });
        await loading.present();
        const res = this.ws.sendGet(this.CTRL_CHECK_ORDER_DATE, obj);
        res.then(() => {
            loading.dismiss();
        });
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
                            this.toast.presentToast(res.message);
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
                        this.toast.presentToast(error);
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
                    loading.dismiss().then(() => {
                        if (res.message) {
                            this.toast.presentToast(res.message);
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
                        this.toast.presentToast(error);
                    });
                }
            );
    }
}
