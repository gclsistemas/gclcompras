import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    protected validation_messages = {
        email: {
            required: 'El email es obligatorio.',
            email: 'Correo electronico no válido.'
            // pattern: 'Hay caracteres que no estan permitidos.'
        },
        password: {
            required: 'La contraseña es obligatoria.',
            minlength: 'Al menos #minlength# caracteres son obligatorios.'
            // pattern: 'Hay caracteres que no estan permitidos.'
        }
    };

    constructor() {
    }

    get vm() {
        return this.validation_messages;
    }

}
