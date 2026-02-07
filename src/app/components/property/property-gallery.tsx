import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Handle case where images is null, undefined, or empty
  const validImages = images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-2 h-[500px]">
          {/* Main Image */}
          <div
            className="col-span-4 md:col-span-3 relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          >
            <ImageWithFallback
              src={validImages[0]}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Thumbnail Grid */}
          <div className="hidden md:grid grid-rows-2 gap-2">
            {validImages.slice(1, 3).map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => {
                  setSelectedImage(index + 1);
                  setIsLightboxOpen(true);
                }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${title} ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
            {validImages.length > 3 && (
              <div
                className="relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              >
                <ImageWithFallback
                  src={validImages[3]}
                  alt={`${title} 4`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    +{validImages.length - 3} more
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl h-[90vh] p-0">
          <div className="relative h-full flex items-center justify-center bg-black">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
              onClick={prevImage}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <img
              src={validImages[selectedImage]}
              alt={`${title} ${selectedImage + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
              onClick={nextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {selectedImage + 1} / {validImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
