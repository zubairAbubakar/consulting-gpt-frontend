import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import {
  ArrowLeft,
  User,
  Mail,
  Briefcase,
  CheckCircle,
  Clock,
  Target,
  Variable,
  Siren,
  Microscope,
  Diff,
  Notebook,
  Key,
  ArrowRightLeft,
  ExternalLinkIcon,
  FileTextIcon,
  AwardIcon,
} from 'lucide-react';
import {
  LightBulbIcon,
  BeakerIcon,
  ScaleIcon,
  DocumentMagnifyingGlassIcon,
  PresentationChartLineIcon,
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

interface TechnologyPageProps {
  params: {
    technologyId: string;
  };
}

const TechnologyPage: React.FC<TechnologyPageProps> = async ({ params }) => {
  const { technologyId } = await params;

  const [technology, comparisonAxes, relatedPatents, papers] = await Promise.all([
    getTechnology(technologyId),
    getComparisonAxes(technologyId),
    getRelatedPatents(technologyId),
    getRelatedPapers(technologyId),
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

  return (
    <div className="space-y-6" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Technology Analysis Report</h2>
      </div>
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
                <p className="text-sm font-medium text-gray-600">{technology.problemStatement}</p>
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
                    className="rounded-lg border border-gray-200 bg-gray-50/60 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/50"
                  >
                    <div className="mb-2 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                      <h4 className="text-md font-semibold text-gray-800 dark:text-slate-100">
                        {doc.name || 'N/A'}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs capitalize ${
                            doc.type === 'patent'
                              ? 'border-sky-500 text-sky-700 dark:border-sky-400 dark:text-sky-300'
                              : 'border-amber-500 text-amber-700 dark:border-amber-400 dark:text-amber-300'
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
                      <p className="mb-2 text-sm leading-relaxed text-gray-600 dark:text-slate-300">
                        <span className="font-medium text-gray-700 dark:text-slate-200">
                          Abstract:
                        </span>{' '}
                        {doc.abstract.length > 200
                          ? `${doc.abstract.substring(0, 200)}...`
                          : doc.abstract}
                      </p>
                    )}

                    <div className="grid grid-cols-1 gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-slate-400 sm:grid-cols-2">
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
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View Document <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500 dark:text-slate-400">
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
                      className="rounded-lg border border-gray-200 bg-gray-50/60 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/50"
                    >
                      <div className="mb-2 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-slate-100">
                          {paper.title || 'N/A'} {/* Using paper.title */}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="border-amber-500 text-xs capitalize text-amber-700 dark:border-amber-400 dark:text-amber-300"
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
                        <p className="mb-2 text-sm leading-relaxed text-gray-600 dark:text-slate-300">
                          <span className="font-medium text-gray-700 dark:text-slate-200">
                            Abstract:
                          </span>{' '}
                          {paper.abstract.length > 200
                            ? `${paper.abstract.substring(0, 200)}...`
                            : paper.abstract}
                        </p>
                      )}

                      <div className="grid grid-cols-1 gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-slate-400 sm:grid-cols-2">
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
                              <AwardIcon className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-500" />
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
                            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
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
              <p className="text-center text-sm text-gray-500 dark:text-slate-400">
                No related papers found for this technology.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <BackToTopButton />
    </div>
  );
};

export default TechnologyPage;
