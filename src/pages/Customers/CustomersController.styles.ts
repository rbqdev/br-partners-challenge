import { Box } from "@mui/material";
import styled from "@mui/styled-engine-sc";

export const Header = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
);

export const Content = styled(Box)(
  () => `
    height: 100%;
    flex-grow: 1;
    margin-top: 0 !important;
  `
);
