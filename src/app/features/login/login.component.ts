import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/servies/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  loginForm : FormGroup = this.formBuilder.group({
    email : ["" , [Validators.required , Validators.email]],
    password : ["" , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    )]],
  } )


  submitForm():void {
    if(this.loginForm.valid){
      this.authService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
            console.log(res);
            localStorage.setItem('freshToken' , res.token)
            localStorage.setItem('User' ,JSON.stringify(res.user))
            if(res.status == 'success') this.router.navigate(['/home'])
        },
        error:(err)=>{
          console.log(err);
      }

      })
    }else{
      this.loginForm.markAllAsTouched()
    }
  }

}
