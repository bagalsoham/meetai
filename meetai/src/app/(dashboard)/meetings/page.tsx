import { auth } from "@/lib/auth";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { MeetingsView, MeetingsViewError, MeetingsViewLoading } from "@/modules/meetings/ui/views/meetings-view";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

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