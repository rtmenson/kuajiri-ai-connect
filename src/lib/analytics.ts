/**
 * Google Analytics Utility Functions
 * Handles initialization and event tracking for Google Analytics
 */

/**
 * Initialize Google Analytics by injecting the gtag.js script
 * Should be called once on application startup
 */
export const initGA = (measurementId: string): void => {
  // Check if GA is already initialized
  if (window.gtag) {
    console.warn('Google Analytics already initialized');
    return;
  }

  // Only initialize if measurement ID is provided
  if (!measurementId) {
    console.warn('Google Analytics measurement ID not provided');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Set initial timestamp
  window.gtag('js', new Date());

  // Configure with measurement ID
  window.gtag('config', measurementId, {
    send_page_view: false, // We'll handle page views manually via React Router
  });

  // Inject gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  console.log('Google Analytics initialized with ID:', measurementId);
};

/**
 * Track a page view event
 * @param path - The URL path to track
 * @param title - Optional page title
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!window.gtag) {
    console.warn('Google Analytics not initialized');
    return;
  }

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('GA Measurement ID not found');
    return;
  }

  window.gtag('config', measurementId, {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });

  console.log('GA Page View:', path);
};

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param eventParams - Additional event parameters
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (!window.gtag) {
    console.warn('Google Analytics not initialized');
    return;
  }

  window.gtag('event', eventName, eventParams);
  console.log('GA Event:', eventName, eventParams);
};

/**
 * Check if Google Analytics is enabled (has measurement ID)
 */
export const isGAEnabled = (): boolean => {
  return !!import.meta.env.VITE_GA_MEASUREMENT_ID;
};
