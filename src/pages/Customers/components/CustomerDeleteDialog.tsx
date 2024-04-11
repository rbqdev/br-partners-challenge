import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type CustomerDeleteDialogProps = {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export const CustomerDeleteDialog = ({
  open,
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
      <Button onClick={onClose}>Disagree</Button>
      <Button onClick={onSubmit} autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
);
