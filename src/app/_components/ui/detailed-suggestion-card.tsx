import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type DeepPartial, type FeedbackItem } from "@/lib/types";
import { ArrowRight } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { FeedbackTypeBadge } from "./feedback-type-badge";

interface DetailedSuggestionCardProps {
  item: DeepPartial<FeedbackItem>;
}

export const DetailedSuggestionCard = ({
  item,
}: DetailedSuggestionCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-3 text-base">
          <FeedbackTypeBadge type={item.feedbackType ?? "..."} />
          <span className="text-muted-foreground line-through">
            {item.textToHighlight ?? <Skeleton className="h-5 w-20" />}
          </span>
          <ArrowRight size={16} className="mx-1 shrink-0" />
          <span className="font-semibold text-green-600 dark:text-green-400">
            {item.suggestion ?? <Skeleton className="h-5 w-20" />}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-sm">
          {item.explanation ?? <Skeleton className="h-10 w-full" />}
        </div>
      </CardContent>
    </Card>
  );
};
