import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.data.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }
}
