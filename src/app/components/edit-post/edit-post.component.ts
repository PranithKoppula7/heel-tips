import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PostService } from 'src/app/shared/post.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  currUser: any = {}
  post: any = {}
  id: string = ''

  constructor(private postService: PostService, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
    ) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {

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

    this.route.queryParams.subscribe((params: Params) => {
      this.id = params.id;
    });


    this.postService.getPostById(this.id).subscribe((res: any) => {
      this.post = res[0];
    });
  }

  onSave() {
    this.postService.updatePost(this.id, this.post).subscribe((res: any) => {
      if(res.success) {
        this.snackbar.open('Updated!', '', {
          duration: 2000
        });
      }
    })
  }

  onCancel() {
    this.router.navigate(['/classes']);
  }

}
