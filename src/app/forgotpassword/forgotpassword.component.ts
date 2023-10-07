import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotpasswordService } from 'src/core/services/forgotpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  message:string = ''

  constructor(private _forgotpasswordService: ForgotpasswordService, private _router:Router) { }
  

  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.email]),
  })

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
  })

  forgotPassword(form: FormGroup) {
    let data = this.forgotForm.value
    this._forgotpasswordService.forgotPassword(data).subscribe({
      next: (res) => {
        this.message = res.message;
        this.step1 = false;
        this.step2 = true
      },
      error: (err) => {
        this.message = err.error.message
      }
    })
  }

  resetCode(form: FormGroup) {
    let data = this.resetCodeForm.value
    this._forgotpasswordService.resetCode(data).subscribe({
      next: (res) => {
        this.message = res.status;
        this.step2 = false;
        this.step3 = true
      },
      error: (err) => {
        this.message = err.error.message
      }
    })
  }

  resetPassword(form: FormGroup) {
    let data = this.resetPasswordForm.value
    this._forgotpasswordService.restPassword(data).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem("userToken", res.token);
          this._router.navigate(['/home'])
        }
      },
      error: (err) => {
        this.message = err.error.message
      }
    })
  }
}
