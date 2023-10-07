import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../validators/passwordMatch';
import { AuthService } from 'src/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  isLoading: boolean = false
  apiError: string = ''
  isNotValidForm : boolean= false

  constructor(private _authService: AuthService , private _router : Router) {
    
  }



  registerForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(8)]), 
    email: new FormControl('', [Validators.required, Validators.email]), 
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]), 
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]), 
  }, [passwordMatch("password", "rePassword")])
  
  register(form: FormGroup) {
    if (form.valid) {
      this.isLoading = true
      this._authService.register(form.value).subscribe({
        next: (res:any) => {
          this.isLoading = false;
          this._router.navigate(['/signIn'])
        },
        error: (err) => {          
          this.apiError = err.error.message
        }
      })
    } else {
      this.isNotValidForm= true
    }
  }

  getControl(name: any): AbstractControl | null {

    return this.registerForm.get(name)

  }
}
