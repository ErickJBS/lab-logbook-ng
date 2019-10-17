import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { DataService } from '@services/data.service';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private currentLab: string;
  private schedule: any[];

  constructor(
    private auth: AuthService,
    private data: DataService,
  ) { }

  async onLoad() {
    this.currentLab = this.auth.getUser().classroom;
    this.schedule = await this.data.getClassroomSchedule(this.currentLab);
  }

  async getCurrentClass() {
    const lab = this.auth.getUser().classroom;
    if (!this.schedule || (lab !== this.currentLab)) {
      await this.onLoad();
    }
    const date = new Date();
    const day = date.getDay() - 1;
    const hour = date.getHours();
    const c = this.schedule.filter((item: any) => {
      if (item.day === day && hour >= item.start_hour && hour < item.end_hour) {
        return item;
      }
    });
    if (c.length > 0) {
      return c[0];
    }
    return null;
  }
}