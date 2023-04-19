import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private readonly API = 'http://localhost:8088/tgbot';

  constructor(private http: HttpClient) {}

  getApiOnline() {
    let header = new HttpHeaders().set('Access-Control-Allow-Origin', this.API + "/actuator/health")
    return this.http.get(this.API + "/actuator/health", {observe: 'response', headers: header}).pipe(timeout(2000));
  }
}
