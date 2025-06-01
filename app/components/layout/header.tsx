'use client';

import { useState } from 'react';
import { BellIcon, Bars3Icon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Menu, MenuItem, MenuButton, MenuItems } from '@headlessui/react';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export function Header({ toggleSidebar, sidebarCollapsed }: HeaderProps) {
  const [currentProject, setCurrentProject] = useState({
    name: 'Hip Replacement Dissolver',
    id: 'proj-123',
  });

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-12 items-center justify-between">
        <div className="flex items-center gap-4">
          {sidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          )}

          {/* Project selector dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900">
              <span className="mr-1 font-medium">{currentProject.name}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </MenuButton>

            <MenuItems className="absolute left-0 z-10 mt-1 w-56 origin-top-left rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none dark:border-slate-700 dark:bg-slate-900">
              <div className="py-1">
                {/* Updated MenuItem to use new API */}
                <MenuItem
                  as="button"
                  className="ui-active:bg-gray-100 dark:ui-active:bg-slate-800 flex w-full items-center px-4 py-2 text-left text-sm"
                >
                  Hip Replacement Dissolver
                </MenuItem>
                <MenuItem
                  as="button"
                  className="ui-active:bg-gray-100 dark:ui-active:bg-slate-800 flex w-full items-center px-4 py-2 text-left text-sm"
                >
                  New Project...
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>

          {/* Project stage indicator */}
          <div className="hidden items-center space-x-4 md:flex">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500 dark:text-slate-400">Setup</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500 dark:text-slate-400">Market Analysis</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-500 dark:text-slate-400">Medical Assessment</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-slate-700"></div>
              <span className="text-xs text-gray-500 dark:text-slate-400">Financial Analysis</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <BellIcon className="h-6 w-6" />
          </button>
          <button className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <UserCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
