// src\app\app.component.ts

import { Component, OnInit } from '@angular/core';
import { GifAggregatorService } from './core/services/gif-aggregator.service';
import { GiphyProviderService } from './core/services/providers/giphy.provider.service';
import { KlipyProviderService } from './core/services/providers/klipy.provider.service';

@Component({
  selector: 'app-root',
  template: ` <app-home></app-home> `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #f5f5f5;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private gifAggregator: GifAggregatorService,
    private giphyProvider: GiphyProviderService,
    private klipyProvider: KlipyProviderService,
  ) {}

  ngOnInit(): void {
    // Initialize providers when app starts
    this.gifAggregator.registerProviders([
      this.giphyProvider,
      this.klipyProvider,
    ]);
  }
}
