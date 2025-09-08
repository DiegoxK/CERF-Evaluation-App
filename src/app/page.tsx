"use client";

import Header from "@/components/header";
import { useAppStore } from "@/hooks/store";
import { EvaluationReport } from "./_components/evaluation-report";
import { tasks } from "@/lib/tasks";
import { TaskView } from "./_components/task-view";
import { WelcomeView } from "./_components/welcome-view";

import { useEffect } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { evaluationSchema } from "@/lib/schemas";
import { toast } from "sonner";
import { JsonDebugViewer } from "./_components/ui/json-debug-viewer";

export default function TaskPage() {
  const {
    activeView,
    activeTaskId,
    activeEvaluationId,
    evaluations,
    startEvaluation,
    updateEvaluation,
    saveEvaluations,
  } = useAppStore();

  const { object, submit, error, isLoading } = useObject({
    api: "/api/evaluate",
    schema: evaluationSchema,
    onFinish: () => {
      saveEvaluations();
      toast.success("Evaluation complete!");
    },
    onError: (err) => {
      toast.error("Evaluation failed", { description: err.message });
    },
  });

  useEffect(() => {
    if (isLoading && activeEvaluationId && object) {
      updateEvaluation(activeEvaluationId, object);
    }
  }, [object, activeEvaluationId, updateEvaluation, isLoading]);

  const activeTask = tasks.find((task) => task.id === activeTaskId);
  const activeEvaluation = evaluations.find((e) => e.id === activeEvaluationId);
  const isViewingEvaluation = activeEvaluation != null;

  const handleEvaluate = (userText: string) => {
    if (!activeTask?.description) {
      toast.error("No active task selected or task has no description.");
      return;
    }
    startEvaluation(activeTask.id, userText);
    submit({
      text: userText,
      taskDescription: activeTask.description,
    });
  };

  const RenderContent = () => {
    switch (activeView) {
      case "evaluation-viewer":
        if (!activeEvaluation) return null;

        return (
          <EvaluationReport
            evaluationData={activeEvaluation}
            isLoading={isLoading}
            modelName="Claude 3.5 Sonnet"
          />
        );
      case "task-editor":
        if (!activeTask) return null;
        return <TaskView task={activeTask} onEvaluate={handleEvaluate} />;
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
        {/* <JsonDebugViewer
          object={activeEvaluation}
          title="Debug View: Live Evaluation Object"
        /> */}
        <RenderContent />
      </main>
    </div>
  );
}
