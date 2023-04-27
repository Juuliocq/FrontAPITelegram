import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  @Input() apiOnline!: boolean;
  clicked!: boolean;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.clicked = false;
    this.verifyAPIOnline();
  }

  public verifyAPIOnline() {
    this.clicked = true;
    this.apiService.getApiOnline().subscribe({
      complete: () => {
        this.apiOnline = true;
        this.clicked = false;
      }, 
      error: () => {
        this.apiOnline = false;
        this.clicked = false;
      }
    })
  }

}
