'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LightBulbIcon, // Added for Overview
  BeakerIcon,
  ScaleIcon,
  DocumentMagnifyingGlassIcon,
  NewspaperIcon, // Changed for Papers
  PresentationChartLineIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

// Configuration for each navigation item
const navConfig = [
  {
    name: 'Technology Form',
    id: 'new-form', // Unique ID for key
    icon: BeakerIcon,
    pageHref: '/', // This is a direct page link
  },
  {
    name: 'Overview',
    id: 'overview',
    icon: LightBulbIcon,
    sectionId: 'overview', // Corresponds to <div id="overview"> on the technology page
  },
  {
    name: 'Comparison Axis',
    id: 'comparison-axes',
    icon: ScaleIcon,
    sectionId: 'comparison-axes',
    originalPageHref: '/technology/comparison', // Fallback if not on a specific technology page
  },
  {
    name: 'Patents',
    id: 'patents',
    icon: DocumentMagnifyingGlassIcon,
    sectionId: 'patents',
    originalPageHref: '/technology/research',
  },
  {
    name: 'Papers',
    id: 'papers',
    icon: NewspaperIcon, // Using a different icon for papers
    sectionId: 'papers',
    originalPageHref: '/technology/research', // Assuming same original base path
  },
  {
    name: 'PCA & Visualization',
    id: 'visualization',
    icon: PresentationChartLineIcon,
    sectionId: 'visualization',
    originalPageHref: '/technology/visualization',
  },
  {
    name: 'Billable Items',
    id: 'billing',
    icon: BanknotesIcon,
    sectionId: 'billing',
    originalPageHref: '/technology/billing',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function HorizontalNav() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    // Function to update hash state
    const updateHash = () => setCurrentHash(window.location.hash);

    // Set initial hash
    updateHash();

    // Listen for hash changes
    window.addEventListener('hashchange', updateHash);

    // Clean up listener
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  const pathSegments = pathname.split('/').filter(Boolean);
  const isTechnologyPage =
    pathSegments[0] === 'technology' && pathSegments.length > 1 && !isNaN(Number(pathSegments[1])); // Check if [technologyId] is a number
  const technologyId = isTechnologyPage ? pathSegments[1] : null;

  const navigationSteps = navConfig.map((item) => {
    let href = '#';
    let isActive = false;

    if (isTechnologyPage && technologyId && item.sectionId) {
      // On a technology page, link to the section
      href = `/technology/${technologyId}#${item.sectionId}`;
      isActive = currentHash === `#${item.sectionId}`;
      // Special case: if no hash, the 'Overview' section is active on the base technology page
      if (
        item.sectionId === 'overview' &&
        (currentHash === '' || currentHash === '#') &&
        pathname === `/technology/${technologyId}`
      ) {
        isActive = true;
      }
    } else if (item.pageHref) {
      // Direct page link (e.g., New Technology Form)
      href = item.pageHref;
      isActive = pathname === item.pageHref;
    } else if (item.originalPageHref) {
      // Fallback to original page link if not on a specific technology page
      // or if the item is not primarily a section of the current view
      href = item.originalPageHref;
      isActive = pathname === item.originalPageHref;
    }

    return {
      ...item, // Includes name, icon, id
      href,
      isActive,
    };
  });

  return (
    <nav className="border-b border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="-mb-px flex space-x-4 overflow-x-auto sm:space-x-6 lg:space-x-8"
          aria-label="Tabs"
        >
          {navigationSteps.map((step) => (
            <Link
              key={step.id} // Use unique id for key
              href={step.href}
              className={classNames(
                step.isActive
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-300',
                'group inline-flex items-center whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium'
              )}
              aria-current={step.isActive ? 'page' : undefined}
            >
              <step.icon
                className={classNames(
                  step.isActive
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-400 group-hover:text-gray-500 dark:text-slate-500 dark:group-hover:text-slate-400',
                  'mr-2 h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
              {step.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
