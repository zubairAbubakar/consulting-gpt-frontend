import * as z from 'zod';

export const TechnologySchema = z.object({
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
      message: 'Number of axis must be at least 3.',
    })
    .max(10, { message: "Number of axis can't exceed 10." }),
});
