import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {

  studentId: string;
  lastStudent: any;

  constructor(
    private data: DataService,
    private toast: MessageService,
  ) { }

  ngOnInit() {
  }

  onStudentLog() {
    this.data.getStudent(this.studentId).subscribe((data: any) => {
      if (data && data.length > 0) {
        this.lastStudent = data[0];
      } else {
        this.displayMessage('Estudiante no encontrado');
      }
    }, (error) => {
      console.error(error);
    });
  }

  displayMessage(msg: string) {
    this.toast.add({
      severity: 'warn', summary: msg
    });
  }
}
