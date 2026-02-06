import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>
          404
        </h1>
        <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-[var(--navy)] hover:bg-[var(--navy)]/90">
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
