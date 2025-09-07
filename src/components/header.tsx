import { useAppStore } from "@/hooks/store";
import { SidebarTrigger } from "./ui/sidebar";
import type { Task } from "@/lib/types";

interface HeaderProps {
  isViewingEvaluation: boolean;
  activeTask?: Task;
}

export default function Header({
  isViewingEvaluation,
  activeTask,
}: HeaderProps) {
  return (
    <header className="flex w-full items-center gap-4 border-b p-4">
      <SidebarTrigger />
      <h1 className="text-xl font-semibold">
        {isViewingEvaluation
          ? "Evaluation Report"
          : activeTask
            ? `Editing Task: ${activeTask.title}`
            : "Welcome"}
      </h1>
    </header>
  );
}
