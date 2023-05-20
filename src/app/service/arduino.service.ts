import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  private readonly PRE = "http://";
  private readonly endPoint = '/valid';

  constructor(private http: HttpClient) { }

  getIpValido(url: string) {
    return this.http.get(this.PRE + url + this.endPoint, {observe: 'response', headers: this.getHeader()});
  }

  private getHeader() {
    const header = new HttpHeaders();
    header.set("Access-Control-Allow-Origin", "*");
    header.set("Access-Control-Allow-Methods", "GET, POST, PUT");
    header.set("Access-Control-Allow-Headers", "Content-Type");

    return header;
  }
}
