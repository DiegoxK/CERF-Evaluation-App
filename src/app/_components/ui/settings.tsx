"use client";

import { useState, useEffect } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSettingsStore } from "@/hooks/settings-store";
import { toast } from "sonner";

export function DeveloperSettings() {
  const { apiKey, setApiKey } = useSettingsStore();
  const [localApiKey, setLocalApiKey] = useState(apiKey);

  useEffect(() => {
    setLocalApiKey(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    setApiKey(localApiKey);
    toast.success("Developer Key Saved!", {
      description: "You now have unlimited requests.",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Developer Settings">
          <KeyRound className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Developer Settings</h4>
            <p className="text-muted-foreground text-sm">
              Enter your internal API secret to bypass rate limits.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="api-key">API Secret Key</Label>
            <Input
              id="api-key"
              type="password"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              placeholder="INTERNAL_API_SECRET"
            />
          </div>
          <Button onClick={handleSave}>Save Key</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
