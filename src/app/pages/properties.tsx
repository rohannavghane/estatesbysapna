import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Grid, List, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { PropertyCard } from '@/app/components/property/property-card';
import { PropertyFilters } from '@/app/components/property/property-filters';
import { useProperties } from '@/app/hooks/useProperties';

export function PropertiesPage() {
  const { properties, loading, error } = useProperties();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'all',
    location: searchParams.get('location') || 'all',
    priceRange: searchParams.get('price') || 'all',
    bedrooms: searchParams.get('bedrooms') || 'all',
    bathrooms: 'all',
    minArea: '',
    maxArea: '',
  });

  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    // Apply filters
    if (filters.type !== 'all') {
      filtered = filtered.filter(p => p.type.toLowerCase() === filters.type);
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(p => 
        p.neighborhood.toLowerCase().replace(/\s+/g, '-') === filters.location
      );
    }

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
      } else {
        filtered = filtered.filter(p => p.price >= min);
      }
    }

    if (filters.bedrooms !== 'all') {
      const beds = parseInt(filters.bedrooms);
      if (filters.bedrooms.includes('+')) {
        filtered = filtered.filter(p => p.bedrooms >= beds);
      } else {
        filtered = filtered.filter(p => p.bedrooms === beds);
      }
    }

    if (filters.bathrooms !== 'all') {
      const baths = parseInt(filters.bathrooms);
      if (filters.bathrooms.includes('+')) {
        filtered = filtered.filter(p => p.bathrooms >= baths);
      } else {
        filtered = filtered.filter(p => p.bathrooms === baths);
      }
    }

    if (filters.minArea) {
      filtered = filtered.filter(p => p.area >= parseInt(filters.minArea));
    }

    if (filters.maxArea) {
      filtered = filtered.filter(p => p.area <= parseInt(filters.maxArea));
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'area-large':
        filtered.sort((a, b) => b.area - a.area);
        break;
      case 'area-small':
        filtered.sort((a, b) => a.area - b.area);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [properties, filters, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[var(--navy)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Properties for Sale
          </h1>
          <p className="text-gray-300">
            {filteredProperties.length} properties available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <PropertyFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {/* Mobile Filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <PropertyFilters filters={filters} setFilters={setFilters} />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* View Mode Toggle */}
                <div className="hidden md:flex items-center gap-1 border border-border rounded-md p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="area-large">Area: Largest First</SelectItem>
                    <SelectItem value="area-small">Area: Smallest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {Object.values(filters).some(v => v && v !== 'all') && (
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || value === 'all') return null;
                  return (
                    <div
                      key={key}
                      className="inline-flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm"
                    >
                      <span>{value}</span>
                      <button
                        onClick={() => setFilters({ ...filters, [key]: key.includes('Area') ? '' : 'all' })}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters({
                    type: 'all',
                    location: 'all',
                    priceRange: 'all',
                    bedrooms: 'all',
                    bathrooms: 'all',
                    minArea: '',
                    maxArea: '',
                  })}
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Properties Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--navy)]" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600">Failed to load properties. Please try again later.</p>
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No properties found matching your criteria</p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    type: 'all',
                    location: 'all',
                    priceRange: 'all',
                    bedrooms: 'all',
                    bathrooms: 'all',
                    minArea: '',
                    maxArea: '',
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
