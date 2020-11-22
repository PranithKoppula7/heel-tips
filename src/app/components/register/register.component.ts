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
    this.authService.register(this.user).subscribe((res: any) => {
      if(res.success) {
        this.snackbar.open('Registered! Go to Login page to access the app', '', {
          duration: 2000
        });
      }
    })
  }

}
