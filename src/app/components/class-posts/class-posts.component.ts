import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-class-posts',
  templateUrl: './class-posts.component.html',
  styleUrls: ['./class-posts.component.scss']
})
export class ClassPostsComponent implements OnInit {
  dept: string;
  class: number;
  posts: [];

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.dept = params.dept;
      this.class = params.class;
    });

    this.postService.getPosts(this.dept, this.class).subscribe((res: []) => {
      this.posts = res;
      console.log(this.posts);
    });
  }

}
