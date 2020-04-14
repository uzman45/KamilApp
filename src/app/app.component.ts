import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kamil Sıralayıcı';
  isAuthenticated: boolean;
  constructor(public authService: AuthService,private router:Router) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }
   ngOnInit() {
    this.isAuthenticated =  this.authService.checkAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
  

}
