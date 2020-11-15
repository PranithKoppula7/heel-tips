import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PostService } from 'src/app/shared/post.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-create-tip',
  templateUrl: './create-tip.component.html',
  styleUrls: ['./create-tip.component.scss']
})
export class CreateTipComponent implements OnInit {

  constructor(private postService: PostService, private router: Router, private authService: AuthService) { }

  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  currUser: any = {}

  post = {
    department: '',
    title: '',
    body: '',
    author: '',
    authorId: '',
    likeCount: null,
    isLiked: false,
    created: null,
    class: null
  }

  ngOnInit() {
    this.postService.getDepartments().subscribe((res: string[]) => {
      this.options = res;
      
      this.options = this.options.map((department) => department.toUpperCase());

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      this.authService.getCurrUser().subscribe((res) => {
        this.currUser = res;
      });
    });

    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    this.post.author = this.currUser.name;
    this.post.authorId = this.currUser.id;
    this.post.created = Date.now();
    this.post.likeCount = 0;
    
    this.postService.createPost(this.post).subscribe((res) => {
      console.log(res);
    });
    
  }

}
