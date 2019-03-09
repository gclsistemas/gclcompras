import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private myCart = [];

    constructor() {
    }

    get cart() {
        return this.myCart;
    }

    /**
     *
     * @param item Add one item to my cart.
     */
    set cart(item) {
        this.myCart.push(item);
    }

    // addCantItem(articulo_id, presentacion_id) {
    //     for (let i = 0; i < this.myCart.length; i++) {
    //         if (this.myCart[i].articulo_id === articulo_id && this.myCart[i].presentacion_id === presentacion_id) {
    //             this.myCart[i].cantidad++;
    //             break;
    //         }
    //     }
    // }

    // delCantItem(articulo_id, presentacion_id) {
    //     for (let i = 0; i < this.myCart.length; i++) {
    //         if (this.myCart[i].articulo_id === articulo_id && this.myCart[i].presentacion_id === presentacion_id) {
    //             if (this.myCart[i].cantidad - 1 < 1) {
    //                 this.myCart.splice(i, 1);
    //             } else {
    //                 this.myCart[i].cantidad--;
    //             }
    //             break;
    //         }
    //     }
    // }

    delCart() {
        this.myCart = [];
    }

    delItem(id) {
        for (let i = 0; i < this.myCart.length; i++) {
            if (this.myCart[i].id === id) {
                this.myCart.splice(i, 1);
                break;
            }
        }
    }
    /*delItem(articulo_id, presentacion_id) {
        for (let i = 0; i < this.myCart.length; i++) {
            if (this.myCart[i].articulo_id === articulo_id && this.myCart[i].presentacion_id === presentacion_id) {
                this.myCart.splice(i, 1);
                break;
            }
        }
    }*/
}
