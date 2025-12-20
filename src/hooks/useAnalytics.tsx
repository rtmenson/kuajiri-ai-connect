import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, isGAEnabled } from '@/lib/analytics';

/**
 * Custom hook to automatically track page views on route changes
 * Integrates with React Router's useLocation hook
 *
 * Usage: Call this hook once in your App component
 * Example: useAnalytics();
 */
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Only track if GA is enabled
    if (!isGAEnabled()) {
      return;
    }

    // Track page view whenever location changes
    trackPageView(location.pathname + location.search);
  }, [location]);
};
