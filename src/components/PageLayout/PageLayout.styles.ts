import { Box } from "@mui/material";
import styled from "@mui/styled-engine-sc";

export const Content = styled(Box)(
  () => `
    height: 100%;
    flex-grow: 1;
    margin-top: 0 !important;
  `
);

export const FullBoxWrapper = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    height: 100%;
  `
);
