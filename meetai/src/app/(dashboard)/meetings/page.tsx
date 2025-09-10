import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/meetings/params";
import { SearchParams } from "nuqs/server";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { MeetingsView, MeetingsViewError, MeetingsViewLoading } from "@/modules/meetings/ui/views/meetings-view";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getQueryClient } from "@/trpc/sever";
import { trpc } from "@/trpc/sever";


interface Props {
  searchParams: SearchParams;
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters
    })
  )

  return (
    <>
      <MeetingsListHeader />
      <ErrorBoundary fallback={<MeetingsViewError />}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <MeetingsView />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Page;