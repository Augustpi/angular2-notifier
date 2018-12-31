import { Component } from '@angular/core';
import { Notifier } from "./notifier";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sendNotifier(type: string, title: string, content: string, duration: number): void {
    new Notifier(type, title, content, duration).show();
  }

}
