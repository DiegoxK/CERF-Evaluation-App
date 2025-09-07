import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactElement } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StarRating } from "./ui/star-rating";
import type { Evaluation, FeedbackItem } from "@/lib/types";
import { CefrBadge } from "./ui/cefr-badge";

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
}: {
  evaluationData: Evaluation;
  modelName: string;
}) => (
  <div className="space-y-6">
    <div className="my-4 flex justify-center">
      <CefrBadge level={evaluationData?.evaluation.cefrLevel} />
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
            feedbackItems={evaluationData.evaluation.feedbackItems}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Overall Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{evaluationData.evaluation.overallFeedback}</p>
        </CardContent>
      </Card>
    </div>
    <div>
      <h3 className="mb-4 text-xl font-semibold">Category Breakdown</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Object.entries(evaluationData.evaluation.categoryRatings).map(
          ([category, { rating, feedback }]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="capitalize">{category}</span>
                  <StarRating rating={rating} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feedback}</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </div>
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Detailed Suggestions</h3>
      {evaluationData.evaluation.feedbackItems.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Badge>{item.feedbackType}</Badge>
              <span className="text-muted-foreground line-through">
                {item.textToHighlight}
              </span>
              <span>→</span>
              <span className="text-green-600 dark:text-green-400">
                {item.suggestion}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.explanation}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
