import { Box } from "@mui/material";
import styled from "@mui/styled-engine-sc";

export const FullBoxWrapper = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `
);
