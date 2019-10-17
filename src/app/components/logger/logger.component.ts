import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { MessageService } from 'primeng/api';
import { ScheduleService } from '@app/services/schedule.service';
import { AuthService } from '@app/services/auth.service';

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
    private schedule: ScheduleService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  onStudentLog() {
    this.data.getStudent(this.studentId).subscribe(async (data: any) => {
      if (data && data.length > 0) {
        this.lastStudent = data[0];
        const c = await this.schedule.getCurrentClass();
        if (c) {
          this.logStudent(c);
        } else {
          this.displayMessage('No hay ninguna clase en curso en el laboratorio');
        }
      } else {
        this.displayMessage('Estudiante no encontrado');
      }
    }, (error) => {
      console.error(error);
    });
  }

  logStudent(info: any) {
    const classroom = this.auth.getUser().classroom;
    this.data.createRecord(this.studentId, classroom, info.group_id, info.subject_id);
  }

  displayMessage(msg: string) {
    this.toast.add({
      severity: 'warn', summary: msg
    });
  }
}
