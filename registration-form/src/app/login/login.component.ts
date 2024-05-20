import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginError: string | null = null;
  loginSuccess: string | null = null;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]]
    });
  }

  ngOnInit(): void {
    this.submitted = false;
  }

  get f() { return this.loginForm.controls; }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    if (!hasUpperCase) {
      return { 'uppercase': true };
    }

    return null;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        if (userData.email === this.loginForm.value.email && userData.password === this.loginForm.value.password) {
          this.loginError = null;
          this.loginSuccess = 'Login successful!';
        } else {
          this.loginSuccess = null;
          this.loginError = 'Invalid email or password';
        }
      }
    }
  }
}
