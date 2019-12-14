import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    public appPages = [
        {
            title: 'Mis pedidos',
            url: '/members/myorders',
            icon: 'home'
        },
        {
            title: 'Productos',
            url: '/members/products',
            icon: 'list'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authenticationService: AuthenticationService,
        private router: Router,
        private menuCtrl: MenuController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.authenticationService.authenticationState.subscribe(state => {
                if (state) {
                    this.menuCtrl.enable(true);
                    this.router.navigate(['members', 'products']);
                } else {
                    this.menuCtrl.enable(false);
                    this.router.navigate(['login']);
                }
            });

        });
    }

    logout() {
        this.authenticationService.logout();
    }
}
