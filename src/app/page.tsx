"use client";

import Header from "@/components/header";
import { useAppStore } from "@/hooks/store";
import { EvaluationReport } from "./_components/evaluation-report";
import { tasks } from "@/lib/mock-data";
import { TaskView } from "./_components/task-view";
import { WelcomeView } from "./_components/welcome-view";

export default function TaskPage() {
  const { activeView, activeTaskId, activeEvaluationId, evaluations } =
    useAppStore();

  const activeTask = tasks.find((task) => task.id === activeTaskId);
  const activeEvaluation = evaluations.find((e) => e.id === activeEvaluationId);

  const isViewingEvaluation = activeEvaluation != null;

  const RenderContent = () => {
    switch (activeView) {
      case "evaluation-viewer":
        if (!activeEvaluation) return null;
        return (
          <EvaluationReport
            evaluationData={activeEvaluation}
            modelName="Model A"
          />
        );
      case "task-editor":
        if (!activeTask) return null;
        return <TaskView task={activeTask} />;
      case "task-list":
      default:
        return <WelcomeView />;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <Header
        isViewingEvaluation={isViewingEvaluation}
        activeTask={activeTask}
      />
      <main className="container mx-auto flex flex-1 flex-col p-8">
        <RenderContent />
      </main>
    </div>
  );
}
