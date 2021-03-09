import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShopService } from '../../services/shop.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IonSlides, ActionSheetController} from '@ionic/angular';  
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  submitted = false;
  phoneError = false;
  errorMessage = '';

  public slide1Form: FormGroup;
	public slide2Form: FormGroup;


  validations = [
    { type: 'required', message: 'Phone is required.' },
    { type: 'minlength', message: 'Phone must be at least 9 characters long.' },
    { type: 'maxlength', message: 'Phone cannot be more than 10 characters long.' },
    { type: 'pattern', message: 'Your phone must contain only numbers .' },
    { type: 'phoneNotAvailable', message: 'Your phone is already taken.' }
  ];


  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;  

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjg2NDA2NzI3Zjk0ZWJiMDUyMTlmYjA4MjQxNjNjOWI5MDFlYjQxMzhmYTE1NWJjNzdhNGNiZjJiMmQ2MWM0MzUxNmZiZGFiMmM2MGZhOTYiLCJpYXQiOjE1ODk0ODE1MjIsIm5iZiI6MTU4OTQ4MTUyMiwiZXhwIjoxNjIxMDE3NTIyLCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.K-UfS8igkoymtI4KERcaALXHyFfrPM32n30BwQxRVInAp4C_AANmGgTIHUq04RaYmZEjVZQfOOcaKHlU7-i2RpesVW4WPVwVNN1ctUZ26i1xpALZGMGmXeUHq1dxH4KJwjUCMgubcBhZGIF933gAzGjOflCzbGexzDilkHex7HJDqv_V-YZa_J6bEqbQsq-eN56z2jkueKCduoriuSgM3S5yMFL4_QqQUzSP_nPbM7xGhB-Q6sowdHC485xNNJxUZspgiJGTpeNHukSxKkF8PQt5RtKBAlSsTVeP0p3RdHI2PZlCtCLTM0obOK5FLfyPl-_KVOUmOWTl0Peby1QfJwhRDepd7CZfG0nUJKp7L4MJK0PbJrxIE5mhqOmZjka26gqPUE3_KER-rTVenMLu7znLZCmwcAS2MMWtwX_THVuouBA0y8-6z0gZGKgULaRRkTWDrKNLKBjIGTdltuVRxFOYAVCvFWLbTH5Vm370aEmkI_RySX4UsXtrST2dt1aFp-g4eShSGpYOnPWi4yxUSv6Ifv5thaQYr-jm49rd_Z_hod7b1AOJ9_6wi_ttLECOOCaNIPo3TqggC1Ix2U1ifOcKzJOYofHwjBB6CaLZCYibKje657QG_SbqYr8p4y7LLxuEHMnh6ePVK4jY2mKTGtwcG8fl6Ka9nkq1XD5fQbc', 
    'Access-Control-Allow-Origin': 'http://localhost:8100',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH',
    'Access-Control-Allow-Headers':'Content-Type,Accept',
    'Access-Control-Expose-Headers':'Content-Type,Accept',
    'Content-Type': 'application/json'
   })
  };
  constructor(
    private authService: AuthService,
    private shopService: ShopService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient 
  ) { 
    this.slide1Form = formBuilder.group({
        phone: ['',
        // Validators.compose([Validators.minLength(9),Validators.maxLength(10), Validators.required])
        ],
        email:[
          ''
        ],
        password:[
          ''
        ]
    });

    this.slide2Form = formBuilder.group({
        code: ['',
        // Validators.compose([Validators.minLength(6),Validators.maxLength(6), Validators.required]
        ],
    });
  }

  ngOnInit() {
    this.slider.lockSwipes(true);
  }

 
  loginGoogle(){
    this.authService.googleAuth();
  }

  login() {
      this.authService.login(this.slide1Form.value['email'], this.slide1Form.value['password']).subscribe(
      data => {
        this.router.navigateByUrl('/account');
      },
      error => {
        console.log(error);
      },
      () => {
        
      }
    );
  }

  async showErrorMessage(input){
    this.validations.forEach(element => {
      if(this.slide1Form.get(input).hasError(element["type"])){
        console.log(element["message"]);
      }
    });
  }


  sendSms(){
    // this.submitted = true;
    if(this.slide1Form.valid){
          this.slideNext();
    }
    else{
      this.showErrorMessage('phone');
    }
    // this.authService.sendSms(this.slide1Form.value['phone']).subscribe(
    //   data => {
    //     console.log("send sms");
        
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   () => {
    //   }
    // );
  }
  slideNext(){
    this.slider.lockSwipes(false);
    this.slider.slideNext();
    this.slider.lockSwipes(true);
  }
  signUp() {
    this.router.navigateByUrl('/signup');
  }
  back(){
    this.slider.lockSwipes(false);
    this.slider.slidePrev();
    this.slider.lockSwipes(true);
  }

}
