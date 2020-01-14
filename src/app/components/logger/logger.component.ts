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

  employeeId: string;
  lastEmployee: any;

  labClasses: any[];
  selectedClass: any;
  checkinHour: any;

  constructor(
    private data: DataService,
    private toast: MessageService,
    private schedule: ScheduleService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.onLoad();
  }

  async onLoad() {
    const data = await this.schedule.getClassList();
    this.labClasses = data.map((item: any) => {
      return {
        label: `${item.name} - ${item.group_id}`,
        value: item,
      };
    });
    this.labClasses.unshift({ label: 'Seleccione un grupo', value: null });
  }

  onEmployeeLog() {
    if (!this.selectedClass) {
      this.displayMessage('No se seleccionó un grupo');
      return;
    }
    this.data.getProfessor(this.employeeId).then((data: any) => {
      this.checkinHour = new Date();
      if (data && data.length > 0) {
        this.lastEmployee = data[0];
        this.logEmployee();
      } else {
        this.displayMessage('Empleado no encontrado');
      }
      this.employeeId = '';
    }).catch((error) => {
      console.error(error);
    });
  }

  onStudentLog() {
    if (!this.selectedClass) {
      this.displayMessage('No se seleccionó un grupo');
      return;
    }
    if (this.studentId.endsWith('4400') && this.studentId.startsWith('A')) {
      this.studentId = this.studentId.substring(1, 7);
    }
    this.data.getStudent(this.studentId).subscribe(async (data: any) => {
      if (data && data.length > 0) {
        this.lastStudent = data[0];
        this.logStudent();
      } else {
        this.displayMessage('Estudiante no encontrado');
      }
      this.studentId = '';
    }, (error) => {
      console.error(error);
    });
  }

  logStudent() {
    const classroom = this.auth.getUser().classroom;
    this.data.createRecord(
      this.studentId, classroom, this.selectedClass.group_id, this.selectedClass.subject_id);
  }

  logEmployee() {
    const classroom = this.auth.getUser().classroom;
    this.data.createEmployeeRecord(
      this.employeeId, classroom, this.selectedClass.group_id, this.selectedClass.subject_id);
  }

  displayMessage(msg: string) {
    this.toast.add({
      severity: 'warn', summary: msg
    });
  }
}
