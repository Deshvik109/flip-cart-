
import { useEffect, useState } from "react";
import { Banner } from "@/types";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface BannerSliderProps {
  banners: Banner[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate banners
  useEffect(() => {
    if (banners.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  if (banners.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-flipkart-blue mb-6">
      <div className="relative h-[180px] md:h-[320px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Link to={banner.link}>
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {banner.title}
                </h2>
                {banner.description && (
                  <p className="text-sm md:text-lg text-white/90">
                    {banner.description}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <Button
            onClick={goToPrev}
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center z-20 gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-4"
                    : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default BannerSlider;
