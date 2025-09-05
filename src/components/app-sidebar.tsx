"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookText,
  ChevronDown,
  CornerDownRight,
  Mail,
  MessageSquareText,
  PenSquare,
  PlusCircle,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Link from "next/link";
import { useAppStore } from "@/hooks/store";

const tasks = [
  { id: "formal-email", title: "Write a formal email", icon: Mail },
  {
    id: "describe-vacation",
    title: "Describe your last vacation",
    icon: BookText,
  },
  {
    id: "start-conversation",
    title: "Start a conversation",
    icon: MessageSquareText,
  },
];

const evaluations = [
  {
    id: "eval-1",
    taskId: "formal-email",
    title: "Attempt 1 - B1",
    modelUsed: "Model A",
  },
  {
    id: "eval-2",
    taskId: "describe-vacation",
    title: "Attempt 1 - B2",
    modelUsed: "Model B",
  },
  {
    id: "eval-3",
    taskId: "describe-vacation",
    title: "Attempt 2 - C1",
    modelUsed: "Model A",
  },
];

export function AppSidebar() {
  const setActiveEvaluationId = useAppStore(
    (state) => state.setActiveEvaluationId,
  );

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="text-primary flex items-center gap-2 p-2">
          <PenSquare className="size-6" />
          <h1 className="text-lg font-semibold">CEFR Writer</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {tasks.map((task) => (
          <Collapsible key={task.id} className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="w-full cursor-pointer">
                  <div className="flex items-center gap-2">
                    <task.icon className="size-4" />
                    <span>{task.title}</span>
                  </div>
                  <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent className="mt-1">
                  <SidebarMenu>
                    {evaluations
                      .filter((evaluation) => evaluation.taskId === task.id)
                      .map((evaluation) => (
                        <SidebarMenuItem key={evaluation.id}>
                          <SidebarMenuButton
                            onClick={() => setActiveEvaluationId(evaluation.id)}
                            className="cursor-pointer"
                          >
                            <CornerDownRight className="opacity-50" />
                            {evaluation.title}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    <SidebarMenuItem>
                      <Link
                        href={`/task/${task.id}`}
                        className="text-muted-foreground hover:text-foreground hover:bg-primary/15 mt-1 flex h-full w-full items-center gap-2 rounded-md border border-dashed p-2 text-sm"
                        onClick={() => setActiveEvaluationId(null)}
                      >
                        <PlusCircle className="size-4" />
                        <span>Start new attempt</span>
                      </Link>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
