import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-bookmarked-tips',
  templateUrl: './bookmarked-tips.component.html',
  styleUrls: ['./bookmarked-tips.component.scss']
})
export class BookmarkedTipsComponent implements OnInit {

  bookmarks = [];
  bookmarkPosts = [];

  currUser = {
    email: '',
    id: '',
    name: '',
    bookmarkedTips: []
  }
  constructor(private authService: AuthService, 
    private postService: PostService,
    ) { }

  ngOnInit(): void {
    this.authService.getBookmarks().subscribe((res: []) => {
      this.bookmarks = res;

      this.bookmarks.forEach((id) => {
        this.postService.getPostById(id).subscribe((res: any) => {
          this.bookmarkPosts.push(res[0]);
        })
      })
    });

    this.authService.getCurrUser().subscribe((res: any) => {
      this.currUser = res;
    });
    
  }

  like(id) {
    this.postService.likePost(id).subscribe((res: any) => {
      if(res.success) {
        let post: any = this.bookmarkPosts.filter((post => post._id === id))[0];
        post.likedUsers.push(this.currUser.id);
        post.likeCount++;
      }
    })
  }

  dislike(id) {
    this.postService.dislikePost(id).subscribe((res: any) => {
      if(res.success) {
        let post: any = this.bookmarkPosts.filter((post => post._id === id))[0];
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
    });
  }

}
