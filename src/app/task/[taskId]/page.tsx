"use client";

import Header from "@/components/header";
import { useAppStore } from "@/hooks/store";
import { useParams } from "next/navigation";
import { availableModels, mockEvaluationData } from "./_components/mock";
import { EvaluationReport } from "./_components/evaluation-report";
import TaskDescription from "./_components/task-description";
import { Badge } from "@/components/ui/badge";
import { CefrBadge } from "./_components/cefr-badge";

export default function TaskPage() {
  const params = useParams();
  const taskId = params.taskId as string;

  const activeEvaluationId = useAppStore((state) => state.activeEvaluationId);

  const activeEvaluation = [mockEvaluationData].find(
    (e) => e.id === activeEvaluationId,
  );

  const isViewingEvaluation = activeEvaluation != null;

  return (
    <div className="flex h-full flex-col">
      <Header isViewingEvaluation={isViewingEvaluation} taskId={taskId} />
      <main className="container mx-auto flex flex-1 flex-col p-8">
        <div className="my-4 flex justify-center">
          <CefrBadge level={mockEvaluationData.evaluation.cefrLevel} />
        </div>

        {activeEvaluation ? (
          <EvaluationReport
            evaluationData={activeEvaluation ?? mockEvaluationData}
            modelName={availableModels[0]?.name}
          />
        ) : (
          <TaskDescription />
        )}
      </main>
    </div>
  );
}
