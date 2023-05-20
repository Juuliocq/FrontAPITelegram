import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { Token } from '../token';
import { Ip } from '../ip';
import { ArduinoService } from 'src/app/service/arduino.service';
import { timeout } from 'rxjs';
import { TokenServiceService } from 'src/app/service/token-service.service';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit, AfterViewInit {

  _apiOnline!: boolean;
  formIp!: FormGroup;
  formToken!: FormGroup;

  ip: string = "";

  constructor(private apiService: ApiServiceService,
    private arduinoService: ArduinoService,
    private tokenService: TokenServiceService,
    private formBuilder: FormBuilder) { }

  ngAfterViewInit(): void {
    this.recarregarInfos();
  }

  ngOnInit(): void {
    this.formIp = this.formBuilder.group({
      ip: ['']
    })

    this.formToken = this.formBuilder.group({
      token: ['']
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

      this.validaIp();
      //this.validaToken();
    }
    )
  }

  validaIp() {
    this.formIp.controls['ip'].setErrors({ 'ipInvalid': true })
    this.arduinoService.getIpValido(this.formIp.controls['ip'].value
    ).pipe(timeout(10000)).subscribe({
      complete: () => {
        this.formIp.controls['ip'].setErrors({ 'ipInvalid': false })
      },
      error: () => {
        this.formIp.controls['ip'].setErrors({ 'ipInvalid': true })
      }
    })
  }

  validaToken() {
    this.formToken.controls['token'].setErrors({ 'tokenInvalid': true })

    this.tokenService.getValidacaoToken(this.formToken.controls['token'].value
    ).pipe(timeout(5000)).subscribe({
      complete: () => {
        this.formToken.controls['token'].setErrors({ 'tokenInvalid': false })
      },
      error: () => {
        this.formToken.controls['token'].setErrors({ 'tokenInvalid': true })
      }
    })
  }

  salvar() {
    if (!this.formIp.get('ip')?.errors?.['ipInvalid']) {
      this.apiService.setIp({
        "ip": this.formIp.controls['ip'].value
      }).subscribe();
    }

    if (!this.formToken.get('token')?.valid) {
      this.apiService.setToken({
        "token": this.formToken.controls['token'].value
      }).subscribe();
    }
  }
}
