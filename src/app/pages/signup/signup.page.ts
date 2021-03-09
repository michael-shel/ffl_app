import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {IonSlides, ActionSheetController, NavController } from '@ionic/angular';  
import { PhoneValidator } from  '../../validators/phone';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    submitted = false;

    buttonLabel = "Next";
    headerLabel = "Sign up using ur phone"

  public slide1Form: FormGroup;
	public slide2Form: FormGroup;
  public slide3Form: FormGroup;
  public slide4Form: FormGroup;

   @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;  
  
  validations = {
  'phone': [
    { type: 'required', message: 'phone is required.' },
    { type: 'minlength', message: 'Username must be at least 5 characters long.' },
    { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    { type: 'usernameNotAvailable', message: 'Your username is already taken.' }
    ],
  // other validations
};

  constructor(

    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController,
    public formBuilder: FormBuilder
  ) {
    this.slide1Form = formBuilder.group({
      name: ['',
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
            Validators.compose([Validators.minLength(6),Validators.maxLength(6), Validators.required])]
        });
        this.slide3Form = formBuilder.group({
            fname: ['',
            Validators.compose([Validators.minLength(2),Validators.maxLength(25),Validators.required])],
            lname: ['',Validators.compose([Validators.minLength(2),Validators.maxLength(25),Validators.required])],
        });
        this.slide4Form = formBuilder.group({
            industry: [''],
        });
   }

  ngOnInit() {
    this.slider.lockSwipes(true);
  }

  async slideNext() {  
    await this.slider.lockSwipes(false);
    await this.slider.slideNext(400);  
    await this.slider.lockSwipes(true);
    
  }  
  async slideChanged() {  
    this.segment = await this.slider.getActiveIndex();  
        switch (this.segment) {
          case 0:
            this.buttonLabel = 'Next'
            this.headerLabel = 'Sign up using ur phone'
            break;
          case 1:
            this.buttonLabel = 'Create'
            this.headerLabel = 'Enter the code from sms'
            break;
          case 2:
            this.buttonLabel = 'Next'
            this.headerLabel = 'Enter ur full name'
            break;
          case 3:
            this.buttonLabel = 'Confirm'
            this.headerLabel = 'Chose ur main activitie'
          break;
    }
  }  

      //   setName(){
      //         this.authService.setName(this.slide3Form.value.fname, this.slide3Form.value.lname).subscribe(
      //         data => {
      //           console.log("Name set");
      //           this.slideNext();
      //         },
      //           error => {
      //             console.log(error);
      //           },
      //           () => {
      //             }
      //           );
      // }
  
  register() {
    this.authService.register(this.slide1Form.value['name'],this.slide1Form.value['email'], this.slide1Form.value['password']).subscribe(
    data => {
      this.authService.login(this.slide1Form.value['email'], this.slide1Form.value['password']).subscribe(
        data => {
          this.router.navigateByUrl('/account');
        })
    },
    error => {
      console.log(error);
    },
    () => {
      }
    );
  }

  backToLogin(){
    this.navCtrl.back();
  }
  back(){
     this.slider.lockSwipes(false);
    this.slider.slidePrev();
    this.slider.lockSwipes(true);
  }

}
