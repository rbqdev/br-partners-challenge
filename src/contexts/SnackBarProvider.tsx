import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";

type SetSnackBarProps = {
  message: string;
  variant?: AlertColor;
  duration?: number;
};

type SnackBarContextProps = {
  showSnackBar: (payload: SetSnackBarProps) => void;
  snackBar: SetSnackBarProps | null;
};

export const SnackBarContext = createContext({} as SnackBarContextProps);

type SnackBarProviderProps = {
  children: React.ReactElement;
};

export const SnackBarProvider = ({ children }: SnackBarProviderProps) => {
  const [snackBar, setSnackBar] = useState<SetSnackBarProps | null>(null);

  const showSnackBar = ({
    message,
    variant = "success",
    duration = 2000,
  }: SetSnackBarProps) => {
    setSnackBar({ message, variant, duration });
  };

  return (
    <SnackBarContext.Provider value={{ showSnackBar, snackBar }}>
      {children}
      <Snackbar
        open={!!snackBar?.message}
        onClose={() => setSnackBar(null)}
        autoHideDuration={snackBar?.duration}
      >
        <Alert severity={snackBar?.variant} variant="filled">
          {snackBar?.message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};
