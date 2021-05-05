import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';
  source = "http://pm1.narvii.com/6990/f87b6dd62e0d069bec729526e7ab9d508045f7far1-576-576v2_uhq.jpg";
  age = 30;

  handleClick() {
    this.title = "Hello from Poiré";
  }
}
