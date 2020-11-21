import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get(baseUrl + '/post/department-list', { withCredentials: true});
  }

  getClassesByDepartment(dept) {
    return this.http.get(baseUrl + `/post/${dept}/class-list`, { withCredentials: true});
  }

  getPosts(department, _class) {
    return this.http.get(baseUrl + `/post/${department}/${_class}`, { withCredentials: true});
  }

  createPost(post) {
    return this.http.post(baseUrl + '/post/create-post', post, { withCredentials: true});
  }

  getPostById(id) {
    return this.http.get(baseUrl + `/post/${id}`, { withCredentials: true});
  }

  updatePost(id, post) {
    return this.http.put(baseUrl + `/post/${id}`, post, { withCredentials: true});
  }

  deletePost(id) {
    return this.http.delete(baseUrl + `/post/${id}`, { withCredentials: true});
  }

  likePost(id) {
    return this.http.put(baseUrl + `/post/like/${id}`, {}, { withCredentials: true});
  }

  dislikePost(id) {
    return this.http.put(baseUrl + `/post/dislike/${id}`, {}, { withCredentials: true});
  }

  getTopTips() {
    return this.http.get(baseUrl + '/post/top-tips', {withCredentials: true});
  }
}
