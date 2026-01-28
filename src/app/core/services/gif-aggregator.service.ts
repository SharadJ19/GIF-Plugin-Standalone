// src\app\core\services\gif-aggregator.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GifProvider } from './providers/gif-provider.interface';
import { GifApiResponse } from '../models/gif.model';

@Injectable({ providedIn: 'root' })
export class GifAggregatorService {
  private providers = new Map<string, GifProvider>();
  private activeProvider: GifProvider;

  constructor() {
    this.activeProvider = null as any;
  }

  registerProviders(providers: GifProvider[]): void {
    providers.forEach((provider) => {
      this.providers.set(provider.name, provider);
    });

    // Set GIPHY as default if available
    if (this.providers.has('GIPHY')) {
      this.activeProvider = this.providers.get('GIPHY')!;
    }
  }

  setActiveProvider(name: string): void {
    const provider = this.providers.get(name);
    if (provider) {
      this.activeProvider = provider;
    }
  }

  getActiveProvider(): GifProvider {
    return this.activeProvider;
  }

  getAvailableProviders(): Array<{ name: string; displayName: string }> {
    return Array.from(this.providers.values()).map((p) => ({
      name: p.name,
      displayName: p.displayName,
    }));
  }

  search(
    query: string,
    limit: number = 5,
    offset: number = 0,
  ): Observable<GifApiResponse> {
    if (!this.activeProvider) {
      throw new Error('No active provider selected');
    }
    return this.activeProvider.search(query, limit, offset);
  }

  getTrending(
    limit: number = 5,
    offset: number = 0,
  ): Observable<GifApiResponse> {
    if (!this.activeProvider) {
      throw new Error('No active provider selected');
    }
    return this.activeProvider.getTrending(limit, offset);
  }
}
