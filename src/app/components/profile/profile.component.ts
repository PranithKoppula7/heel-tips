import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private snackbar: MatSnackBar) { }

  currUser = {
    name: '',
    id: '',
    pid: null,
    email: ''
  }

  ngOnInit(): void {
    this.authService.getCurrUser().subscribe((res: any) => {
      this.currUser = res;
    });
  }


  onSave() {
    this.authService.updateUser(this.currUser.id, this.currUser).subscribe((res) => {
      if(res) {
          this.snackbar.open('Succesfully Edited!', '', {
            duration: 2000,
          })
        }
    });
  }
  
  onCancel() {
    this.router.navigate(['/dashboard']);
  }

}
