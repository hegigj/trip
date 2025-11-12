import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';

@Component({
  selector: 'root',
  imports: [RouterOutlet, ToolbarComponent],
  templateUrl: './app.html'
})
export class App {
}
