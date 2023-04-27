import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { Token } from '../token';
import { Ip } from '../ip';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit, AfterViewInit {

  _apiOnline!: boolean;
  formIp!: FormGroup;
  formToken!: FormGroup;

  constructor(private apiService: ApiServiceService,
    private formBuilder: FormBuilder) { }

  ngAfterViewInit(): void {
      this.recarregarInfos();
  }

  ngOnInit(): void {
    this.formIp = this.formBuilder.group({
      ip: ['', Validators.compose([
        Validators.required
      ])]
    })

    this.formToken = this.formBuilder.group({
      token: ['', Validators.compose([
        Validators.required
      ])]
    })
  }


  @Input() set apiOnline(value: boolean) {
    this._apiOnline = value;

    if (this._apiOnline) {
      this.recarregarInfos();
    }
  }

  public restartApi() {
    this.apiService.restart().subscribe();
  }

  recarregarInfos() {
    this.apiService.getToken().subscribe((tokenResponse: Token) => {
      this.formToken.setValue({
        token: tokenResponse.token
      })

    })

    this.apiService.getIp().subscribe((ipResponse: Ip) => {
      this.formIp.setValue({
        ip: ipResponse.ip
      })

    })
  }
}
