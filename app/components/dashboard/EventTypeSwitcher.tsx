"use client";

import { updateEventTypeStatusAction } from "@/app/actions";
import { Switch } from "@/components/ui/switch";
import React, { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";

export function MenuActiveSwitcher({ initialChecked, eventTypeId }: { eventTypeId: string; initialChecked: boolean }) {
  
  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(updateEventTypeStatusAction, undefined);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      defaultChecked={initialChecked}
      disabled={isPending}
      onCheckedChange={(isChecked) => {
        // Start transition cames from React 18
        startTransition(() => {
          // Action is a function that comes from useActionState
          action({
            isChecked: isChecked,
            eventTypeId,
          });
        });
      }}
    />
  );
}
