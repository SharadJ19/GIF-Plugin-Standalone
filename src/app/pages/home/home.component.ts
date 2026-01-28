// src\app\pages\home\home.component.ts

import { Component, OnInit } from '@angular/core';
import { Gif } from '../../core/models/gif.model';
import { GifAggregatorService } from '../../core/services/gif-aggregator.service';
import { DownloadService } from '../../core/services/download.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  gifs: Gif[] = [];
  searchQuery = '';
  isLoading = false;
  currentProvider = 'GIPHY';

  private offset = 0;
  private readonly limit = 5;
  public hasMore = true;
  private currentMode: 'search' | 'trending' = 'trending';

  constructor(
    private gifAggregator: GifAggregatorService,
    private downloadService: DownloadService,
  ) {}

  ngOnInit(): void {
    this.loadTrending();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.currentMode = 'search';
      this.offset = 0;
      this.gifs = [];
      this.hasMore = true;
      this.loadSearchResults();
    }
  }

  onTrending(): void {
    this.currentMode = 'trending';
    this.searchQuery = '';
    this.offset = 0;
    this.gifs = [];
    this.hasMore = true;
    this.loadTrending();
  }

  onLoadMore(): void {
    this.offset += this.limit;
    if (this.currentMode === 'search') {
      this.loadSearchResults();
    } else {
      this.loadTrending();
    }
  }

  onProviderChange(providerName: string): void {
    this.currentProvider = providerName;
    this.offset = 0;
    this.gifs = [];
    this.hasMore = true;

    if (this.currentMode === 'search' && this.searchQuery.trim()) {
      this.loadSearchResults();
    } else {
      this.loadTrending();
    }
  }

  onDownload(gif: Gif): void {
    this.downloadService.downloadGif(gif);
  }

  private loadSearchResults(): void {
    this.isLoading = true;
    this.gifAggregator
      .search(this.searchQuery, this.limit, this.offset)
      .subscribe({
        next: (response) => {
          this.gifs = [...this.gifs, ...response.data];
          this.hasMore = response.pagination.hasNext;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.isLoading = false;
        },
      });
  }

  private loadTrending(): void {
    this.isLoading = true;
    this.gifAggregator.getTrending(this.limit, this.offset).subscribe({
      next: (response) => {
        this.gifs = [...this.gifs, ...response.data];
        this.hasMore = response.pagination.hasNext;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Trending error:', error);
        this.isLoading = false;
      },
    });
  }
}
