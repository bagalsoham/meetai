import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import {useRouter} from "next/navigation";
import { id } from "zod/v4/locales";
interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({
  open,
  onOpenChange,
}: NewAgentDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="New meeting"
      description="Create a new meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) =>{
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={()=>onOpenChange}
      />

      
    </ResponsiveDialog>
  );
};
