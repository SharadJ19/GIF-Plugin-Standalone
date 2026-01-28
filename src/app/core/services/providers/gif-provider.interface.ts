// src\app\core\services\providers\gif-provider.interface.ts

import { Observable } from 'rxjs';
import { GifApiResponse } from '../../models/gif.model';

export interface GifProvider {
  readonly name: string;
  readonly displayName: string;

  search(
    query: string,
    limit: number,
    offset: number,
  ): Observable<GifApiResponse>;
  getTrending(limit: number, offset: number): Observable<GifApiResponse>;
}
