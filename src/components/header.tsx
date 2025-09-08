import { SidebarTrigger } from "./ui/sidebar";
import type { Task } from "@/lib/types";
import { DeveloperSettings } from "@/app/_components/ui/settings";

interface HeaderProps {
  isViewingEvaluation: boolean;
  activeTask?: Task;
}

export default function Header({
  isViewingEvaluation,
  activeTask,
}: HeaderProps) {
  return (
    <header className="bg-background/20 sticky top-0 z-50 flex w-full items-center justify-between border-b p-3 backdrop-blur-md">
      <div className="flex gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">
          {isViewingEvaluation
            ? "Evaluation Report"
            : activeTask
              ? `Editing Task: ${activeTask.title}`
              : "Welcome"}
        </h1>
      </div>
      <DeveloperSettings />
    </header>
  );
}
