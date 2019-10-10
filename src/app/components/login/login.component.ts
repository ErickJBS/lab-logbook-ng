import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: MessageService,
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.auth.signIn(this.email, this.password).then(_ => {
      this.router.navigate(['/home']);
    }).catch(error => {
      let errorMessage: string;
      if (error.status === 401) {
        errorMessage = 'Contraseña incorrecta';
      } else if (error.status === 404) {
        errorMessage = 'El usuario no existe';
      }
      this.toast.add({
        severity: 'warn',
        detail: errorMessage,
      });
    });
  }
}
