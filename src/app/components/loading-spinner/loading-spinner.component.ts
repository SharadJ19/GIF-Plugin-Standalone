// src\app\components\loading-spinner\loading-spinner.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loading-container">
      <mat-icon class="spinner-icon">refresh</mat-icon>
      <div class="message">{{ message }}</div>
    </div>
  `,
  styles: [
    `
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
      }

      .spinner-icon {
        font-size: 40px;
        height: 40px;
        width: 40px;
        margin-bottom: 16px;
        color: #ff9100;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .message {
        color: #666;
        font-size: 14px;
        font-family: Roboto, sans-serif;
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  @Input() message = 'Loading...';
}
