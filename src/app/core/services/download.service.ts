// src\app\core\services\download.service.ts

import { Injectable } from '@angular/core';
import { Gif } from '../models/gif.model';

@Injectable({ providedIn: 'root' })
export class DownloadService {
  
  async downloadGif(gif: Gif): Promise<void> {
    try {
      // Fetch the GIF as a blob
      const response = await fetch(gif.originalUrl);
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = this.getFileName(gif);
      
      // Append to body, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
      
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab (old behavior)
      this.fallbackDownload(gif);
    }
  }

  // Alternative fallback method
  private fallbackDownload(gif: Gif): void {
    const link = document.createElement('a');
    link.href = gif.originalUrl;
    link.download = this.getFileName(gif);
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private getFileName(gif: Gif): string {
    // Clean up title and create filename
    const cleanTitle = gif.title
      .replace(/[^a-z0-9\s]/gi, '') // Remove special characters
      .replace(/\s+/g, '_')         // Replace spaces with underscores
      .toLowerCase()
      .substring(0, 30);            // Limit length
    
    return `${cleanTitle || 'gif'}_${gif.provider.toLowerCase()}.gif`;
  }
}
