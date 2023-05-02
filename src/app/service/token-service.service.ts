import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  private readonly API_TOKEN_PRE = "http://api.telegram.org/bot";
  private readonly API_TOKEN_POS = "/getMe";

  constructor(private http: HttpClient) { }

  getValidacaoToken(token: string) {
    return this.http.get(this.API_TOKEN_PRE + token + this.API_TOKEN_POS,
     {observe: 'response', headers: this.getHeader(this.API_TOKEN_PRE + token + this.API_TOKEN_POS)});
  }

  private getHeader(url: string) {
    return new HttpHeaders().set('Access-Control-Allow-Origin', url)
  }
}
