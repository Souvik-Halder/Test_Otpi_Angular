import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  onClick($event: MouseEvent, i: number) {
    const input = $event.target as HTMLInputElement;
    if (i === 0) {
      input.maxLength = 6;
    } else {
    }
  }
  otpFields = Array(5).fill(0); // Create 5 input fields dynamically
  otp: string[] = Array(5).fill(''); // Store OTP values

  // Handle single digit input
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
}
