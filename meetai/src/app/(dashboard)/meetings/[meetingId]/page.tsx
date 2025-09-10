import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getQueryClient, trpc } from "@/trpc/sever";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import {
  MeetingIdError,
  MeetingIdLoading,
  MeetingIdView,
} from "@/modules/meetings/ui/meeting-id-view";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { meetingId } = await params;

  // ✅ Make authentication optional for meeting pages
  const nextHeaders = await headers();
  const standardHeaders = new Headers(nextHeaders);

  let session = null;
  try {
    session = await auth.api.getSession({
      headers: standardHeaders,
    });
  } catch (error) {
    console.error("Session retrieval failed:", error);
    // Continue without session - let the component handle unauthorized access
  }

  // ✅ Only redirect if this is a protected meeting
  // You might want to check meeting visibility settings here
  // For now, allowing access without session for public meetings
  
  const queryClient = getQueryClient();
  
  try {
    void queryClient.prefetchQuery(
      trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );
  } catch (error) {
    console.error("Query prefetching failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdLoading />}>
        <ErrorBoundary fallback={<MeetingIdError />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;