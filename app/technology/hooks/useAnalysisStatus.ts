'use client';

import { useState, useEffect, useCallback } from 'react';
import getAnalysisStatus, { AnalysisStatusResponse } from '@/actions/getAnalysisStatus';

interface UseAnalysisStatusProps {
  technologyId: string;
  enabled?: boolean;
}

export function useAnalysisStatus({ technologyId, enabled = true }: UseAnalysisStatusProps) {
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!enabled) return;

    try {
      setError(null);
      const status = await getAnalysisStatus(technologyId);
      setAnalysisStatus(status);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analysis status');
      setIsLoading(false);
    }
  }, [technologyId, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Initial fetch
    fetchStatus();

    // Set up polling
    const poll = async () => {
      try {
        const status = await getAnalysisStatus(technologyId);
        setAnalysisStatus(status);

        // Stop polling if all components are complete or have errors
        const allCompleteOrError = Object.values(status.components).every(
          (component) => component.status === 'complete' || component.status === 'error'
        );

        if (allCompleteOrError) {
          return false; // Stop polling
        }

        return true; // Continue polling
      } catch (err) {
        console.error('Polling error:', err);
        return true; // Continue polling even on error
      }
    };

    let timeoutId: NodeJS.Timeout;

    const startPolling = () => {
      poll().then((shouldContinue) => {
        if (shouldContinue) {
          const interval = analysisStatus?.pollingRecommendation?.intervalMs || 7000;
          timeoutId = setTimeout(startPolling, interval);
        }
      });
    };

    // Start polling after initial fetch
    if (analysisStatus) {
      const allCompleteOrError = Object.values(analysisStatus.components).every(
        (component) => component.status === 'complete' || component.status === 'error'
      );

      if (!allCompleteOrError) {
        const interval = analysisStatus.pollingRecommendation?.intervalMs || 7000;
        timeoutId = setTimeout(startPolling, interval);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fetchStatus, analysisStatus, enabled]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    fetchStatus();
  }, [fetchStatus]);

  return {
    analysisStatus,
    isLoading,
    error,
    refetch,
  };
}
