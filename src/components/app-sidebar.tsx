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
  CornerDownLeft,
  CornerDownRight,
  Mail,
  MessageSquareText,
  PenSquare,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const tasks = [
  { id: "task-1", title: "Write a formal email", icon: Mail },
  { id: "task-2", title: "Describe your last vacation", icon: BookText },
  { id: "task-3", title: "Start a conversation", icon: MessageSquareText },
];

const evaluations = [
  {
    id: "eval-1",
    taskId: "task-1",
    title: "Attempt 1 - B1",
    modelUsed: "Model A",
  },
  {
    id: "eval-2",
    taskId: "task-2",
    title: "Attempt 1 - B2",
    modelUsed: "Model B",
  },
  {
    id: "eval-3",
    taskId: "task-2",
    title: "Attempt 2 - C1",
    modelUsed: "Model A",
  },
];

export function AppSidebar() {
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
                <SidebarGroupContent>
                  <SidebarMenu>
                    {evaluations
                      .filter((evaluation) => evaluation.taskId === task.id)
                      .map((evaluation) => (
                        <SidebarMenuItem key={evaluation.id}>
                          <SidebarMenuButton className="cursor-pointer">
                            <CornerDownRight className="opacity-50" />
                            {evaluation.title}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
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
