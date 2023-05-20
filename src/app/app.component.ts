import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  apiOnline = false;

  title = 'APITelegramFront';

  setApiOnline(apiOnline: boolean) {
    this.apiOnline = apiOnline;
  }

  apiOnlinemet() {
    return this.apiOnline;
  }
}
