import { Component, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent {

  _apiOnline!: boolean;

  constructor(private apiService: ApiServiceService) { }

  @Input() set apiOnline(value: boolean) {
    
    this._apiOnline = value; 
 }

  public restartApi() {
    this.apiService.restart().subscribe();
  } 
}
