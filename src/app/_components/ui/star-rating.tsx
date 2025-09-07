import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const getColorForRating = (rating: number): string => {
  if (rating <= 2) {
    return "fill-red-500/50 text-red-500";
  }
  if (rating === 3) {
    return "fill-yellow-500/50 text-yellow-500";
  }
  return "fill-green-500/50 text-green-500";
};

export const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-5 w-5 transition-colors",
            index < Math.round(rating)
              ? getColorForRating(rating)
              : "text-gray-300 dark:text-gray-600",
          )}
        />
      ))}
    </div>
  );
};
