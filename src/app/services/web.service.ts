import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WebService {

    // protected urlWeb = 'https://gclsistemas.com.ar/pedidosclientes/';
    protected urlWeb = 'http://tuventa.local';
    protected urlWebApi = 'http://tuventa.local/pedidosclientes';
    protected httpHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    constructor(private http: HttpClient) {
    }

    get urlBase() {
        return 'http://tuventa.local';
    }

    get urlFotoArticulo() {
        return this.urlBase + '/img/';
    }

    sendGet(ctrl: string, obj: any = null) {
        return new Promise(resolve => {
            this.http.get(this.urlWebApi + ctrl, {headers: this.httpHeaders, params: obj})
                .subscribe(
                    (res: any) => {
                        resolve(res);
                    },
                    error => {
                        resolve(error);
                    }
                );
        });
    }

    sendPost(ctrl: string, obj: any) {
        return new Promise(resolve => {
            this.http.post(this.urlWebApi + ctrl, obj, {headers: this.httpHeaders })
                .subscribe(
                    (res: any) => {
                        resolve(res);
                    },
                    error => {
                        resolve(error);
                    }
                );
        });
    }
}
