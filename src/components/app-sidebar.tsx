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
  ChevronDown,
  CornerDownRight,
  PenSquare,
  PlusCircle,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useAppStore } from "@/hooks/store";
import { tasks } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { evaluations, viewEvaluation, startNewTask } = useAppStore();

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
                            onClick={() => viewEvaluation(evaluation.id)}
                            className="cursor-pointer"
                          >
                            <CornerDownRight className="opacity-50" />
                            {evaluation.title}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    <SidebarMenuItem>
                      <Button
                        variant="dashed"
                        onClick={() => startNewTask(task.id)}
                      >
                        <PlusCircle className="size-4" />
                        <span>Start new attempt</span>
                      </Button>
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
