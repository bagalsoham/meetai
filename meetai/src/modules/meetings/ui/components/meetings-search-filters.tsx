import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useMeetingsFilter } from "@/app/(dashboard)/meetings/hooks/use-meetings-flters";
export const MeetingsSearchFilter =() =>{
    const [filters, setFilters] =useMeetingsFilter();

    return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[200px] pl-8"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
    </div>
  )
}