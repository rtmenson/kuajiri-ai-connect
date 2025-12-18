import { useState, useCallback } from "react";

interface RateLimitConfig {
  key: string;
  maxRequests: number;
  windowMs: number; // Time window in milliseconds
}

interface RateLimitResult {
  isAllowed: boolean;
  remainingRequests: number;
  resetTime: Date | null;
  timeUntilReset: number; // in seconds
}

interface StoredRateLimitData {
  timestamps: number[];
}

export const useRateLimit = ({ key, maxRequests, windowMs }: RateLimitConfig) => {
  const storageKey = `rate_limit_${key}`;

  const getStoredData = (): StoredRateLimitData => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading rate limit data:", e);
    }
    return { timestamps: [] };
  };

  const setStoredData = (data: StoredRateLimitData) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (e) {
      console.error("Error storing rate limit data:", e);
    }
  };

  const cleanExpiredTimestamps = (timestamps: number[]): number[] => {
    const now = Date.now();
    return timestamps.filter((ts) => now - ts < windowMs);
  };

  const checkRateLimit = useCallback((): RateLimitResult => {
    const data = getStoredData();
    const validTimestamps = cleanExpiredTimestamps(data.timestamps);
    
    const isAllowed = validTimestamps.length < maxRequests;
    const remainingRequests = Math.max(0, maxRequests - validTimestamps.length);
    
    let resetTime: Date | null = null;
    let timeUntilReset = 0;
    
    if (validTimestamps.length > 0) {
      const oldestTimestamp = Math.min(...validTimestamps);
      const resetTimestamp = oldestTimestamp + windowMs;
      resetTime = new Date(resetTimestamp);
      timeUntilReset = Math.max(0, Math.ceil((resetTimestamp - Date.now()) / 1000));
    }

    return { isAllowed, remainingRequests, resetTime, timeUntilReset };
  }, [maxRequests, windowMs, storageKey]);

  const recordRequest = useCallback(() => {
    const data = getStoredData();
    const validTimestamps = cleanExpiredTimestamps(data.timestamps);
    validTimestamps.push(Date.now());
    setStoredData({ timestamps: validTimestamps });
  }, [storageKey, windowMs]);

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    }
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  };

  return {
    checkRateLimit,
    recordRequest,
    formatTimeRemaining,
  };
};

// Pre-configured rate limiters
export const useJobPostRateLimit = () =>
  useRateLimit({
    key: "job_post_generator",
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  });

export const useSalaryCheckRateLimit = () =>
  useRateLimit({
    key: "salary_check",
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 hour
  });
