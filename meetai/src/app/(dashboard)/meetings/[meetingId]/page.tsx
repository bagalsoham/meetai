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
  }>; // ✅ Updated: params is now a Promise in Next.js 15
}

const Page = async ({ params }: Props) => {
  // ✅ Fixed: Await the params object before destructuring
  const { meetingId } = await params;

  // 🔑 Convert Next.js headers to a standard Headers object
  const nextHeaders = await headers();
  const standardHeaders = new Headers(nextHeaders);

  const session = await auth.api.getSession({
    headers: standardHeaders,
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

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