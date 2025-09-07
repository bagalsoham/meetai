"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns, Payment } from "../components/columns";
import { DataTable } from "../components/data-table";
import EmptyState from "@/components/empty-state";
import { useAgentsFilter } from "@/app/(dashboard)/agents/hooks/use-agents-flters";
import { DataPagination } from "../components/data-pagination";

export const AgentsView = () => {
  const [filters,setFilters] =useAgentsFilter();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }));
  const mockData: Payment[] =[
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} />
      <DataPagination
      page={filters.page}
      totalPages={data.totalPages}
      onPageChange={(page)=> setFilters({page})}
      />
      {
        data.items.length ===0 &&(
          <EmptyState
            title="Create your first agent"
            description =" Create an agent to join a meetings"
          />
        )
      }
    </div>
  );
};


export const AgentsViewLoading =()=>{
    return (
        <LoadingState
        title="Loading Agents"
        description="This may take time"
        />
    )
}

export const AgentsViewError =()=>{
    return (
        <ErrorState
        title="Error Loading Agents"
        description="Something went wrong"
        />
    )
}