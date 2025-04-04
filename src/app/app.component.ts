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

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Use setTimeout to ensure the input is fully rendered before focusing
    setTimeout(() => {
      if (this.myInput) {
        this.myInput.nativeElement.focus();
        this.myInput.nativeElement.autoFocus = true;
        this.router.events
          .pipe(filter((event) => event instanceof NavigationEnd))
          .subscribe(() => {
            if (this.myInput) {
              this.myInput.nativeElement.focus();
            }
          });
      }
      this.myInput.native;
    }, 300); // Adding a small delay to ensure it works properly
  }
}
