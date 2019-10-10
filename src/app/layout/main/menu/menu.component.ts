import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSignOut() {
    console.log('[MenuComponent][onSignOut]');
  }

  onLogout() {
    this.auth.signOut();
  }

}