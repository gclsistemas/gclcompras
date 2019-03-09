import {AuthenticationService} from './../../services/authentication.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../services/validation.service';
// import {Device} from '@ionic-native/device/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    myForm: FormGroup;

    // private markFieldsDirty() {
    //     // for (const field in this.myForm.controls) {
    //     //     if (this.myForm.controls.hasOwnProperty(field)) {
    //     //         this.myForm.controls[field].markAsDirty();
    //     //     }
    //     // }
    //     Object.keys(this.myForm.controls).map(control => {
    //         this.myForm.controls[control].markAsDirty();
    //     });
    // }

    // constructor(private authService: AuthenticationService) { }
    constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private validationService: ValidationService) {
    }
    // constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private device: Device, private validationService: ValidationService) {
    // }

    get validations() {
        const vm = this.validationService.vm;
        vm.password.minlength = vm.password.minlength.replace('#minlength#', '5');
        return vm;
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.myForm.controls;
    }

    ngOnInit() {
        console.log('LoginPage - ngOnInit');
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
                // this is for the letters (both uppercase and lowercase) and numbers validation
                // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
            ])) // ,
            // confirm_password: new FormControl('', Validators.required)
        });
    }

    login() {
        console.log('LoginPage - login');
        if (this.myForm.invalid) {
            //     this.markFieldsDirty();
            return;
        }
        this.authService.login({email: this.myForm.value['email'], password: this.myForm.value['password']});
        // alert('imei: ' + this.device.uuid);
        // this.authService.login({email: this.myForm.value['email'], password: this.myForm.value['password'], imei: this.device.uuid});
    }

    /*login(f) {
        console.log(f.value.email, f.value.password);
        this.authService.login();
    }*/

    /*function(data) {
        console.log('Email: ' + data.value.email + ' Password: ' + data.value.password);
    }*/

}
