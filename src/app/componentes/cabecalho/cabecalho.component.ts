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
  classImg: string = "button-reload-red"

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.clicked = false;
    this.verifyAPIOnline();
  }

  public verifyAPIOnline() {
    this.clicked = true;
    this.apiService.getApiOnline().subscribe({
      complete: () => {
        this.newItemEvent.emit(true);
        this.apiOnline = true;
        this.clicked = false;
        this.classImg = "button-reload-green";
      }, 
      error: () => {
        this.newItemEvent.emit(false);
        this.apiOnline = false;
        this.clicked = false;
        this.classImg = "button-reload-red";
      }
    })
  }

}
