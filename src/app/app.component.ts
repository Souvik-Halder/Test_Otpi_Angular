import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myInput') myInput: any;

  ngAfterViewInit() {
    // Use setTimeout to ensure the input is fully rendered before focusing
    setTimeout(() => {
      if (this.myInput) {
        this.myInput.nativeElement.focus();
      }
    }, 300); // Adding a small delay to ensure it works properly
  }
}
