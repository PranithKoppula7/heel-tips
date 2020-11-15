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

  createPost(post) {
    return this.http.post(baseUrl + '/post/create-post', post);
  }

  getPostById(id) {
    return this.http.get(baseUrl + `/post/${id}`);
  }

  updatePost(id, post) {
    return this.http.put(baseUrl + `/post/${id}`, post);
  }
}
