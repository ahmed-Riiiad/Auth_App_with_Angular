import { Component, OnInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/servies/auth.service';
import { UserService } from '../../core/servies/user.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly authService = inject(AuthService)
private readonly userService =inject(UserService);

  ngOnInit() : void{
  initFlowbite()
}

LogOut(): void{
  this.authService.signOut()
} 



sendPdfToUsers(): void {

  const pdfUrl = this.generatePdf();

  this.userService.getUsers().subscribe({

    next: (users) => {
    console.log(users )
      const validUsers = users.result.filter(
        (user: any) => user.whatsappNumber
      );
    console.log(validUsers)
      if (!validUsers.length) return;
      validUsers.forEach((user: any, index: number) => {
        const phone = this.normalizePhone(
          user.whatsappNumber
        );
        console.log(phone)
        const message = encodeURIComponent(
          `Hello ${user.name}, Please check your PDF: ${pdfUrl}`
        );
        const whatsappUrl =
          `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
        
        const delay = index * 3000;
        setTimeout(() => {
          try {
            const newTab = window.open(
              whatsappUrl,
              '_blank'
            );
            if (!newTab) {
              console.log(
                `Popup blocked for ${user.name}`
              );
            }
          } catch (error) {
            console.log(
              `Failed for ${user.name}`
            );
          }
        }, delay);
      });
    },
    error: (error) => {
      console.error(
        'Failed to fetch users',
        error
      );
    }
  });
}

private generatePdf(): string {
  const pdf =new jsPDF();
    pdf.setFontSize(18);
    pdf.text('Users Report',20,20);
    pdf.setFontSize(12 );
    pdf.text('This PDF generated from Angular 21.',20,40);
   pdf.save('report.pdf'); 
  const blob = pdf.output('blob');
  return URL.createObjectURL(blob );

}

private normalizePhone(phone: string): string {
  return phone
    .replace(/\s+/g, '')
    .replace('+', '')
    .replace(/^01001234567/, '201006820553')
    .replace(/^0/, '20');

}

}
