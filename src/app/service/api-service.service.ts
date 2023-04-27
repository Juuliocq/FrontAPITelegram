import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { Token } from '../componentes/token';
import { Ip } from '../componentes/ip';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private readonly API = 'http://localhost:8088/tgbot';

  constructor(private http: HttpClient) {}

  getApiOnline() {
    return this.http.get(this.API + "/actuator/health",
     {observe: 'response', headers: this.getHeader("/actuator/health")}).pipe(timeout(2000));
  }

  restart() {
    return this.http.post(this.API + "/actuator/restart", {}).pipe(timeout(150));
  }

  getToken() {
    return this.http.get<Token>(this.API + "/token", {headers: this.getHeader("/token")});
  }

  getIp() {
    return this.http.get<Ip>(this.API + "/ipArduino", {headers: this.getHeader("/ipArduino")});
  }

  private getHeader(url: string) {
    return new HttpHeaders().set('Access-Control-Allow-Origin', this.API + url)
  }
}
