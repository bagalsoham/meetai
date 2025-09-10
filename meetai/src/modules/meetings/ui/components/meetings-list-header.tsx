"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filters";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agents-id-filter";
import { useMeetingsFilter } from "@/app/(dashboard)/meetings/hooks/use-meetings-flters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isAnyFilterModified = !!filters.status || !!filters.search || !!filters.agentId;
  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: 1,
    })
  }
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
        <ScrollArea>

          {/* Placeholder for future filters/search */}
          <div className="flex items-center gap-x-2 p-1 w-3xs">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {
              isAnyFilterModified && (
                <Button variant="outline" onClick={onClearFilters}>
                  <XCircleIcon className="size-4" />
                  Clear
                </Button>
              )
            }

          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>
    </>
  );
};
