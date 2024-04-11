import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type CustomerDeleteDialogProps = {
  open: boolean;
  isPending: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export const CustomerDeleteDialog = ({
  open,
  isPending,
  onSubmit,
  onClose,
}: CustomerDeleteDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Are you sure you want to delete this item?
    </DialogTitle>
    <DialogActions>
      <Button disabled={isPending} onClick={onClose}>
        Disagree
      </Button>
      <LoadingButton
        disabled={isPending}
        loading={isPending}
        onClick={onSubmit}
      >
        Agree
      </LoadingButton>
    </DialogActions>
  </Dialog>
);
