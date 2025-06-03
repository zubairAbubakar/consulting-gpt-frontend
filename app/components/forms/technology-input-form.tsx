'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { number, z } from 'zod';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  PaperAirplaneIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'; // Using outline icons for consistency
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Mail, User } from 'lucide-react';
import { FormData } from '@/app/page';

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Technology name must be at least 3 characters.',
    })
    .max(100, { message: "Name can't exceed 100 characters." }),
  abstract: z
    .string()
    .min(50, {
      // Increased min length for better quality
      message: 'Abstract must be at least 50 characters.',
    })
    .max(2000, { message: "Abstract can't exceed 2000 characters." }),
  number_of_axis: z
    .string()
    .min(1, {
      // Increased min length
      message: 'Number of axis must be at least 3.',
    })
    .max(10, { message: "Number of axis can't exceed 10." }),
});

interface FormComponentProps {
  onSubmit: (data: FormData) => void;
}

const TechnologyInputForm = ({ onSubmit }: FormComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      abstract: '',
      number_of_axis: '',
    },
  });

  async function handleSubmit(data: FormData) {
    onSubmit(data);
    // setIsLoading(true);
    // const loadingToastId = toast.loading('Processing your technology submission...');

    // try {
    //   // Simulate API delay for UX testing
    //   // await new Promise(resolve => setTimeout(resolve, 2000));
    //   const response = await axios.post('http://localhost:8000/api/v1/technologies', values);

    //   toast.success(`Technology "${values.name}" ready for next steps!`, {
    //     id: loadingToastId,
    //     description: `ID: ${response.data.id}. We'll guide you through the analysis.`,
    //     duration: 5000,
    //     action: {
    //       label: 'Next: Keywords',
    //       onClick: () => router.push(`/technology/${response.data.id}/keywords`), // Example navigation
    //     },
    //   });
    //   form.reset();
    //   // Navigate to the next step in the horizontal nav, e.g., keywords, using the new ID
    //   // router.push(`/technology/${response.data.id}/keywords`); // Or whatever the next step's path is
    // } catch (error) {
    //   let errorMessage = 'An unexpected error occurred. Please review your input and try again.';
    //   if (axios.isAxiosError(error) && error.response) {
    //     errorMessage = `Submission Error: ${error.response.data.detail || 'Please check the details and try again.'}`;
    //   } else if (error instanceof Error) {
    //     errorMessage = error.message;
    //   }
    //   toast.error('Oops! Something went wrong.', {
    //     id: loadingToastId,
    //     description: errorMessage,
    //     duration: 7000,
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  }

  // Helper for character count
  const CharacterCount = ({
    currentLength,
    maxLength,
  }: {
    currentLength: number;
    maxLength: number;
  }) => (
    <div
      className={`text-xs ${currentLength > maxLength ? 'text-red-500' : 'text-gray-500 dark:text-slate-400'}`}
    >
      {currentLength}/{maxLength}
    </div>
  );

  return (
    <Card className="mx-auto w-full max-w-2xl border-0 bg-white/80 shadow-xl backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Technology Information Form
        </CardTitle>
        <CardDescription className="text-gray-600">
          Please provide your technology information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                    <User className="h-4 w-4" />
                    Technology Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="border-gray-300 transition-colors focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number_of_axis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                    <Mail className="h-4 w-4" />
                    Number of Axis
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter the number of axis (1-10)"
                      {...field}
                      className="border-gray-300 transition-colors focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                    <Briefcase className="h-4 w-4" />
                    Technology Abstract
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your techonogy in detail..."
                      className="min-h-[120px] resize-none border-gray-300 transition-colors focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full transform bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
              size="lg"
            >
              Generate Report
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TechnologyInputForm;
