'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLinkIcon } from 'lucide-react';
import { ChartPieIcon } from '@heroicons/react/24/outline';
import { SectionSkeleton } from './SectionSkeleton';
import { MarketAnalysisDetail } from './MarketAnalysisDetail';
import { AnalysisStatusResponse } from '@/actions/getAnalysisStatus';
import { MarketAnalysis } from '@/types/market-analysis';
import { ComparisonAxis } from '@/types/comparison-axis';
import { RelatedPatent } from '@/types/related-patent';

interface MarketAnalysisSectionProps {
  analysisStatus: AnalysisStatusResponse | null;
  marketAnalysisData: MarketAnalysis[];
  comparisonAxes: ComparisonAxis[];
  relatedPatents: RelatedPatent[];
  isLoaded: boolean;
}

export function MarketAnalysisSection({
  analysisStatus,
  marketAnalysisData,
  comparisonAxes,
  relatedPatents,
  isLoaded,
}: MarketAnalysisSectionProps) {
  const status = analysisStatus?.components?.marketAnalysis?.status || 'pending';

  // Pre-process/Group the Market Analysis Data
  const groupedMarketAnalysis = (marketAnalysisData || []).reduce<Record<number, MarketAnalysis[]>>(
    (acc, item) => {
      if (!acc[item.relatedTechnologyId]) {
        acc[item.relatedTechnologyId] = [];
      }
      acc[item.relatedTechnologyId].push(item);
      return acc;
    },
    {}
  );

  if (status === 'complete' && isLoaded) {
    return (
      <div id="market-analysis">
        <Card className="border-0 bg-white/90 py-0 shadow-lg backdrop-blur-sm">
          <CardHeader className="rounded-t-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-6 text-white">
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <ChartPieIcon className="h-6 w-6" />
              Market Analysis Insights
            </CardTitle>
            <CardDescription className="text-cyan-100">
              Comparative analysis against related patents.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {Object.keys(groupedMarketAnalysis).length > 0 ? (
              Object.entries(groupedMarketAnalysis).map(([relatedPatentId, analyses]) => {
                // Find the related patent from your relatedPatents array
                const relatedPatent = relatedPatents?.find(
                  (patent) => patent.id === parseInt(relatedPatentId)
                );
                const relatedPatentTitle = relatedPatent
                  ? relatedPatent.name || `Related Patent ID: ${relatedPatentId}`
                  : `Related Patent ID: ${relatedPatentId}`;

                return (
                  <div
                    key={relatedPatentId}
                    className="rounded-lg border border-gray-200 bg-slate-50/70 p-4 shadow-md"
                  >
                    <h3 className="mb-3 text-lg font-semibold text-gray-800">
                      Comparative Analysis with Patent:{' '}
                      <span className="text-blue-600">{relatedPatentTitle}</span>
                      {relatedPatent?.url && (
                        <a
                          href={relatedPatent.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 inline-flex items-center text-xs text-blue-500 hover:underline"
                        >
                          (View Patent <ExternalLinkIcon className="h-3 w-3" />)
                        </a>
                      )}
                    </h3>
                    <div className="space-y-4">
                      {analyses.map((item) => {
                        const axis = comparisonAxes?.find((ax) => ax.id === item.axisId);
                        const axisName = axis?.axisName || `Axis ID: ${item.axisId}`;

                        return (
                          <MarketAnalysisDetail key={item.id} item={item} axisName={axisName} />
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-sm text-gray-500">
                No market analysis data found for this technology.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SectionSkeleton
      title="Market Analysis Insights"
      description="Comparative analysis against related patents"
      icon={<ChartPieIcon className="h-6 w-6" />}
      status={status as 'pending' | 'processing' | 'error'}
      errorMessage={analysisStatus?.components?.marketAnalysis?.errorMessage || undefined}
    />
  );
}
