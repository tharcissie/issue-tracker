import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signup: FormGroup;
  error: string | undefined = undefined;
  loading: boolean = false;
  key: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthService
  ) {}

  ngOnInit() {
    this.signup = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      organisation: ['', Validators.required],
      representative: ['', Validators.required],
    });
    this.route.params.subscribe((params) => {
      this.key = params['key']; // this will log the object with your parameters to the console
    });
    localStorage.removeItem('currentUser');
  }

  get form() {
    return this.signup.controls;
  }

  onSubmit() {
    let first_name = this.form['first_name'].value;
    let last_name = this.form['last_name'].value;
    let organisation = this.form['organisation'].value;
    let representative = this.form['representative'].value;
    if (this.signup.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .signUp(this.key, first_name, last_name, organisation, representative)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.loading = false;
          this.error = undefined;
        },
        error: (error) => {
          this.error = error.error.error;
          this.loading = false;
        },
      });
  }
}
