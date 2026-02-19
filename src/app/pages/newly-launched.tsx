import { useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ProjectCard } from '@/app/components/project/project-card';
import { useProjects } from '@/app/hooks/useProjects';

const statusTabs = [
  { value: 'all', label: 'All Projects' },
  { value: 'newly-launched', label: 'Newly Launched' },
  { value: 'under-construction', label: 'Under Construction' },
  { value: 'coming-soon', label: 'Coming Soon' },
];

export function NewlyLaunchedPage() {
  const { projects, loading, error } = useProjects();
  const [activeStatus, setActiveStatus] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeStatus === 'all') return projects;
    return projects.filter(p => p.status === activeStatus);
  }, [projects, activeStatus]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[var(--navy)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            New Launch Projects
          </h1>
          <p className="text-gray-300">
            {loading
              ? 'Loading...'
              : `${filteredProjects.length} ${filteredProjects.length === 1 ? 'project' : 'projects'} available`}
          </p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-border bg-white sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {statusTabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveStatus(tab.value)}
                className={`px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeStatus === tab.value
                    ? 'border-[var(--gold)] text-[var(--navy)] font-semibold'
                    : 'border-transparent text-muted-foreground hover:text-[var(--navy)] hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--navy)]" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600">Failed to load projects. Please try again later.</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4 text-lg">
              No {activeStatus === 'all' ? '' : statusTabs.find(t => t.value === activeStatus)?.label.toLowerCase() + ' '}projects available yet
            </p>
            {activeStatus !== 'all' && (
              <Button variant="outline" onClick={() => setActiveStatus('all')}>
                View All Projects
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
