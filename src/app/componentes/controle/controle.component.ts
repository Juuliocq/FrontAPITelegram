import { Component } from '@angular/core';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent {

  public alert() {
    alert("foi");
  } 
}
