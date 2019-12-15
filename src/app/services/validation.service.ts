import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    protected validation_messages = {
        apellido: {
            required: 'El apellido es obligatorio.',
        },
        email: {
            required: 'El email es obligatorio.',
            email: 'Correo electronico no válido.'
            // pattern: 'Hay caracteres que no estan permitidos.'
        },
        empresa: {
            required: 'La empresa es obligatoria.',
        },
        nombre: {
            required: 'El nombre es obligatorio.',
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
