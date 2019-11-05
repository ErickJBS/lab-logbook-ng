import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { MessageService } from 'primeng/api';
import { ES_LOCALE } from '@services/const.service';
import { PdfGenerator } from '@app/services/pdf.generator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ES_LOCALE = ES_LOCALE;
  mode = true;
  classrooms: any[];
  programs: any[];

  // Filter variables
  selectedLab: string;
  selectedProgram: string;
  startDate: Date;
  endDate: Date;

  // Results
  records: any[];

  constructor(
    private data: DataService,
    private toast: MessageService,
    private pdf: PdfGenerator,
  ) { }

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.data.getClassrooms().subscribe((data: any[]) => {
      this.classrooms = data.map(item => {
        return { label: item.classroom, value: item.classroom };
      });
      this.classrooms.unshift({ label: 'Seleccionar laboratorio' });
    });
    this.data.getPrograms().then((data: any[]) => {
      this.programs = data.map(item => {
        return { label: item.program_id, value: item.program_id };
      });
      this.programs.unshift({ label: 'Todas las carreras' });
    });
  }

  dynamicDateRange(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear - 5}:${currentYear}`;
  }

  onFilterChange() {
    if (!this.checkFilters()) {
      return;
    }
    const startDate = this.startDate.getTime().toString();
    const endDate = this.endDate.getTime().toString();
    if (this.mode) {
      // Students
      this.data.getRecords('students', this.selectedProgram, this.selectedLab, startDate, endDate).then((data: any[]) => {
        this.records = data.sort((a, b) => a.date - b.date);
      });
    } else {
      // Professores
      this.data.getRecords('professors', null, this.selectedLab, startDate, endDate).then((data: any[]) => {
        this.records = data.sort((a, b) => a.date - b.date);
      });
    }
  }

  checkFilters() {
    if (!this.selectedLab) {
      this.displayMessage('Seleccione un laboratorio');
      return false;
    }
    if (!this.startDate) {
      this.displayMessage('Seleccione una fecha inicial');
      return false;
    }
    if (!this.endDate) {
      this.displayMessage('Seleccione una fecha final');
      return false;
    }
    if (this.startDate > this.endDate) {
      this.displayMessage('La fecha inicial no puede ser posterior a la inicial');
      return false;
    }
    return true;
  }

  displayMessage(msg: string) {
    this.toast.add({
      severity: 'warn', summary: msg
    });
  }

  async generatePdfReport() {
    const admin: any = await this.data.getAdminUser(this.selectedLab);
    if (this.mode) {
      const records = this.records.map((item: any) => [item.student_id, item.name, item.program_id]);
      this.pdf.generateStudentsReportPdf(admin.name, records);
    } else {
      const records = this.records.map((item: any) => {
        const date = new Date(item.date);
        return [
          item.name, item.subject_id,
          this.formatDate(date), this.formatHour(date)
        ];
      });
      this.pdf.generateProfessorsReportPdf(admin.name, records);
    }
  }

  onChange() {
    this.records = null;
  }

  formatDate(date: Date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = '' + date.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('/');
  }

  formatHour(date: Date) {
    let hour = '' + date.getHours();
    hour = hour.length < 2 ? `0${hour}` : hour;
    let minute = '' + date.getMinutes();
    minute = minute.length < 2 ? `0${minute}` : minute;
    return [hour, minute].join(':');
  }
}
