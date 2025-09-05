import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-semibold">Welcome!</h1>
      </header>
      <div className="mt-4 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight">
            Ready to improve your English?
          </h2>
          <p className="text-muted-foreground mt-2">
            Select a task from the sidebar to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
