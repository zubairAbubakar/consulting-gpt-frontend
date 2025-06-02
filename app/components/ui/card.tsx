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
