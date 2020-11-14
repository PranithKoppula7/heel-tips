import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get(baseUrl + '/post/department-list');
  }

  getClassesByDepartment(dept) {
    return this.http.get(baseUrl + `/post/${dept}/class-list`);
  }

  getPosts(department, _class) {
    return this.http.get(baseUrl + `/post/${department}/${_class}`);
  }
}