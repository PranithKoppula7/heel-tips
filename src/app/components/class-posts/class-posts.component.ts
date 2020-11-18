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
  posts = []
  currUser = {
    email: '',
    id: '',
    name: ''

  }
  
  userLiked:boolean = false;

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

    this.authService.getCurrUser().subscribe((res: any) => {
      this.currUser = res;
    });

    this.postService.getPosts(this.dept, this.class).subscribe((res: []) => {
      this.posts = res;
    });


   
  }

  onEdit(id) {
    this.router.navigate(['/edit-tip'], { queryParams: { id: id}});
  }

  onDelete(id) {
    this.postService.deletePost(id).subscribe((res: any) => {
      console.log(res);
      if(res.success) {
        let index = this.posts.findIndex((post => post._id === id));
      this.posts.splice(index, 1);
      }
    });
  }

  like(id) {
    console.log('liking')
    console.log(id)
  }

  dislike(id) {
    console.log('disliking')
    console.log(id)
  }

}
