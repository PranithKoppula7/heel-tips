import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  deparments: String[];


  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postService.getDepartments().subscribe((res: Array<String>) => {
      this.deparments = res;
      
      this.deparments = this.deparments.map((department) => department.toUpperCase());

    });
  }


  goClass(department) {
    this.router.navigate(['classes/class-list'], { queryParams: {dept: department}});
  }


}
