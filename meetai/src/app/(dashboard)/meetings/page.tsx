import { MeetingsView, MeetingsViewError, MeetingsViewLoading } from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/sever";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(
        trpc.meetings.getMany.queryOptions({})
    );
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsViewLoading/>}>
                <ErrorBoundary fallback={<MeetingsViewError/>}>
                    <MeetingsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
}

export default Page;