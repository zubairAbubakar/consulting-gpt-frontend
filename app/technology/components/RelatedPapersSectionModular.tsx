'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLinkIcon, FileTextIcon, AwardIcon } from 'lucide-react';
import { SectionSkeleton } from './SectionSkeleton';
import { AnalysisStatusResponse } from '@/actions/getAnalysisStatus';

interface Paper {
  id: string;
  title: string;
  abstract: string;
  publicationDate: string;
  authors: string;
  journal: string;
  citationCount: number;
  url: string;
  paperId: string;
}

interface RelatedPapersSectionProps {
  analysisStatus: AnalysisStatusResponse | null;
  papers: Paper[];
  isLoaded: boolean;
  formatDate: (dateString: string) => string;
}

export function RelatedPapersSection({
  analysisStatus,
  papers,
  isLoaded,
  formatDate,
}: RelatedPapersSectionProps) {
  const status = analysisStatus?.components?.relatedPapers?.status || 'pending';

  if (status === 'complete' && isLoaded) {
    return (
      <div id="papers">
        <Card className="border-0 bg-white/90 py-0 shadow-lg backdrop-blur-sm">
          <CardHeader className="rounded-t-lg bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 text-white">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <FileTextIcon className="h-5 w-5" />
              Related Papers
            </CardTitle>
            <CardDescription className="text-amber-100">
              Review relevant academic papers and research
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {papers && papers.length > 0 ? (
              <div className="space-y-5">
                {papers.map((paper) => (
                  <div
                    key={paper.id}
                    className="rounded-lg border border-gray-200 bg-gray-50/60 p-4 shadow-sm"
                  >
                    <div className="mb-2 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                      <h4 className="text-md font-semibold text-gray-800">
                        {paper.title || 'N/A'}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-amber-500 text-xs capitalize text-amber-700"
                        >
                          Paper
                        </Badge>
                        {paper.paperId && (
                          <Badge variant="secondary" className="text-xs">
                            ID: {paper.paperId}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {paper.abstract && (
                      <p className="mb-2 text-sm leading-relaxed text-gray-600">
                        <span className="font-medium text-gray-700">Abstract:</span>{' '}
                        {paper.abstract.length > 200
                          ? `${paper.abstract.substring(0, 200)}...`
                          : paper.abstract}
                      </p>
                    )}

                    <div className="grid grid-cols-1 gap-x-4 gap-y-1 text-xs text-gray-500 sm:grid-cols-2">
                      {paper.publicationDate && (
                        <p>
                          <span className="font-medium">Published:</span>{' '}
                          {formatDate(paper.publicationDate)}
                        </p>
                      )}
                      {paper.authors && (
                        <p className="truncate">
                          <span className="font-medium">Authors:</span> {paper.authors}
                        </p>
                      )}
                      {paper.journal && (
                        <p className="truncate">
                          <span className="font-medium">Journal:</span> {paper.journal}
                        </p>
                      )}
                      {paper.citationCount !== undefined && paper.citationCount > 0 && (
                        <p className="flex items-center gap-1">
                          <AwardIcon className="h-3.5 w-3.5 text-yellow-600" />
                          <span className="font-medium">Citations:</span> {paper.citationCount}
                        </p>
                      )}
                    </div>

                    {paper.url && (
                      <div className="mt-3">
                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          View Paper <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">
                No related papers found for this technology.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SectionSkeleton
      title="Related Papers"
      description="Review relevant academic papers and research"
      icon={<FileTextIcon className="h-5 w-5" />}
      status={status as 'pending' | 'processing' | 'error'}
      errorMessage={analysisStatus?.components?.relatedPapers?.errorMessage || undefined}
    />
  );
}
