import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {
    name: "",
    email: "",
    password: "",
    pid: null,
  }

  constructor(private authService: AuthService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  register() {
    if(this.user.name === '' || this.user.email === '' || this.user.password === '' || this.user.pid === null) {
      this.snackbar.open('Fill out the relevant fields', '', {
        duration: 3000
      });
      return;
    } else if(isNaN(this.user.pid)) {
      this.snackbar.open('Enter a number for pid', '', {
        duration: 3000
      });
      return;
    }
    this.authService.register(this.user).subscribe((res: any) => {
      if(res.success) {
        this.snackbar.open('Registered! Go to Login page to access the app', '', {
          duration: 2000
        });
      }
    })
  }

}
