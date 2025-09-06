import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${index < rating ? "fill-primary/50 text-primary" : "text-gray-300 dark:text-gray-600"} `}
        />
      ))}
    </div>
  );
};
