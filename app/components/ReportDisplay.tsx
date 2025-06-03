'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FormData } from '@/app/page';
import { ArrowLeft, User, Mail, Briefcase, CheckCircle, Clock, Target } from 'lucide-react';

interface ReportDisplayProps {
  data: FormData;
  onBack: () => void;
}

const ReportDisplay = ({ data, onBack }: ReportDisplayProps) => {
  // Generate dynamic content based on form data
  const projectKeywords = data.abstract
    .toLowerCase()
    .split(' ')
    .filter((word) => word.length > 3);
  const estimatedDuration = Math.max(2, Math.ceil(data.abstract.length / 50));
  const complexityScore =
    data.abstract.length > 100 ? 'High' : data.abstract.length > 50 ? 'Medium' : 'Low';

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">Project Analysis Report</h2>
      </div>

      {/* Section 1: Project Overview */}
      <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Section 1: Project Overview
          </CardTitle>
          <CardDescription className="text-blue-100">
            Comprehensive analysis of your project details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <User className="h-4 w-4" />
                Project Owner
              </div>
              <p className="text-lg font-semibold text-gray-800">{data.name}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Mail className="h-4 w-4" />
                Contact Email
              </div>
              <p className="text-lg font-semibold text-gray-800">{data.number_of_axis}</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Technology Abstract</h4>
            <p className="leading-relaxed text-gray-600">{data.abstract}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Complexity: {complexityScore}
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Est. Duration: {estimatedDuration} weeks
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Analysis & Insights */}
      <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Section 2: Analysis & Insights
          </CardTitle>
          <CardDescription className="text-green-100">
            Key insights and recommendations based on your project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-semibold text-gray-700">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Key Focus Areas
              </h4>
              <ul className="space-y-1">
                {projectKeywords.slice(0, 4).map((keyword, index) => (
                  <li key={index} className="capitalize text-gray-600">
                    • {keyword}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Project Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Description Length:</span>
                  <span className="font-medium">{data.abstract.length} characters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Word Count:</span>
                  <span className="font-medium">{data.abstract.split(' ').length} words</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Detail Level:</span>
                  <Badge variant={complexityScore === 'High' ? 'default' : 'secondary'}>
                    {complexityScore}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Recommendations & Next Steps */}
      <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Section 3: Recommendations & Next Steps
          </CardTitle>
          <CardDescription className="text-purple-100">
            Actionable recommendations for project success
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold text-gray-700">Recommended Timeline</h4>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Planning Phase:</span>
                    <span className="font-medium">1-2 weeks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Development Phase:</span>
                    <span className="font-medium">{Math.max(1, estimatedDuration - 1)} weeks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Testing & Deployment:</span>
                    <span className="font-medium">1 week</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-700">Next Steps</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 text-green-600" />
                  <span className="text-gray-600">
                    Define detailed project requirements and scope
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Create project timeline and milestones</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 text-green-600" />
                  <span className="text-gray-600">
                    Identify required resources and team members
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 text-green-600" />
                  <span className="text-gray-600">
                    Set up project management and communication tools
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportDisplay;
