import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-class-posts',
  templateUrl: './class-posts.component.html',
  styleUrls: ['./class-posts.component.scss']
})
export class ClassPostsComponent implements OnInit {
  dept: string;
  class: number;
  posts: [];
  currUser = {

  }
  constructor(private route: ActivatedRoute, private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.dept = params.dept;
      this.class = params.class;
    });

    this.postService.getPosts(this.dept, this.class).subscribe((res: []) => {
      this.posts = res;
    });

    this.authService.getCurrUser().subscribe((res) => {
      this.currUser = res;
    })
  }

}
