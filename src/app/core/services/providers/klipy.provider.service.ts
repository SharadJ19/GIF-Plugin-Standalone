// src\app\core\services\providers\klipy.provider.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GifProvider } from './gif-provider.interface';
import { Gif, GifApiResponse } from '../../models/gif.model';
import { KlipyApiResponse } from '../../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class KlipyProviderService implements GifProvider {
  readonly name = 'KLIPY';
  readonly displayName = 'KLIPY';

  private readonly API_KEY =
    'SrYRPQqP7fG3265DN4rRS1inl5Yb7AYjUJQVchFn4yvaR9ZY6VBAJxGjgHb9unKh';
  private readonly BASE_URL = 'https://api.klipy.com/api/v1';

  constructor(private http: HttpClient) {}

  search(
    query: string,
    limit: number = 5,
    offset: number = 0,
  ): Observable<GifApiResponse> {
    const page = Math.floor(offset / limit) + 1;
    const params = {
      q: query,
      page: page.toString(),
      per_page: limit.toString(),
      customer_id: 'gif-aggregator-user',
    };

    return this.http
      .get<KlipyApiResponse>(`${this.BASE_URL}/${this.API_KEY}/gifs/search`, {
        params,
      })
      .pipe(map((response) => this.mapKlipyResponse(response, limit, offset)));
  }

  getTrending(
    limit: number = 5,
    offset: number = 0,
  ): Observable<GifApiResponse> {
    const page = Math.floor(offset / limit) + 1;
    const params = {
      page: page.toString(),
      per_page: limit.toString(),
      customer_id: 'gif-aggregator-user',
    };

    return this.http
      .get<KlipyApiResponse>(`${this.BASE_URL}/${this.API_KEY}/gifs/trending`, {
        params,
      })
      .pipe(map((response) => this.mapKlipyResponse(response, limit, offset)));
  }

  private mapKlipyResponse(
    response: KlipyApiResponse,
    limit: number,
    offset: number,
  ): GifApiResponse {
    if (!response.result || !response.data?.data) {
      return {
        data: [],
        pagination: { total: 0, count: 0, offset, hasNext: false },
      };
    }

    return {
      data: response.data.data.map((item) => {
        const displayFile = item.file.md || item.file.sm || item.file.hd;
        return {
          id: item.id.toString(),
          title: item.title || 'Untitled GIF',
          url: displayFile.gif.url,
          previewUrl: item.file.sm?.gif?.url || displayFile.gif.url,
          originalUrl: item.file.hd?.gif?.url || displayFile.gif.url,
          width: displayFile.gif.width,
          height: displayFile.gif.height,
          provider: 'KLIPY',
        };
      }),
      pagination: {
        total: 0,
        count: response.data.data.length,
        offset: offset,
        hasNext: response.data.has_next,
      },
    };
  }
}
