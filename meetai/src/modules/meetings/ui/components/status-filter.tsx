import {
    CircleCheckIcon,
    CircleXIcon,
    ClockArrowUpIcon,
    LoaderIcon,
    VideoIcon
} from "lucide-react";

import { CommandSelect } from "@/components/command-select";
import { MeetingStatus } from "../../types";
import { useMeetingsFilter } from "@/app/(dashboard)/meetings/hooks/use-meetings-flters";

const options = [
    {
        id: MeetingStatus.Upcoming,
        value: MeetingStatus.Upcoming,
        children: (
            <div className="flex items-center gap-x-2 capitalize" key={MeetingStatus.Upcoming}>
                <ClockArrowUpIcon /> {MeetingStatus.Upcoming}
            </div>
        ),
    },
    {
        id: MeetingStatus.Active,
        value: MeetingStatus.Active,
        children: (
            <div className="flex items-center gap-x-2 capitalize" key={MeetingStatus.Active}>
                <LoaderIcon /> {MeetingStatus.Active}
            </div>
        ),
    },
    {
        id: MeetingStatus.Completed,
        value: MeetingStatus.Completed,
        children: (
            <div className="flex items-center gap-x-2 capitalize" key={MeetingStatus.Completed}>
                <CircleCheckIcon /> {MeetingStatus.Completed}
            </div>
        ),
    },
    {
        id: MeetingStatus.Processing,
        value: MeetingStatus.Processing,
        children: (
            <div className="flex items-center gap-x-2 capitalize" key={MeetingStatus.Processing}>
                <VideoIcon /> {MeetingStatus.Processing}
            </div>
        ),
    },
    {
        id: MeetingStatus.Cancelled,
        value: MeetingStatus.Cancelled,
        children: (
            <div className="flex items-center gap-x-2 capitalize" key={MeetingStatus.Cancelled}>
                <CircleXIcon /> {MeetingStatus.Cancelled}
            </div>
        ),
    },
];

export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilter();

    return (
        <CommandSelect
            placeholder="Status"
            className="h-9"
            options={options}
            value={filters.status ?? ""}
            onSelect={(value) => setFilters({ status: value as MeetingStatus })}
            onSearch={() => { }}
        />

    );
};
