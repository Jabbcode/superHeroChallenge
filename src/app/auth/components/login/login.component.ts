import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email   : ['', [Validators.required] ],
    password: ['', [Validators.required] ],
  })

  // Email: challenge@alkemy.org
  // password: react

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  fieldIsValid( field: string ) {
    return this.loginForm.controls[field].errors 
           && this.loginForm.controls[field].touched;
  }

  send() {
    if( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
    
      return;
    }
    const email:string = this.loginForm.controls.email.value;
    const password:string = this.loginForm.controls.password.value;
    
    this.authService.auth( email, password );
        
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }

}
