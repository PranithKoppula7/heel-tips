import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    email: '',
    id: '',
    name: ''

  }
  constructor(private route: ActivatedRoute, 
    private postService: PostService, 
    private authService: AuthService,
    private router: Router
    
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.dept = params.dept;
      this.class = params.class;
    });

    this.postService.getPosts(this.dept, this.class).subscribe((res: []) => {
      this.posts = res;
    });

    this.authService.getCurrUser().subscribe((res: any) => {
      this.currUser = res;
    });
  }

  onEdit(id) {
    this.router.navigate(['/edit-tip'], { queryParams: { id: id}});
  }

}
