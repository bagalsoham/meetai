import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";
import { MeetingGetOne } from "../../types";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="Edit meeting"
      description="Edit the Meeting Details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)} // ✅ Fixed: Added missing parentheses
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};