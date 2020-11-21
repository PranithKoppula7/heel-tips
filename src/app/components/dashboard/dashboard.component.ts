import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todayDate: Number = Date.now();
  currUser = {
    email: '',
    id: '',
    name: ''
  }

  topPosts: [];

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit(): void {
    this.authService.getCurrUser().subscribe((res: any) => {
      this.currUser = res;
    });

    this.postService.getTopTips().subscribe((res: []) => {
      console.log(res);
      this.topPosts = res;
    });
  }

  

}
