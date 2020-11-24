import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home-layout',
  template: `
    <mat-toolbar class="navbar mat-elevation-z4">
        <div>Heel Tips</div>
        <div>
            <a href="dashboard" mat-button>Home</a>
            <a href="classes" mat-button>Classes</a>
            <a class="create-button" href="create-tip" mat-raised-button>Create Tip!</a>
            <a href="profile" mat-button>Profile</a>
            <button mat-button (click)="logout()">Logout</button>
        </div>
        <mat-form-field style="font-size: 14px">
              <input type="text" placeholder="Search Class" aria-label="Search" matInput [formControl]="myControl"
                  [matAutocomplete]="auto" name="search" (keyup.enter)="onEnter()">
              <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
                  <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
                      {{option}}
                  </mat-option>
              </mat-autocomplete>
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [' mat-toolbar { background: #4b9cd3; color: white; justify-content: space-between;} span { margin-right: 1rem; } .create-button { background-color: #13294b; color: white; }']
})
export class MainLayoutComponent implements OnInit {

  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(private authService: AuthService,
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.postService.getClassList().subscribe((res: string[]) => {
      this.options = res;

      this.options = this.options.map((department) => department.toUpperCase());

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  logout() {
    this.authService.logout();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onEnter() {
    if (this.options.includes(this.myControl.value)) {
      let dept = this.myControl.value.substring(0, 4);
      let _class = this.myControl.value.substring(5, 8);
      this.router.navigateByUrl(`classes/class-posts?dept=${dept}&class=${_class}`);
    } else {
      return;
    }
  }


}

