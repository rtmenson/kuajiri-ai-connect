/**
 * Google Analytics gtag.js type declarations
 * Extends the Window interface to include Google Analytics global objects
 */

interface Window {
  dataLayer: any[];
  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    config?: {
      page_path?: string;
      page_title?: string;
      page_location?: string;
      [key: string]: any;
    }
  ) => void;
}

export {};
