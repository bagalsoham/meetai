"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }) // 👈 FIXED
  );

  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => { }}
        onRemove={() => { }}
      />
      <div className="bg-white rounded-lg border p-5 flex flex-col gap-y-6">
        {/* Top row: Avatar + Name + Meeting count */}
        <div className="flex items-center gap-x-3">
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={data.name}
            className="size-10"
          />
          <h2 className="text-2xl font-medium">{data.name}</h2>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4"
          >
            <VideoIcon className="text-blue-700" />
            {data.meetingCount}{" "}
            {data.meetingCount === 1 ? "Meeting" : "Meetings"}
          </Badge>
        </div>

        {/* Instructions section */}
        <div className="flex flex-col gap-y-2">
          <p className="text-lg font-medium">Instructions</p>
          <p className="text-neutral-800">{data.instructions}</p>
        </div>
      </div>


    </div>
  );
};
export const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take time"
    />
  )
}

export const AgentsIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading individual Agents"
      description="Something went wrong"
    />
  )
}
