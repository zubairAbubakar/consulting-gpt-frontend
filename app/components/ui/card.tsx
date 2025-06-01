import * as React from 'react';

import { cn } from '@/app/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export { Card };

// Let's skip dasboard for now, the next one should be:

// Technology Input Form
// - Clean form with generous input areas
// - Rich text editor for abstract
// - Interactive problem statement builder

// For the forms may be with can use react forms with zod validation, and lets keep it simple
