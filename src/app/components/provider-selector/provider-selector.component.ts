// src\app\components\provider-selector\provider-selector.component.ts

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GifAggregatorService } from '../../core/services/gif-aggregator.service';

@Component({
  selector: 'app-provider-selector',
  template: `
    <div class="provider-selector">
      <button class="filter-btn" (click)="toggleDropdown()">
        <mat-icon class="filter-icon">filter_list</mat-icon>
        {{ selectedProvider }}
      </button>

      <div class="dropdown" *ngIf="isDropdownOpen">
        <button
          *ngFor="let provider of providers"
          (click)="selectProvider(provider.name)"
          [class.active]="selectedProvider === provider.name"
        >
          {{ provider.displayName }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .provider-selector {
        position: relative;
        display: inline-block;
      }

      .filter-btn {
        background: #ff9100;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
        font-family: Roboto, 'Helvetica Neue', sans-serif;
      }

      .filter-btn:hover {
        background: #e68200;
      }

      .filter-icon {
        font-size: 20px;
        height: 20px;
        width: 20px;
      }

      .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        z-index: 100;
        margin-top: 5px;
        min-width: 120px;
      }

      .dropdown button {
        display: block;
        width: 100%;
        padding: 10px 16px;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        color: #333;
      }

      .dropdown button:hover {
        background: #f5f5f5;
      }

      .dropdown button.active {
        background: rgba(255, 145, 0, 0.1);
        color: #ff9100;
        font-weight: 500;
      }
    `,
  ],
})
export class ProviderSelectorComponent implements OnInit {
  providers: Array<{ name: string; displayName: string }> = [];
  selectedProvider = 'GIPHY';
  isDropdownOpen = false;

  @Output() providerChange = new EventEmitter<string>();

  constructor(private gifAggregator: GifAggregatorService) {}

  ngOnInit(): void {
    this.providers = this.gifAggregator.getAvailableProviders();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectProvider(providerName: string): void {
    this.selectedProvider = providerName;
    this.isDropdownOpen = false;
    this.gifAggregator.setActiveProvider(providerName);
    this.providerChange.emit(providerName);
  }
}
