import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import {
  Siren,
  Microscope,
  Diff,
  Notebook,
  Key,
  ExternalLinkIcon,
  FileTextIcon,
  AwardIcon,
} from 'lucide-react';
import {
  ScaleIcon,
  DocumentMagnifyingGlassIcon,
  ChartPieIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import getTechnology from '@/actions/getTechnology';
import { getComparisonAxes } from '@/actions/getComparisonAxes';
import { getRelatedPatents } from '@/actions/getRelatedPatents';
import { getRelatedPapers } from '@/actions/getRelatedPapers';
import { BackToTopButton } from '@/app/components/back-to-top-button';
import { getMarketAnalysis } from '@/actions/getMarketAnalysis';
import { MarketAnalysis } from '@/types/market-analysis';
import { MarketAnalysisDetail } from '../components/MarketAnalysisDetail';
import { ComparisonAxis } from '@/types/comparison-axis';
import { RelatedPatent } from '@/types/related-patent';
import { PcaScatterPlot } from '../components/PcaScatterPlot';
import { getPcaVisualizationData } from '@/actions/getPcaVisualizationData';
import { getMedicalAssessment } from '@/actions/getMedicalAssessment';
import { MedicalAssessment } from '../components/MedicalAssessment';
import { Button } from '@/components/ui/button';
import { ReportDownloader } from '../components/ReportDownloader';
import getAnalysisStatus from '@/actions/getAnalysisStatus';
import { ProgressIndicator } from '../components/ProgressIndicator';

interface TechnologyPageProps {
  params: Promise<{
    technologyId: string;
  }>;
}

const TechnologyPage: React.FC<TechnologyPageProps> = async ({ params }) => {
  const { technologyId } = await params;

  const [
    technology,
    comparisonAxes,
    relatedPatents,
    papers,
    marketAnalysisData,
    pcaVisualizationData,
    medicalAssessment,
    analysisStatus,
  ] = await Promise.all([
    getTechnology(technologyId),
    getComparisonAxes(technologyId),
    getRelatedPatents(technologyId),
    getRelatedPapers(technologyId),
    getMarketAnalysis(technologyId),
    getPcaVisualizationData(technologyId),
    getMedicalAssessment(technologyId),
    getAnalysisStatus(technologyId),
  ]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  // Pre-process/Group the Market Analysis Data
  const groupedMarketAnalysis = (marketAnalysisData || []).reduce<
    // Add null check for marketAnalysisData
    Record<number, MarketAnalysis[]>
  >((acc, item) => {
    if (!acc[item.relatedTechnologyId]) {
      acc[item.relatedTechnologyId] = [];
    }
    acc[item.relatedTechnologyId].push(item);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4 px-4">
      <ReportDownloader reportName="Medical-Technology-Analysis-Report.pdf">
        <div className="space-y-6" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Progress Indicator */}
          <ProgressIndicator
            analysisStatus={analysisStatus}
            isLoading={false}
            technologyId={technologyId}
          />

          {/* Section 1: Technology Overview */}
          <div id="overview">
            <Card className="border-0 bg-white/90 py-0 shadow-lg backdrop-blur-sm">
              <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-6 text-white">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <Microscope className="h-5 w-5" />
                  Technology Overview
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Full details of your technology
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <Siren className="h-4 w-4" />
                      Technology Name
                    </div>
                    <p className="text-sm font-medium text-gray-600">{technology.name}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <Diff className="h-4 w-4" />
                      Number of Axes
                    </div>
                    <p className="text-sm font-medium text-gray-600">{technology.numOfAxes}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <Notebook className="h-4 w-4" />
                      Generated Problem statement
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      {technology.problemStatement}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <Key className="h-4 w-4" />
                      Generated Search Keywords
                    </div>
                    <p className="text-sm font-medium text-gray-600">{technology.searchKeywords}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-gray-700">Technology Abstract</h4>
                  <p className="text-sm font-medium leading-relaxed text-gray-600">
                    {technology.abstract}
                  </p>
                </div>
                {/* <div className="flex gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Complexity: {1}
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Est. Duration: {2} weeks
              </Badge>
            </div> */}
              </CardContent>
            </Card>
          </div>

          {/* Section 2: Comparison Axis */}
          <div id="comparison-axes">
            <Card className="border-0 bg-white/90 py-0 shadow-lg backdrop-blur-sm">
              <CardHeader className="rounded-t-lg bg-gradient-to-r from-green-500 to-teal-600 px-6 py-6 text-white">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <ScaleIcon className="h-5 w-5" />
                  Comparison Axes
                </CardTitle>
                <CardDescription className="text-green-100">
                  Detailed analysis of comparison axes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableCaption>Comparison axes for the technology: {technology.name}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Axis Name</TableHead>
                      <TableHead>Extreme 1</TableHead>
                      <TableHead>Extreme 2</TableHead>
                      <TableHead>Weight</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonAxes.map((axis) => (
                      <TableRow key={axis.id}>
                        <TableCell>{axis.axisName}</TableCell>
                        <TableCell>{axis.extreme1}</TableCell>
                        <TableCell>{axis.extreme2}</TableCell>
                        <TableCell>{axis.weight}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Section 3: Related Patents */}
          <div id="patents">
            <Card className="border-0 bg-white/90 py-0 shadow-lg backdrop-blur-sm">
              <CardHeader className="rounded-t-lg bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4 text-white">
                {/* Adjusted py-6 to py-4 */}
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                  {/* Adjusted text-2xl to text-xl */}
                  <DocumentMagnifyingGlassIcon className="h-5 w-5" /> {/* Heroicon */}
                  Related Patents & Papers
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Some related patents to your technology
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {relatedPatents && relatedPatents.length > 0 ? (
                  <div className="space-y-5">
                    {relatedPatents.map((doc) => (
                      <div
                        key={doc.id}
                        className="rounded-lg border border-gray-200 bg-gray-50/60 p-4 shadow-sm"
                      >
                        <div className="mb-2 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                          <h4 className="text-md font-semibold text-gray-800">
                            {doc.name || 'N/A'}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs capitalize ${
                                doc.type === 'patent'
                                  ? 'border-sky-500 text-sky-700'
                                  : 'border-amber-500 text-amber-700'
                              }`}
                            >
                              {doc.type || 'N/A'}
                            </Badge>
                            {doc.documentId && (
                              <Badge variant="secondary" className="text-xs">
                                ID: {doc.documentId}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {doc.abstract && (
                          <p className="mb-2 text-sm leading-relaxed text-gray-600">
                            <span className="font-medium text-gray-700">Abstract:</span>{' '}
                            {doc.abstract.length > 200
                              ? `${doc.abstract.substring(0, 200)}...`
                              : doc.abstract}
                          </p>
                        )}

                        <div className="grid grid-cols-1 gap-x-4 gap-y-1 text-xs text-gray-500 sm:grid-cols-2">
                          {doc.publicationDate && (
                            <p>
                              <span className="font-medium">Published:</span>{' '}
                              {formatDate(doc.publicationDate)}
                            </p>
                          )}
                          {doc.inventors && (
                            <p className="truncate">
                              {' '}
                              {/* Added truncate for potentially long lists */}
                              <span className="font-medium">Inventors:</span> {doc.inventors}
                            </p>
                          )}
                          {doc.assignees && (
                            <p className="truncate">
                              {' '}
                              {/* Added truncate */}
                              <span className="font-medium">Assignees:</span> {doc.assignees}
                            </p>
                          )}
                        </div>

                        {doc.url && (
                          <div className="mt-3">
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                            >
                              View Document <ExternalLinkIcon className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-sm text-gray-500">
                    No related patents or papers found for this technology.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Section 4: Related Papers */}
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
                    {papers.map(
                      (
                        paper // Using RelatedPaper type
                      ) => (
                        <div
                          key={paper.id} // Assuming 'id' is unique for the paper record
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
                              {paper.paperId && ( // Using paper.paperId
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
                            {paper.publicationDate && ( // Using paper.publicationDate
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
                            {paper.citationCount !== undefined &&
                              paper.citationCount > 0 && ( // Display citation count
                                <p className="flex items-center gap-1">
                                  <AwardIcon className="h-3.5 w-3.5 text-yellow-600" />
                                  <span className="font-medium">Citations:</span>{' '}
                                  {paper.citationCount}
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
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-center text-sm text-gray-500">
                    No related papers found for this technology.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Section 5: Market Analysis Insights */}
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
                    const relatedPatent = (relatedPatents as RelatedPatent[])?.find(
                      // Cast to RelatedPatent[]
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
                          Comparative Analysis with Patent: {/* @ts-ignore */}
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
                            const axis = (comparisonAxes as ComparisonAxis[])?.find(
                              // Cast to ComparisonAxis[]
                              (ax) => ax.id === item.axisId
                            );
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

          {/* Section 6: PCA Visualization */}
          <div id="pca-visualization">
            <PcaScatterPlot
              visualizationData={pcaVisualizationData}
              yourTechnologyName={technology?.name}
            />
          </div>

          <div id="medical-assessment">
            <Card className="border-0 bg-white/90 py-0 shadow-lg backdrop-blur-sm">
              <CardHeader className="rounded-t-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-6 text-white">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <BanknotesIcon className="h-5 w-5" />
                  Medical Assessment & Billable Items
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Medical assessment and associated billable items
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <MedicalAssessment
                  medicalAssociation={medicalAssessment?.medical_association || 'N/A'}
                  recommendations={
                    medicalAssessment?.recommendations || 'No recommendations available.'
                  }
                  billableItems={medicalAssessment?.billable_items || []}
                  totalFee={medicalAssessment?.total_fee || 0}
                />
              </CardContent>
            </Card>
          </div>
          <BackToTopButton />
        </div>
      </ReportDownloader>
    </div>
  );
};

export default TechnologyPage;
