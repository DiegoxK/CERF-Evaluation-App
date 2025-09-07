import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactElement } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StarRating } from "./ui/star-rating";
import type { Evaluation, FeedbackItem } from "@/lib/types";
import { CefrBadge } from "./ui/cefr-badge";
import { Skeleton } from "@/components/ui/skeleton";

const HighlightedText = ({
  text,
  feedbackItems,
}: {
  text: string;
  feedbackItems: FeedbackItem[];
}) => {
  let lastIndex = 0;
  const parts: (string | ReactElement)[] = [];

  const sortedItems = [...feedbackItems].sort(
    (a, b) => text.indexOf(a.textToHighlight) - text.indexOf(b.textToHighlight),
  );

  sortedItems.forEach((item, i) => {
    const startIndex = text.indexOf(item.textToHighlight, lastIndex);
    if (startIndex === -1) return;

    parts.push(text.substring(lastIndex, startIndex));

    parts.push(
      <Popover key={i}>
        <PopoverTrigger asChild>
          <mark className="cursor-pointer rounded bg-yellow-200 px-1 transition-all hover:ring-2 hover:ring-yellow-400">
            {item.textToHighlight}
          </mark>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Suggestion</h4>
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                {item.suggestion}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Explanation</h4>
              <p className="text-muted-foreground text-sm">
                {item.explanation}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>,
    );
    lastIndex = startIndex + item.textToHighlight.length;
  });

  parts.push(text.substring(lastIndex));

  return <p className="text-lg leading-relaxed whitespace-pre-wrap">{parts}</p>;
};

export const EvaluationReport = ({
  evaluationData,
  modelName,
  isLoading = false,
}: {
  evaluationData: Evaluation;
  modelName: string;
  isLoading?: boolean;
}) => {
  const evaluation = evaluationData.evaluation;

  return (
    <div className="space-y-6">
      <div className="my-4 flex justify-center">
        {/* TODO: Provide a default value or handle undefined */}
        <CefrBadge level={evaluation?.cefrLevel ?? "..."} />
      </div>
      <h3 className="text-xl font-semibold">CERF Evaluation Report</h3>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input: {modelName}</CardTitle>
          </CardHeader>
          <CardContent>
            <HighlightedText
              text={evaluationData.userText}
              feedbackItems={
                (evaluation?.feedbackItems?.filter(
                  Boolean,
                ) as FeedbackItem[]) ?? []
              }
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overall Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {evaluation?.overallFeedback ?? (
                <Skeleton className="h-24 w-full" />
              )}
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <h3 className="mb-4 text-xl font-semibold">Category Breakdown</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {evaluation?.categoryRatings ? (
            Object.entries(evaluation.categoryRatings).map(
              ([category, details]) =>
                details && (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span className="capitalize">{category}</span>

                        <StarRating rating={details.rating ?? 0} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {details.feedback}
                      </p>
                    </CardContent>
                  </Card>
                ),
            )
          ) : (
            <>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
