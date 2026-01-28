// src\app\core\services\providers\giphy.provider.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GifProvider } from './gif-provider.interface';
import { Gif, GifApiResponse } from '../../models/gif.model';
import { GiphyApiResponse } from '../../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class GiphyProviderService implements GifProvider {
  readonly name = 'GIPHY';
  readonly displayName = 'GIPHY';

  private readonly API_KEY = 'LInLexYpjXhjAut38TFVTYDCibVuco7o';
  private readonly BASE_URL = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  search(
    query: string,
    limit: number = 5,
    offset: number = 0,
  ): Observable<GifApiResponse> {
    const params = {
      api_key: this.API_KEY,
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
      rating: 'g',
    };

    return this.http
      .get<GiphyApiResponse>(`${this.BASE_URL}/search`, { params })
      .pipe(map((response) => this.mapGiphyResponse(response, limit, offset)));
  }

  getTrending(
    limit: number = 5,
    offset: number = 0,
  ): Observable<GifApiResponse> {
    const params = {
      api_key: this.API_KEY,
      limit: limit.toString(),
      offset: offset.toString(),
      rating: 'g',
    };

    return this.http
      .get<GiphyApiResponse>(`${this.BASE_URL}/trending`, { params })
      .pipe(map((response) => this.mapGiphyResponse(response, limit, offset)));
  }

  private mapGiphyResponse(
    response: GiphyApiResponse,
    limit: number,
    offset: number,
  ): GifApiResponse {
    return {
      data: response.data.map((item) => ({
        id: item.id,
        title: item.title || 'Untitled GIF',
        url: item.images.fixed_height.url,
        previewUrl:
          item.images.preview_gif?.url || item.images.fixed_height_small.url,
        originalUrl: item.images.original.url,
        width: parseInt(item.images.fixed_height.width),
        height: parseInt(item.images.fixed_height.height),
        provider: 'GIPHY',
      })),
      pagination: {
        total: response.pagination?.total_count || 0,
        count: response.pagination?.count || limit,
        offset: response.pagination?.offset || offset,
        hasNext:
          response.pagination?.offset + response.pagination?.count <
          response.pagination?.total_count,
      },
    };
  }
}
