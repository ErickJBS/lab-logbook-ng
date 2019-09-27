import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
    this.test();
  }

  test() {
    this.data.getStudentSchedule('311010').subscribe((data) => {
      console.log(data);
    });
  }

}
