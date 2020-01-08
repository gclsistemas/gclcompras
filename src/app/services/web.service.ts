import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WebService {

    // protected urlWeb = 'http://tuventa.local';
    // protected urlWebApi = 'http://tuventa.local/pedidosclientes';
    protected urlWeb = 'https://tuventa.gclsistemas.com.ar';
    protected urlWebApi = 'https://tuventa.gclsistemas.com.ar/pedidosclientes';
    // protected urlWeb = 'api/';
    // protected urlWebApi = 'api/pedidosclientes';
    /*protected urlWeb = 'http://192.168.0.110/tuventa/public';
    protected urlWebApi = 'http://192.168.0.110/tuventa/public/pedidosclientes';*/
    protected httpHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // protected httpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {
        // this.httpHeaders.append('Accept', 'application/json');
        // this.httpHeaders.append('Content-Type', 'application/json');
        // this.httpHeaders.append('Content-Type', 'application/json; charset=utf-8');
        // this.httpHeaders.append('Access-Control-Allow-Origin', '*');
    }

    get urlBase() {
        return this.urlWeb;
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
