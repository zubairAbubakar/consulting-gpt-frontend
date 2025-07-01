interface AnalysisStatusSummary {
  status: string;
  startedAt: string | null;
  completedAt: string | null;
  errorMessage: string | null;
}

interface AnalysisStatusResponse {
  technologyId: number;
  components: Record<string, AnalysisStatusSummary>;
  overall: string;
  pollingRecommendation: {
    intervalMs: number;
  };
}

export default async function getAnalysisStatus(
  technologyId: string
): Promise<AnalysisStatusResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/technology/${technologyId}/analysis-status`,
    {
      cache: 'no-store', // Always fetch fresh data for real-time updates
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch analysis status');
  }

  return res.json();
}

export type { AnalysisStatusResponse, AnalysisStatusSummary };
