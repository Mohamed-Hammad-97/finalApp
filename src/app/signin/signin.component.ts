import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';
import { passwordMatch } from '../validators/passwordMatch';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  isLoading: boolean = false
  apiError: string = ''
  isNotValidForm: boolean = false

  constructor(private _authService: AuthService, private _router: Router) {

  }



  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
  })

  login(form: FormGroup) {
    if (form.valid) {
      this.isLoading = true
      this._authService.login(form.value).subscribe({
        next: (data: any) => {
          this.isLoading = false;
          localStorage.setItem("userToken", data.token);
          this._authService.getUserData()
          this._router.navigate(['/home'])
        },
        error: (err) => {
          this.apiError = err.error.message
        }
      })
    } else {
      this.isNotValidForm = true
    }
  }

}
