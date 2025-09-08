import { AgentIdView, AgentsIdViewError, AgentsIdViewLoading } from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/sever"; // 👈 check spelling: should be "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

interface Props {
  params: { agentId: string }; // 👈 make sure folder is [agentId]
}

const Page = async ({ params }: Props) => {
  const { agentId } = params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsIdViewLoading />}>
        <ErrorBoundary fallback={<AgentsIdViewError />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
