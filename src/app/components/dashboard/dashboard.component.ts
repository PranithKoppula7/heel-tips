import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  goals: string[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our goal
    if ((value || '').trim()) {
      this.authService.postGoal(value, this.currUser.id).subscribe((res) => {
        this.goals.push(value.trim());
      });
      
    }


    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(goal: string): void {
    const index = this.goals.indexOf(goal);

    if (index >= 0) {
      this.authService.deleteGoal(goal, this.currUser.id).subscribe((res) => {
        this.goals.splice(index, 1);
      });
    }
  }

  todayDate: Number = Date.now();
  currUser = {
    email: '',
    id: '',
    name: '',
    bookmarkedTips: []
  }

  topPosts = [];

  constructor(private authService: AuthService, 
    private postService: PostService, 
    private router: Router,
    private snackbar: MatSnackBar
    
    ) { }

  ngOnInit(): void {
    this.authService.getCurrUser().subscribe((res: any) => {
      this.currUser = res;

      this.authService.getGoals(this.currUser.id).subscribe((res: string[]) => {
        this.goals = res;
      })
    });

    this.postService.getTopTips().subscribe((res: []) => {
      this.topPosts = res;
    });

    
  }

  onEdit(id) {
    this.router.navigate(['/edit-tip'], { queryParams: { id: id}});
  }

  onDelete(id) {
    this.postService.deletePost(id).subscribe((res: any) => {
      if(res.success) {
        let index = this.topPosts.findIndex((post => post._id === id));
        this.topPosts.splice(index, 1);
        this.snackbar.open('Deleted!', '', {
          duration: 2000
        })
      }
    });
  }

  like(id) {
    this.postService.likePost(id).subscribe((res: any) => {
      if(res.success) {
        let post: any = this.topPosts.filter((post => post._id === id))[0];
        post.likedUsers.push(this.currUser.id);
        post.likeCount++;
      }
    })
  }

  dislike(id) {
    this.postService.dislikePost(id).subscribe((res: any) => {
      if(res.success) {
        let post: any = this.topPosts.filter((post => post._id === id))[0];
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
