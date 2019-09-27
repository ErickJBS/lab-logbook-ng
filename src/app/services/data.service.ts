import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(requestUrl);
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
    return this.http.get(requestUrl);
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

}
