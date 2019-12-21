import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ValidationService} from '../../services/validation.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    protected EMPRESA_ID = 1;
    myForm: FormGroup;

    constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private validationService: ValidationService) {
    }

    get validations() {
        const vm = this.validationService.vm;
        vm.password.minlength = vm.password.minlength.replace('#minlength#', '6');
        return vm;
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.myForm.controls;
    }

    ngOnInit() {
        console.log('RegisterPage - ngOnInit');
        this.myForm = this.formBuilder.group({
            // name: new FormControl('', Validators.required),
            /*empresa: new FormControl('', Validators.compose([
                Validators.required
            ])),*/
            apellido: new FormControl('', Validators.compose([
                Validators.required
            ])),
            celular: new FormControl('', Validators.compose([
                Validators.required
            ])),
            // confirm_password: new FormControl('', Validators.required),
            direccion: new FormControl('', Validators.compose([
                Validators.required
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                Validators.email
            ])),
            localidad: new FormControl('', Validators.compose([
                Validators.required
            ])),
            nombre: new FormControl('', Validators.compose([
                Validators.required
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required,
                // this is for the letters (both uppercase and lowercase) and numbers validation
                // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
            ]))
        });
    }

    register() {
        console.log('RegisterPage - register');
        if (this.myForm.invalid) {
            //     this.markFieldsDirty();
            return;
        }
        const data = {
            // empresa: this.myForm.value['empresa'],
            empresa_id: this.EMPRESA_ID, // this.myForm.value['empresa'],
            apellido: this.myForm.value['apellido'],
            nombre: this.myForm.value['nombre'],
            email: this.myForm.value['email'],
            password: this.myForm.value['password'],
            direccion: this.myForm.value['direccion'] + '\n' + this.myForm.value['localidad'],
            cel: this.myForm.value['celular']
        };
        this.authService.register(data);
        // alert('imei: ' + this.device.uuid);
        // this.authService.login({email: this.myForm.value['email'], password: this.myForm.value['password'], imei: this.device.uuid});
    }

}
