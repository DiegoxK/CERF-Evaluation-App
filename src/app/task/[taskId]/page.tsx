"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppStore } from "@/hooks/store";
import { useParams } from "next/navigation";

// Mock data for now
const evaluations = [
  {
    id: "eval-1",
    taskId: "formal-email",
    content: "This is the detailed content for evaluation 1.",
  },
  {
    id: "eval-2",
    taskId: "describe-vacation",
    content: "This is the detailed content for evaluation 2.",
  },
  {
    id: "eval-3",
    taskId: "describe-vacation",
    content: "This is the detailed content for evaluation 3.",
  },
];

export default function TaskPage() {
  const params = useParams();
  const taskId = params.taskId as string;

  const activeEvaluationId = useAppStore((state) => state.activeEvaluationId);

  const activeEvaluation = evaluations.find((e) => e.id === activeEvaluationId);

  const isViewingEvaluation = activeEvaluation != null;

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-semibold">
          {isViewingEvaluation
            ? `Viewing Evaluation: ${activeEvaluationId}`
            : `Task Workspace: ${taskId}`}
        </h1>
      </header>
      <div className="mt-4 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        {isViewingEvaluation ? (
          <div>
            <h2>Evaluation Details</h2>
            <p>{activeEvaluation.content}</p>
          </div>
        ) : (
          <div>
            <h2>Task Editor for `&quot;`{params.taskId}`&quot;`</h2>
            <p>
              Your text editor and `&quot;`Evaluate`&quot;` button will go here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
