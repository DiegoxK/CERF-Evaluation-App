"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/hooks/app-store";
import { type Evaluation } from "@/lib/types";
import { CornerDownRight, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EvaluationMenuItemProps {
  evaluation: Evaluation;
}

export const EvaluationMenuItem = ({ evaluation }: EvaluationMenuItemProps) => {
  const {
    viewEvaluation,
    renameEvaluation,
    deleteEvaluation,
    activeEvaluationId,
  } = useAppStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(evaluation.title);

  const handleRename = () => {
    if (editText.trim() && editText.trim() !== evaluation.title) {
      renameEvaluation(evaluation.id, editText.trim());
      toast.success("Evaluation renamed.");
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteEvaluation(evaluation.id);
    toast.success("Evaluation deleted.");
  };

  const isActive = activeEvaluationId === evaluation.id;

  return (
    <div
      className={cn(
        "group flex items-center justify-between rounded-md transition-colors",
        isActive ? "bg-muted" : "hover:bg-muted/50",
      )}
    >
      {isEditing ? (
        <Input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRename();
            if (e.key === "Escape") setIsEditing(false);
          }}
          autoFocus
          className="h-8 flex-1 bg-transparent focus-visible:ring-1"
        />
      ) : (
        <SidebarMenuButton
          onClick={() => viewEvaluation(evaluation.id)}
          className={`flex-1 cursor-pointer justify-start transition-all ${isActive ? "" : "text-muted-foreground"}`}
        >
          <CornerDownRight className="mr-2 opacity-50" size={16} />
          <span className="truncate">{evaluation.title}</span>
        </SidebarMenuButton>
      )}

      <AlertDialog>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-0 size-8 shrink-0 ${
                isEditing ? "invisible" : "visible"
              }`}
            >
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Rename</span>
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="group focus:bg-primary/10 text-red-400 focus:text-red-400">
                <Trash2 className="group:focus:text-red-400 mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the evaluation titled &quot;
              <span className="font-semibold">{evaluation.title}</span>&quot;.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
