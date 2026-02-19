import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';

interface PropertyFiltersProps {
  filters: {
    status?: string;
    type: string;
    location: string;
    priceRange: string;
    bedrooms: string;
    bathrooms: string;
    minArea: string;
    maxArea: string;
  };
  setFilters: (filters: any) => void;
}

export function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Listing Status */}
        {'status' in filters && (
          <>
            <div className="space-y-2">
              <Label>Listing Status</Label>
              <Select
                value={filters.status || 'all'}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="newly-launched">Newly Launched</SelectItem>
                  <SelectItem value="off-plan">Off Plan</SelectItem>
                  <SelectItem value="ready">Ready to Move</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
          </>
        )}

        {/* Property Type */}
        <div className="space-y-2">
          <Label>Property Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters({ ...filters, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Select
            value={filters.location}
            onValueChange={(value) => setFilters({ ...filters, location: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
              <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
              <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
              <SelectItem value="business-bay">Business Bay</SelectItem>
              <SelectItem value="jbr">JBR</SelectItem>
              <SelectItem value="arabian-ranches">Arabian Ranches</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Price Range</Label>
          <Select
            value={filters.priceRange}
            onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-2000000">Up to AED 2M</SelectItem>
              <SelectItem value="2000000-5000000">AED 2M - 5M</SelectItem>
              <SelectItem value="5000000-10000000">AED 5M - 10M</SelectItem>
              <SelectItem value="10000000-999999999">AED 10M+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label>Bedrooms</Label>
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">1 Bed</SelectItem>
              <SelectItem value="2">2 Beds</SelectItem>
              <SelectItem value="3">3 Beds</SelectItem>
              <SelectItem value="4">4 Beds</SelectItem>
              <SelectItem value="5">5 Beds</SelectItem>
              <SelectItem value="6+">6+ Beds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Bathrooms */}
        <div className="space-y-2">
          <Label>Bathrooms</Label>
          <Select
            value={filters.bathrooms}
            onValueChange={(value) => setFilters({ ...filters, bathrooms: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">1 Bath</SelectItem>
              <SelectItem value="2">2 Baths</SelectItem>
              <SelectItem value="3">3 Baths</SelectItem>
              <SelectItem value="4">4 Baths</SelectItem>
              <SelectItem value="5+">5+ Baths</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Area */}
        <div className="space-y-2">
          <Label>Area (sqft)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minArea}
              onChange={(e) => setFilters({ ...filters, minArea: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxArea}
              onChange={(e) => setFilters({ ...filters, maxArea: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
