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
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquareText,
  Clipboard,
} from "lucide-react";

const HighlightedText = ({
  text,
  feedbackItems,
}: {
  text: string;
  feedbackItems: FeedbackItem[];
}) => {
  if (!text) return null;

  let lastIndex = 0;
  const parts: (string | ReactElement)[] = [];

  const sortedItems = [...(feedbackItems || [])].sort(
    (a, b) => text.indexOf(a.textToHighlight) - text.indexOf(b.textToHighlight),
  );

  sortedItems.forEach((item, i) => {
    if (!item?.textToHighlight) return;

    const startIndex = text.indexOf(item.textToHighlight, lastIndex);
    if (startIndex === -1) return;

    parts.push(text.substring(lastIndex, startIndex));

    parts.push(
      <Popover key={i}>
        <PopoverTrigger asChild>
          <mark className="cursor-pointer rounded bg-yellow-200 px-1 transition-all hover:ring-2 hover:ring-yellow-400 dark:hover:ring-yellow-500">
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
  const hasFeedbackItems = (evaluation?.feedbackItems?.length ?? 0) > 0;

  return (
    <div className="animate-fade-in space-y-8">
      <div className="space-y-4">
        <div className="flex justify-center">
          {/* TODO: Provide a default value or handle undefined */}
          <CefrBadge
            level={evaluation?.cefrLevel ?? "..."}
            isLoading={isLoading}
          />
        </div>
        {(isLoading || evaluation?.positiveHighlight) && (
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-green-800 dark:text-green-300">
                <CheckCircle2 size={20} />
                <span>What You Did Well</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 dark:text-green-300/90">
                {evaluation?.positiveHighlight ?? (
                  <Skeleton className="h-5 w-3/4" />
                )}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clipboard size={20} /> Your Text
            </CardTitle>
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
            <CardTitle className="flex items-center gap-2">
              <MessageSquareText size={20} /> Overall Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground text-sm">
              {evaluation?.briefSummary ?? <Skeleton className="h-5 w-full" />}
            </p>
            <p className="pt-2">
              {evaluation?.overallFeedback ?? (
                <Skeleton className="h-24 w-full" />
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- CATEGORY BREAKDOWN --- */}
      <div>
        <h3 className="mb-4 text-xl font-semibold">Category Breakdown</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {evaluation?.categoryRatings &&
          Object.keys(evaluation.categoryRatings).length > 0 ? (
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
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </>
          )}
        </div>
      </div>

      {(isLoading || hasFeedbackItems) && (
        <div>
          <h3 className="mb-4 text-xl font-semibold">Detailed Suggestions</h3>
          <div className="space-y-4">
            {hasFeedbackItems ? (
              evaluation.feedbackItems!.map((item, index) =>
                item ? (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex flex-wrap items-center gap-3 text-base">
                        <Badge variant="secondary">{item.feedbackType}</Badge>
                        <span className="text-muted-foreground line-through">
                          {item.textToHighlight}
                        </span>
                        <ArrowRight size={16} className="mx-1 shrink-0" />
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {item.suggestion}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {item.explanation}
                      </p>
                    </CardContent>
                  </Card>
                ) : null,
              )
            ) : (
              <>
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
