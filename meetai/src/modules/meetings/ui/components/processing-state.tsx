import EmptyState from "@/components/empty-state"


export const ProcessingState = () => { // ✅ Added Props interface to function signature
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-between">
            <EmptyState
                image="/processing.svg"
                title="Meeting completed"
                description="The meeting was completed , a summary will appear soon"
            />
        </div>
    )
}