"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";

export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-xl">My Meetings</h2>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <PlusIcon className="h-4 w-4" />
            New Meeting
          </Button>
        </div>

        {/* Placeholder for future filters/search */}
        <div className="flex items-center gap-x-2 p-1">
          {/* TODO: Add filter/search controls */}
        </div>
      </div>
    </>
  );
};
