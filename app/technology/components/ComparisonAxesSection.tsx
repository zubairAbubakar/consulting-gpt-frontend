'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScaleIcon } from '@heroicons/react/24/outline';
import { SectionSkeleton } from './SectionSkeleton';
import { AnalysisStatusResponse } from '@/actions/getAnalysisStatus';
import { ComparisonAxis } from '@/types/comparison-axis';

interface ComparisonAxesSectionProps {
  analysisStatus: AnalysisStatusResponse | null;
  comparisonAxes: ComparisonAxis[];
  technologyName: string;
  isLoaded: boolean;
}

export function ComparisonAxesSection({
  analysisStatus,
  comparisonAxes,
  technologyName,
  isLoaded,
}: ComparisonAxesSectionProps) {
  const status = analysisStatus?.components?.comparisonAxes?.status || 'pending';

  if (status === 'complete' && isLoaded) {
    return (
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
              <TableCaption>Comparison axes for the technology: {technologyName}</TableCaption>
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
    );
  }

  return (
    <SectionSkeleton
      title="Comparison Axes"
      description="Detailed analysis of comparison axes"
      icon={<ScaleIcon className="h-5 w-5" />}
      status={status as 'pending' | 'processing' | 'error'}
      errorMessage={analysisStatus?.components?.comparisonAxes?.errorMessage || undefined}
    />
  );
}
