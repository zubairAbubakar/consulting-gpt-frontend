// filepath: /Users/zubair/Documents/repos/consulting-gpt-frontend/app/components/layout/platform-layout.tsx
import { Sidebar } from '@/app/components/layout/sidebar';
import { Header } from '@/app/components/layout/header';

export const PlatformLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={false}
        setCollapsed={() => {}}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleSidebar={() => {}} sidebarCollapsed={false} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
