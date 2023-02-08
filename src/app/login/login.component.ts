import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error : string | undefined = undefined;
  loading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true
    this.authenticationService
      .adminLogin(this.form['email'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
          this.loading = false
          this.error = undefined
        },
        error: (error) => {
          this.error = error.error.error;
          this.loading = false
        },
      });
  }


}
