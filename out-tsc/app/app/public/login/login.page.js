var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
var LoginPage = /** @class */ (function () {
    // constructor(private authService: AuthenticationService) { }
    function LoginPage(authService, formBuilder) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        // validation_messages = {
        //     // username: {
        //     //     required: 'Username required',
        //     //     minlength: 'Has to be at least 2 characters'
        //     // },
        //     // gender: {
        //     //     required: 'Gender required'
        //     // },
        //     // bio: {
        //     //     required: 'Bio required',
        //     //     minlength: "Don't be shy, surely you can tell more"
        //     // },
        //     email: [
        //         { required: 'El correo electronico es obligatorio.' },
        //         { email: 'Correo electronico invalido.' }
        //     ],
        //     password: {
        //         required: 'La contraseña es obligatoria.',
        //         minlength: 'Al menos 6 caracteres son obligatorios.'
        //     }
        // };
        this.validation_messages = {
            email: [
                { type: 'required', message: 'El campo email es obligatorio.' },
                { type: 'email', message: 'Correo electronico invalido.' }
            ],
            password: [
                { type: 'required', message: 'El campo contraseña es obligatorio.' },
                { type: 'minlength', message: 'Al menos 6 caracteres son obligatorios.' }
                // {type: 'pattern', message: 'Hay caracteres que no estan permitidos.'}
            ]
        };
    }
    LoginPage.prototype.markFieldsDirty = function () {
        for (var field in this.myForm.controls) {
            // this.myForm.controls[field].markAsDirty();
            this.myForm.get(field).markAsDirty();
        }
    };
    Object.defineProperty(LoginPage.prototype, "f", {
        // getErrorMessage(field: string, form: string) {
        //     let formCtrl = form === 'react' ? this.myForm : this.templForm.control,
        //         message = '';
        //     if (formCtrl) {
        //         var ctrl = formCtrl.get(field);
        //         if (ctrl && ctrl.errors) {
        //             for (var err in ctrl.errors) {
        //                 if (!message && ctrl.errors[err]) {
        //                     message = this.errorMessages[field][err];
        //                 }
        //             }
        //         }
        //     }
        //     return message;
        // }
        // convenience getter for easy access to form fields
        get: function () { return this.myForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginPage.prototype.ngOnInit = function () {
        this.myForm = this.formBuilder.group({
            // name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                Validators.email
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required,
            ])) // ,
            // confirm_password: new FormControl('', Validators.required)
        });
    };
    LoginPage.prototype.login = function () {
        console.log(this.myForm.value.email, this.myForm.value.password);
        if (this.myForm.valid) {
            this.authService.login();
        }
        else {
            this.markFieldsDirty();
            //     alert('Formulario invalido.');
        }
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [AuthenticationService, FormBuilder])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map