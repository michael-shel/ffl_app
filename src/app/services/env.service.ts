import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://www.foodforlife.com.ua/api/'
  constructor() {  }
}
