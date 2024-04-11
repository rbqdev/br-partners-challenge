import { Stack } from "@mui/material";

import * as Styled from "./PageLayout.styles";

type PageLayoutProps = {
  headerElement?: React.ReactElement;
  children: React.ReactElement;
};

export const PageLayout = ({ headerElement, children }: PageLayoutProps) => {
  return (
    <Stack gap={4} height="100%">
      {headerElement && headerElement}
      <Styled.Content>{children}</Styled.Content>
    </Stack>
  );
};
