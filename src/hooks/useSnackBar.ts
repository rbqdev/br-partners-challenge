import { useContext } from "react";

import { SnackBarContext } from "@/contexts/SnackBarProvider";

export const useSnackBar = () => {
  return useContext(SnackBarContext);
};
