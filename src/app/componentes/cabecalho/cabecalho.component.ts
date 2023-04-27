import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  @Input() apiOnline!: boolean;
  clicked!: boolean;
  @Output() newItemEvent = new EventEmitter<boolean>();

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
        this.newItemEvent.emit(true);
        this.clicked = false;
      }, 
      error: () => {
        this.apiOnline = false;
        this.newItemEvent.emit(false);
        this.clicked = false;
      }
    })
  }

}
