"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MeetingGetMany } from "../../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { ClockFading, ClockFadingIcon, CornerDownRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import humanizeDuration from "humanize-duration"

import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
}

const statusColorMap = {
  upcoming: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  active: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  completed: "bg-gray-500/20 text-gray-800 border-gray-800/5",
  processing: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  cancelled: "bg-gray-700/20 text-gray-900 border-gray-900/5",
}

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 2,
    round: true,
    units: ["h", "m", "s"],
  })
}

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        {/* Meeting name */}
        <span className="font-semibold capitalize">
          {row.original.name}
        </span>

        {/* Agent + Avatar + Date */}
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
              {row.original.agent.name}
            </span>
          </div>

          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.agent.name}
            className="size-4"
          />

          <span className="text-sm text-muted-foreground">
            {row.original.startedAt
              ? format(row.original.startedAt, "MMM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as keyof typeof statusIconMap
      const Icon = statusIconMap[status]

      return (
        <Badge
          variant="outline"
          className={cn(statusColorMap[status], "flex items-center gap-x-1")}
        >
          <Icon
            className={cn(
              "size-4",
              status === "processing" && "animate-spin"
            )}
          />
          <span className="capitalize">{status}</span>
        </Badge>
      )
    },
  },
  {
  accessorKey: "duration",
  header: "Duration",
  cell: ({ row }) => (
    <Badge
      variant="outline"
      className="capitalize flex items-center gap-x-2"
    >
      <ClockFadingIcon className="size-4 text-blue-700" />
      {row.original.duration
        ? formatDuration(row.original.duration)
        : "No duration"}
    </Badge>
  ),
}

];