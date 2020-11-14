import { Injectable } from '@angular/core';

import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private router: Router) { }

  register(user) {
    return this.http.post(baseUrl + '/user/register', user);
  }

  login(user) {
    return this.http.post(baseUrl + '/user/login', user, { withCredentials: true}).subscribe((res: any) => {
      if(res.success) {
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  loggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  logout() {
    this.http.get(baseUrl + '/user/logout').subscribe((res: any) => {
      if(res.success) {
        localStorage.removeItem('loggedIn');
        this.router.navigate(['/'])
      }
    });
  }
}
