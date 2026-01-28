// src\app\core\models\api-response.model.ts

// GIPHY Response
export interface GiphyApiResponse {
  data: Array<{
    id: string;
    title: string;
    url: string;
    images: {
      original: { url: string; width: string; height: string };
      fixed_height: { url: string; width: string; height: string };
      fixed_height_small: { url: string; width: string; height: string };
      preview_gif?: { url: string; width: string; height: string };
    };
  }>;
  pagination: { total_count: number; count: number; offset: number };
}

// KLIPY Response
export interface KlipyApiResponse {
  result: boolean;
  data: {
    data: Array<{
      id: number;
      title: string;
      file: {
        hd: { gif: { url: string; width: number; height: number } };
        md: { gif: { url: string; width: number; height: number } };
        sm: { gif: { url: string; width: number; height: number } };
      };
    }>;
    current_page: number;
    per_page: number;
    has_next: boolean;
  };
}
