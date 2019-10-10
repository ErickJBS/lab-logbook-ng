import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  awaitingNotifications: any[] = [];

  showNotificacions = false;
  showUserInfo = false;

  style = 'transform: translate3d(-135px, 32px, 0px)';

  constructor(public data: DataService) { }

  ngOnInit() {
  }

}
