import { Component } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  appName = 'Buy And Sell';

  constructor(private auth: Auth) {}
  user$ = user(this.auth);

  signInClicked(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  signOutClicked(): void {
    signOut(this.auth);
  }
}
