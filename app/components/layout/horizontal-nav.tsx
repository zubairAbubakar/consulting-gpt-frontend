'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LightBulbIcon,
  BeakerIcon,
  ScaleIcon,
  DocumentMagnifyingGlassIcon,
  PresentationChartLineIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

const navigationSteps = [
  { name: 'Technology Input', href: '/technology/new', icon: BeakerIcon },
  { name: 'Keywords & Problem', href: '/technology/keywords', icon: LightBulbIcon },
  { name: 'Comparison Axis', href: '/technology/comparison', icon: ScaleIcon },
  { name: 'Patents & Papers', href: '/technology/research', icon: DocumentMagnifyingGlassIcon },
  {
    name: 'PCA & Visualization',
    href: '/technology/visualization',
    icon: PresentationChartLineIcon,
  },
  { name: 'Billable Items', href: '/technology/billing', icon: BanknotesIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function HorizontalNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {' '}
        {/* Align with header content width */}
        <div
          className="-mb-px flex space-x-4 overflow-x-auto sm:space-x-6 lg:space-x-8"
          aria-label="Tabs"
        >
          {' '}
          {/* Added overflow-x-auto for smaller screens */}
          {navigationSteps.map((step) => {
            // More robust active check for nested routes if technology ID is part of the path
            // Example: /technology/[id]/keywords should match /technology/keywords conceptually
            // For now, this handles exact matches and basic startsWith for non-new routes.
            const isActive =
              pathname === step.href ||
              (step.href !== '/technology/new' && pathname?.startsWith(step.href + '/')) || // For /technology/keywords/[id]
              (step.href !== '/technology/new' && pathname === step.href); // For /technology/keywords

            return (
              <Link
                key={step.name} // Use step.name for key if hrefs might not be unique across different contexts later
                href={step.href}
                className={classNames(
                  isActive
                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-300',
                  'group inline-flex items-center whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium' // Increased px to px-3
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <step.icon
                  className={classNames(
                    isActive
                      ? 'text-blue-500 dark:text-blue-400'
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-slate-500 dark:group-hover:text-slate-400',
                    'mr-2 h-5 w-5 flex-shrink-0' // Added flex-shrink-0
                  )}
                  aria-hidden="true"
                />
                {step.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
