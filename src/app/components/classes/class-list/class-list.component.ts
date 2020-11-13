import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  dept: string;
  classes: Number[];

  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.dept = params.dept;
    });

    this.postService.getClassesByDepartment(this.dept).subscribe((res: Number[]) => {
      this.classes = res;
    });

    
  }

  goToPosts(_class) {
    this.router.navigate(['classes/class-posts'], { queryParams: {dept: this.dept, class: _class}});
  }

}
