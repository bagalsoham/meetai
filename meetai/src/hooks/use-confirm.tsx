import { JSX,useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";

export const useConfirm = (): [
  () => JSX.Element,
  (title: string, description: string) => Promise<boolean>
] => {
  const [state, setState] = useState<{
    resolve: (value: boolean) => void;
    title: string;
    description: string;
  } | null>(null);

  const confirm = (title: string, description: string) => {
    return new Promise<boolean>((resolve) => {
      setState({ resolve, title, description });
    });
  };

  const handleClose = () => {
    setState(null);
  };

  const handleConfirm = () => {
    state?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    state?.resolve(false);
    handleClose();
  };

  const ConfirmDialog = () => (
    <ResponsiveDialog
      open={!!state}
      onOpenChange={handleClose}
      title={state?.title || ""}
      description={state?.description || ""}
    >
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmDialog, confirm];
};
