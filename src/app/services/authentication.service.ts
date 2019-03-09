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

    async login(obj: any) {
        // return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
        //     this.authenticationState.next(true);
        // });
        const loading = await this.loadingController.create({
            message: 'Validando usuario...'
        });
        await loading.present();
        /*return this.hc.get(this.urlWeb + '/checklogin', {headers: this.httpHeaders, params: obj})
            .subscribe((res: any) => {
                loading.dismiss();
                console.log(res);
                if (res.message) {
                    // alert(res.message);
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
                return this.storage.set(TOKEN_KEY, res).then(() => {
                    this.authenticationState.next(true);
                });
            }, error => {
                loading.dismiss();
                this.toast.create({
                    message: error,
                    position: 'bottom',
                    duration: 3000,
                    showCloseButton: false
                }).then(toast => {
                    console.log(toast);
                });
            });*/
        return this.ws.sendGet('check/login', obj)
            .then(
            (res: any) => {
                loading.dismiss();
                console.log(res);
                if (res.message) {
                    // alert(res.message);
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
                // if (usr.logoEmpresa) {
                //     usr.logoEmpresa = this.ws.urlBase + 'img/' + usr.empresa_id + '.png';
                // } else {
                //     usr.logoEmpresa = '../../../assets/logo.png';
                // }
                if (usr.logoEmpresa === false) {
                    usr.logoEmpresa = '../../../assets/logo.png';
                }
                return this.storage.set(TOKEN_KEY, usr).then(() => {
                    this.authenticationState.next(true);
                });
            },
            error => {
                loading.dismiss();
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

    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }

}
