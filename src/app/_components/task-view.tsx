"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Task } from "@/lib/types";
import { useState } from "react";
import { TaskDescriptionCard } from "./ui/task-description-card";

interface TaskViewProps {
  task: Task;
  onEvaluate: (text: string) => void;
}

export const TaskView = ({ task, onEvaluate }: TaskViewProps) => {
  const [textValue, setTextValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textValue.trim()) {
      onEvaluate(textValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <TaskDescriptionCard task={task} />

      <div className="flex flex-1 flex-col rounded-lg border shadow-sm">
        <Textarea
          placeholder="Start writing your response here..."
          className="h-full w-full flex-1 resize-none border-none focus-visible:ring-0"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={!textValue.trim()}>
          Evaluate Text
        </Button>
      </div>
    </form>
  );
};
