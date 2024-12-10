import { CommonModule } from '@angular/common';
import {
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
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const inputs = document.querySelectorAll('.otp-input');
    const input = inputs[0] as HTMLInputElement;
    console.log('Input are ');
    input.focus();

    input.maxLength = 6;
  }
  otpFields = Array(6).fill(0);
  otp: string[] = Array(6).fill('');
  phn_num: string = '';

  onInput(event: Event, index: number): void {
    if (index === 0) {
      let whole_value = '';
      const input = event.target as HTMLInputElement;
      const value = input.value;
      if (value.length > 1 && value.length === 5) {
        whole_value = value;
        input.maxLength = 1;
        input.value = value.slice(0, 1);
      }
      if (value.length === 1 && index < this.otpFields.length - 1) {
        input.maxLength = 1;
        this.focusNext(index);
      }
      if (whole_value !== '') {
        const otpArray = whole_value.split('').slice(0, this.otpFields.length);

        // Populate OTP fields with the pasted data
        otpArray.forEach((char, idx) => {
          this.otp[idx] = char;
        });

        // Automatically move focus to the last filled input
        const lastFilledIndex = otpArray.length - 1;
        if (lastFilledIndex >= 0) {
          this.focusLast(lastFilledIndex);
        }
      }
    } else {
      const input = event.target as HTMLInputElement;
      const value = input.value;

      if (value.length === 1 && index < this.otpFields.length - 1) {
        this.focusNext(index);
      }
    }
  }

  // Handle backspace to move focus back
  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.focusPrevious(index);
    }
  }

  // Handle paste event
  onPaste(event: ClipboardEvent): void {
    let element = document.getElementById('para');
    event.preventDefault();

    const clipboardData = event.clipboardData?.getData('text').trim();
    if (!clipboardData) return;

    const otpArray = clipboardData.split('').slice(0, this.otpFields.length);

    // Populate OTP fields with the pasted data
    otpArray.forEach((char, idx) => {
      this.otp[idx] = char;
    });

    // Automatically move focus to the last filled input
    const lastFilledIndex = otpArray.length - 1;
    if (lastFilledIndex >= 0) {
      this.focusLast(lastFilledIndex);
    }
  }

  private focusNext(index: number): void {
    const nextInput = document.querySelectorAll('.otp-input')[
      index + 1
    ] as HTMLInputElement;
    if (nextInput) nextInput.focus();
  }

  private focusPrevious(index: number): void {
    const prevInput = document.querySelectorAll('.otp-input')[
      index - 1
    ] as HTMLInputElement;
    if (prevInput) prevInput.focus();
  }

  private focusLast(index: number): void {
    const inputs = document.querySelectorAll('.otp-input');
    if (inputs.length > index) {
      (inputs[index] as HTMLInputElement).focus();
    }
  }
  omit_special_char(event: KeyboardEvent) {
    console.log('first');
    var k;
    k = event.key.charCodeAt(0); //        k = event.keyCode;  (Both can be used)
    console.log(k);

    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      (k >= 48 && k <= 57)
    );
  }
  onPaste_omit_specilachar(event: ClipboardEvent) {
    event.preventDefault();
    console.log(event.clipboardData?.getData('text').trim());
    const data = event.clipboardData?.getData('text').trim();
    let modified_data = '';
    if (!data) return;

    const n = data?.length;
    for (let i = 0; i < n; i++) {
      const k = data.charCodeAt(i);
      if (
        (k > 64 && k < 91) ||
        (k > 96 && k < 123) ||
        k == 8 ||
        (k >= 48 && k <= 57)
      ) {
        modified_data += data.charAt(i);
      }
    }
    this.phn_num = modified_data;
  }

  onInput_omit_specilachar(event: Event) {
    const input = event.target as HTMLInputElement;
    const data = input.value;

    let modified_data = '';
    if (!data) return;

    const n = data?.length;
    for (let i = 0; i < n; i++) {
      const k = data.charCodeAt(i);
      if (
        (k > 64 && k < 91) ||
        (k > 96 && k < 123) ||
        k == 8 ||
        (k >= 48 && k <= 57)
      ) {
        modified_data += data.charAt(i);
      }
    }

    input.value = modified_data;
    this.phn_num = modified_data;
  }
}
