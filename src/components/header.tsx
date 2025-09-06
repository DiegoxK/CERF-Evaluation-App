import { SidebarTrigger } from "./ui/sidebar";

interface HeaderProps {
  isViewingEvaluation: boolean;
  taskId: string;
}

export default function Header({ isViewingEvaluation, taskId }: HeaderProps) {
  return (
    <header className="flex w-full items-center gap-4 border-b p-4">
      <SidebarTrigger />
      <h1 className="text-xl font-semibold">
        {isViewingEvaluation ? `Evaluation` : `Task: ${taskId}`}
      </h1>
    </header>
  );
}
