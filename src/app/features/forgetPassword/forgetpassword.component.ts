import { RouterLink , Router} from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/servies/auth.service';

@Component({
  selector: 'app-forgetpassword',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  step = signal<number> (1)
  email : FormControl = new FormControl("" , [Validators.required , Validators.email])
  code : FormControl = new FormControl("" , Validators.required)
  password : FormControl = new FormControl("" , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  )] )

  submitEmail(e : Event) : void {
    e.preventDefault()
    if(this.email.valid){
      const data = {
        email : this.email.value
      }

      this.authService.forgetPassword(data).subscribe({
        next : (res)=>{
          this.step.set(2)
        }
      })
    }
  }

  submitCode(e : Event) : void {
    e.preventDefault()
    if(this.code.valid){
      const data = {
        code : this.code.value
      }

      this.authService.verifyCode(data).subscribe({
        next : (res)=>{
          this.step.set(3)
        }
      })
    }
  }

  submitPassword(e : Event) : void {
    e.preventDefault()
    if(this.password.valid){
      const data = {
        email : this.email.value ,
        password : this.password.value ,
        passwordConfirm : this.password.value
      }

      this.authService.resetPassword(data).subscribe({
        next : (res)=>{
          this.router.navigate(['/login'])
          console.log(res)
          console.log(localStorage.getItem('freshToken'))
          console.log(localStorage.getItem('User'))
        }
      })
    }
  }
  
}
