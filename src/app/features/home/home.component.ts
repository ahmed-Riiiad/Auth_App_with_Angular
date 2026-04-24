import { Component, OnInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/servies/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly authService = inject(AuthService)
  ngOnInit() : void{
  initFlowbite()
}
LogOut(): void{
  this.authService.signOut()
} 


}
