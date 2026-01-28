// src\app\core\models\gif.model.ts

export interface Gif {
  id: string;
  title: string;
  url: string;
  previewUrl: string;
  originalUrl: string;
  width: number;
  height: number;
  provider: string;
}

export interface GifApiResponse {
  data: Gif[];
  pagination: {
    total: number;
    count: number;
    offset: number;
    hasNext: boolean;
  };
}
