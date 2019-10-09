import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  result: any;
  schedule: any;
  queryId: string;
  searchProfessors: boolean;

  days: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  displayedColumns: string[] = ['day', 'group_id', 'name', 'start_hour', 'end_hour', 'classroom'];

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  loadResults() {
    if (this.searchProfessors) {
      this.data.getProfessor(this.queryId).subscribe((data: any) => {
        if (data.length > 0) {
          this.result = data[0];
        } else {
          this.result = { name: 'Sin resultados' };
        }
      });
      this.data.getProfessorSchedule(this.queryId).subscribe((data: any) => {
        this.schedule = data;
      });
    } else {
      this.data.getStudent(this.queryId).subscribe((data: any) => {
        if (data.length > 0) {
          this.result = data[0];
        } else {
          this.result = { name: 'Sin resultados' };
        }
      });
      this.data.getStudentSchedule(this.queryId).subscribe((data: any) => {
        this.schedule = data;
      });
    }
  }
}
