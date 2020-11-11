import { Injectable } from '@angular/core';

import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user) {
    return this.http.post(baseUrl + '/user/register', user);
  }

  login(user) {
    return this.http.post(baseUrl + '/user/login', user);
  }
}
