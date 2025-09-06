import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TaskDescription() {
  return (
    <div>
      <form className="flex h-full flex-1 flex-col">
        <div className="flex-1 rounded-lg border shadow-sm">
          <Textarea
            placeholder="Start writing your text here..."
            className="h-full w-full resize-none border-none text-base focus-visible:ring-0"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit">Evaluate Text</Button>
        </div>
      </form>
    </div>
  );
}
