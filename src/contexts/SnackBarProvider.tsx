import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";

type SnackBarContextProps = {
  setSnackBarMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const SnackBarContext = createContext({} as SnackBarContextProps);

type SnackBarProviderProps = {
  children: React.ReactElement;
  severityVariant?: AlertColor;
  duration?: number;
};

export const SnackBarProvider = ({
  children,
  severityVariant = "success",
  duration = 2000,
}: SnackBarProviderProps) => {
  const [snackBarMessage, setSnackBarMessage] = useState("");

  return (
    <SnackBarContext.Provider value={{ setSnackBarMessage }}>
      {children}
      <Snackbar
        open={!!snackBarMessage}
        onClose={() => setSnackBarMessage("")}
        autoHideDuration={duration}
      >
        <Alert severity={severityVariant} variant="filled">
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};
