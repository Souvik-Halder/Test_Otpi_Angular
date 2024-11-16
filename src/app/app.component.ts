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
  otpFields = Array(5).fill(0); // Create 5 input fields dynamically
  otp: string[] = Array(5).fill(''); // Store OTP values

  // Handle single digit input
  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 1 && index < this.otpFields.length - 1) {
      this.focusNext(index);
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
    event.preventDefault();

    const clipboardData = event.clipboardData?.getData('text').trim();
    if (!clipboardData || clipboardData.length !== this.otpFields.length)
      return;

    // Distribute the pasted data across the fields
    clipboardData.split('').forEach((char, idx) => {
      this.otp[idx] = char;
    });

    // Focus the last field
    this.focusLast();
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

  private focusLast(): void {
    const inputs = document.querySelectorAll('.otp-input');
    if (inputs.length > 0) {
      (inputs[inputs.length - 1] as HTMLInputElement).focus();
    }
  }
}
