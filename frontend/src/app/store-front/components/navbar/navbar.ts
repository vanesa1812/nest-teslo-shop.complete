import { AuthService } from './../../../auth/services/auth.service';
import {  Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './navbar.html',

})
export class Navbar {

  authService= inject(AuthService)
}
