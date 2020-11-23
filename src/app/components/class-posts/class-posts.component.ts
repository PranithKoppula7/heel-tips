import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { AuthService } from 'src/app/shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    name: '',
    bookmarkedTips: []
  }
  
  userLiked:boolean = false;

  constructor(private route: ActivatedRoute, 
    private postService: PostService, 
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
    
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.dept = params.dept;
      this.class = params.class;

      this.postService.getPosts(this.dept, this.class).subscribe((res: []) => {
        this.posts = res;
      });
    });

    this.authService.getCurrUser().subscribe((res: any) => {
      this.currUser = res;
    });

    


   
  }

  onEdit(id) {
    this.router.navigate(['/edit-tip'], { queryParams: { id: id}});
  }

  onDelete(id) {
    this.postService.deletePost(id).subscribe((res: any) => {
      if(res.success) {
        let index = this.posts.findIndex((post => post._id === id));
        this.posts.splice(index, 1);
        this.snackbar.open('Deleted!', '', {
          duration: 2000
        })
      }
    });
  }

  like(id) {
    this.postService.likePost(id).subscribe((res: any) => {
      if(res.success) {
        let post: any = this.posts.filter((post => post._id === id))[0];
        post.likedUsers.push(this.currUser.id);
        post.likeCount++;
      }
    })
  }

  dislike(id) {
    this.postService.dislikePost(id).subscribe((res: any) => {
      if(res.success) {
        let post: any = this.posts.filter((post => post._id === id))[0];
        let index = post.likedUsers.findIndex((_id) => _id === this.currUser.id);
        post.likedUsers.splice(index, 1);
        post.likeCount--;
      }
    })
  }

  bookmark(id) {
    this.authService.bookmarkTip(this.currUser.id, id).subscribe((res: any) => {
      if(res.success) {
        this.currUser.bookmarkedTips.push(id);
      }
    });
  }

  unbookmark(id) {
    this.authService.unBookmarkTip(this.currUser.id, id).subscribe((res:any) => {
      if(res.success) {
        let index = this.currUser.bookmarkedTips.indexOf(id);
        this.currUser.bookmarkedTips.splice(index, 1);
      }
    })
  }

}
