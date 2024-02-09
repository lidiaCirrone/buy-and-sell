import { Component } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private auth: Auth) {}
  user$ = user(this.auth);
}
