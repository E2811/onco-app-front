import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loginForm: FormGroup;
  hasError: boolean;
  messageError: string;
  tokenType: string;
  isLogged: boolean;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private service: RequestService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
    });
    this.loginForm.valueChanges.subscribe(console.log);
    this.isLogged = false;
    this.dataService.isLogged.subscribe(
      (isLogged) => (this.isLogged = isLogged)
    );
    this.hasError = false;
    this.messageError = '';
  }

  async submitForm() {
    try {
      const result = await this.service.authRequest(this.loginForm.value);
      this.dialogRef.close();
      this.isLogged = true;
      this.authStateChange();
      if (this.dataService.getRoleValue() === 'ROLE_ADMIN'){
        this.router.navigate(['patient']);
      }else  if (this.dataService.getRoleValue() === 'ROLE_DOCTOR'){
        this.router.navigate(['information']);
      }else if (this.dataService.getRoleValue() === 'ROLE_PATIENT'){
        this.router.navigate(['information-doctor']);
      }
    } catch (error) {
      this.hasError = true;
      this.messageError = error;
      this.openSnackBar();
    }
  }
  openSnackBar() {
    this.snackBar.open(this.messageError, 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['error-snackbar'],
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  authStateChange() {
    this.dataService.changeState(true);
    this.dataService.changeRole(this.service.getRole());
    this.dataService.changeUsername(this.service.getUsername());
  }
}
