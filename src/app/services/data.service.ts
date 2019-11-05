import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getClassroomSchedule(id: string) {
    const requestUrl = `${this.baseUrl}/classroom?id=${id}`;
    return new Promise<any[]>((resolve, reject) => {
      this.http.get(requestUrl).subscribe((data: any[]) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getGroupList(groupId: string, subjectId: string) {
    const requestUrl = `${this.baseUrl}/group?id=${groupId}&subject=${subjectId}`;
    return this.http.get(requestUrl);
  }

  getStudent(id: string) {
    const requestUrl = `${this.baseUrl}/student?id=${id}`;
    return this.http.get(requestUrl);
  }

  getStudentGroups(id: string) {
    const requestUrl = `${this.baseUrl}/student/groups?id=${id}`;
    return this.http.get(requestUrl);
  }

  getStudentSchedule(id: string) {
    const requestUrl = `${this.baseUrl}/student/schedule?id=${id}`;
    return this.http.get(requestUrl);
  }

  getProfessor(id: string) {
    const requestUrl = `${this.baseUrl}/professor?id=${id}`;
    return this.http.get(requestUrl).toPromise();
  }

  getProfessorSchedule(id: string) {
    const requestUrl = `${this.baseUrl}/professor/schedule?id=${id}`;
    return this.http.get(requestUrl);
  }

  public getProfessorGroups(id: string) {
    const requestUrl = `${this.baseUrl}/professor/groups?id=${id}`;
    return this.http.get(requestUrl);
  }

  uploadDatabaseFile(file: File) {
    const postUrl = `${this.baseUrl}/updateDatabase`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(postUrl, formData);
  }

  getUsers() {
    const requestUrl = `${this.baseUrl}/users`;
    return this.http.get(requestUrl);
  }

  getClassrooms() {
    const requestUrl = `${this.baseUrl}/classroom/list`;
    return this.http.get(requestUrl);
  }

  getPrograms() {
    const requestUrl = `${this.baseUrl}/programs`;
    return this.http.get(requestUrl).toPromise();
  }

  createRecord(studentId: string, classroom: string, groupId: string, subjectId: string) {
    const postUrl = `${this.baseUrl}/record/create`;
    return this.http.post<any>(postUrl, { studentId, classroom, groupId, subjectId }).subscribe();
  }

  createEmployeeRecord(employeeId: string, classroom: string, groupId: string, subjectId: string) {
    const postUrl = `${this.baseUrl}/record/create`;
    return this.http.post<any>(postUrl, { employeeId, classroom, groupId, subjectId }).subscribe();
  }

  getRecords(type: string, programId: string, classroom: string, start: string, end: string) {
    const requestUrl = `${this.baseUrl}/record`;
    const params = new HttpParams()
      .set('classroom', classroom)
      .set('start', start)
      .set('end', end)
      .set('type', type);
    if (programId) {
      params.set('programId', programId);
    }
    return this.http.get(requestUrl, { params }).toPromise();
  }

  getAdminUser(classroom: string) {
    const requestUrl = `${this.baseUrl}/users/admin?classroom=${classroom}`;
    return this.http.get(requestUrl).toPromise();
  }

}
