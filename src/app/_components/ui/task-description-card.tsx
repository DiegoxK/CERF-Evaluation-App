import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Task } from "@/lib/types";

interface TaskDescriptionCardProps {
  task: Task;
}

export const TaskDescriptionCard = ({ task }: TaskDescriptionCardProps) => {
  const Icon = task.icon;

  return (
    <Card className="mb-6 border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
            <Icon className="text-muted-foreground size-6" />
          </div>
          <span>{task.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {task.description}
        </p>
      </CardContent>
    </Card>
  );
};
