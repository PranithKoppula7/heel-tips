import { Injectable } from '@angular/core';

import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  logged: boolean = false;

  register(user) {
    return this.http.post(baseUrl + '/user/register', user);
  }

  login(user) {
    return this.http.post(baseUrl + '/user/login', user);
  }

  loggedIn(): boolean {
    // this.http.get(baseUrl + '/user/logged-in').subscribe((res: boolean) => {
    //   this.logged =  res;
    //   // return res;
    //   // console.log(res);
    // });
    // console.log(this.logged);
    // return this.logged;
    return (localStorage.getItem('loggedIn') === 'true');
  }

  logout() {
    // this.http.get(baseUrl + '/user/logout');
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/']);
  }
}
