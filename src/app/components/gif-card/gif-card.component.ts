// src\app\components\gif-card\gif-card.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Gif } from '../../core/models/gif.model';

@Component({
  selector: 'app-gif-card',
  template: `
    <div class="gif-card">
      <img [src]="gif.url" [alt]="gif.title" loading="lazy" class="gif-image" />

      <div class="gif-overlay">
        <div class="gif-title">{{ gif.title }}</div>
        <div class="gif-actions">
          <button
            mat-icon-button
            class="download-btn"
            (click)="onDownload()"
            matTooltip="Download GIF"
          >
            <mat-icon>download</mat-icon>
          </button>
          <span class="provider-badge">{{ gif.provider }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .gif-card {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;
        cursor: pointer;
        background: white;
        width: 100%;
        height: auto;
        aspect-ratio: 1;
      }

      .gif-card:hover {
        transform: translateY(-5px);
      }

      .gif-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .gif-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        padding: 12px;
        color: white;
        opacity: 1;
      }

      .gif-title {
        font-size: 12px;
        margin-bottom: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: Roboto, sans-serif;
      }

      .gif-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .download-btn {
        background: #ff9100;
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      .download-btn:hover {
        background: #e68200;
      }

      .download-btn mat-icon {
        font-size: 18px;
        height: 18px;
        width: 18px;
      }

      .provider-badge {
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 10px;
        font-family: Roboto, sans-serif;
      }
    `,
  ],
})
export class GifCardComponent {
  @Input() gif!: Gif;
  @Output() download = new EventEmitter<Gif>();

  onDownload(): void {
    this.download.emit(this.gif);
  }
}
