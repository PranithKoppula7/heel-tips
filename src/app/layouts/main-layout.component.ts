import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  template: `
    <mat-toolbar class="navbar mat-elevation-z4">
        <div>Heel Tips</div>
        <div>
            <a href="dashboard" mat-button>Home</a>
            <a href="classes" mat-button>Classes</a>
            <button mat-button>Profile</button>
            <button mat-button (click)="logout()">Logout</button>
        </div>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [' mat-toolbar { background: #4b9cd3; color: white; justify-content: space-between; } span { margin-right: 1rem; }']
})
export class MainLayoutComponent {
    constructor(private authService: AuthService, private router: Router) {}

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
      }
}

// mat-toolbar {
//     background: #4b9cd3;
//     color: white;
//     justify-content: space-between;
// }

// span {
//     margin-right: 1rem;
// }

