
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthService } from '../../services/auth.service'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ActionSheetController,NavController } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { User } from '../../services/user';
import { ShopService } from '../../services/shop.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user : User;
  user$: Observable<User | null>;

  // @Input() private fname; lname; bio: string
  public slide1Form: FormGroup;
  headerStyle = '';

  constructor(
    private storage: Storage,
    private camera: Camera,
    private authService: AuthService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private crop: Crop,
    private imagePicker: ImagePicker,
    private file: File,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
  ) {
    this.user$ = authService.watchUser();
    this.user$.subscribe((data) => {
      this.user = data;
      this.slide1Form = formBuilder.group({
        phone: [this.user.phone?this.user.phone:'',
        // Validators.compose([Validators.minLength(9),Validators.maxLength(10), Validators.required])
        ],
        email:[
          this.user.email?this.user.email:'',
        ],
        name: [
          this.user.name?this.user.name:'',
        // Validators.compose([Validators.minLength(9),Validators.maxLength(10), Validators.required])
        ],
        lname:[
          ''
        ],
        address:[
          this.user.address?this.user.address:'',
        ]
      });
    });
    
  }


  
  ngOnInit(): void { 
    this.user$.subscribe((data) => {
    this.user = data;
    // this.fname = data.first_name;
    // this.lname = data.last_name;
    // this.bio = data.bio;
    });
   }

    update(){
      var user = {
        'name': this.slide1Form.value['name'],
        'email': this.slide1Form.value['email'],
        'phone': this.slide1Form.value['phone'],
        'address': this.slide1Form.value['address'],
      }
      this.authService.updateUser(user,this.user.id).subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl('/account');
        },
        error => {
          console.log(error);
        },
        () => {
        }
      );

    }

   goProfile(){
    this.headerStyle="d-none";
    setTimeout(() => {
      this.navCtrl.navigateBack(['/account']);  
    }, 100);
    
  }

  logOut(){
    this.headerStyle="d-none";
    setTimeout(() => {
      this.navCtrl.navigateBack(['/app/app/home']);  
    }, 100);
    
  }

   async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

    pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.showCroppedImage(imageData)
    }, (err) => {
      // Handle error
    });
  }

  showCroppedImage(ImagePath) {

    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      // this.user.avatar = base64;
    }, error => {
      alert('Error in showing image' + error);
    });
  }

  logout(){
    this.authService.logout().then(() => {
        this.router.navigate(['/']);
    })
  }

  backToProfile(){
    this.router.navigate(['/account']);
  }

}
