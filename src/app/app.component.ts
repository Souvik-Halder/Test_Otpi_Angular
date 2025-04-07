import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myInput') myInput: any;

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Use setTimeout to ensure the input is fully rendered before focusing
    setTimeout(() => {
      this.cdRef.detectChanges();
      const inputElement = document.getElementById(
        'myInput'
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    }, 500); // Adding a small delay to ensure it works properly
  }
}
