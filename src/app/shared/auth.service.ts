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
        this.router.navigate(['/dashboard']);
        localStorage.setItem('loggedIn', 'true');
      }
    });
  }

  loggedIn() {
    this.http.get<boolean>(baseUrl + '/user/logged-in', { withCredentials: true }).subscribe((res) => {
      if(res) {
        localStorage.setItem('loggedIn', 'true');
      } else {
        localStorage.setItem('loggedIn', 'false');
      }
    });
    return localStorage.getItem('loggedIn') === 'true';
  }

  logout() {
    this.http.get(baseUrl + '/user/logout', {withCredentials: true}).subscribe((res: any) => {
      if(res.success){
        this.router.navigate(['/']);
        localStorage.removeItem('loggedIn')
      }
    });
  }

  getCurrUser() {
    return this.http.get(baseUrl + '/user/curr-user', {withCredentials: true});
  }

  updateUser(id, user) {
    return this.http.put(baseUrl + `/user/${id}`, user, {withCredentials: true});
  }

  bookmarkTip(userId, postId) {
    return this.http.post(baseUrl +  `/user/bookmark/${postId}`, {id: userId}, {withCredentials: true});
  }

  unBookmarkTip(userId, postId) {
    return this.http.post(baseUrl + `/user/unbookmark/${postId}`, {id: userId}, {withCredentials: true});
  }

  getBookmarks() {
    return this.http.get(baseUrl + '/user/bookmarks', {withCredentials: true});
  }


}
