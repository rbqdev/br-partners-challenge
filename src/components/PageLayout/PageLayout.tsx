import { CircularProgress, Stack, Typography } from "@mui/material";
import { useCallback } from "react";

import * as Styled from "./PageLayout.styles";

type PageLayoutProps = {
  headerElement?: React.ReactElement;
  children: React.ReactElement;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
};

export const PageLayout = ({
  headerElement,
  children,
  isLoading,
  isError,
  errorMessage,
  isEmpty,
  emptyMessage,
}: PageLayoutProps) => {
  const childrenElement = useCallback(() => {
    if (isLoading) {
      return (
        <Styled.FullBoxWrapper>
          <CircularProgress />
        </Styled.FullBoxWrapper>
      );
    }

    if (isEmpty) {
      return (
        <Styled.FullBoxWrapper>
          <Typography variant="h2" fontSize={42}>
            {emptyMessage}
          </Typography>
        </Styled.FullBoxWrapper>
      );
    }

    if (isError) {
      return (
        <Styled.FullBoxWrapper>
          <Typography variant="h2" fontSize={42}>
            {errorMessage}
          </Typography>
        </Styled.FullBoxWrapper>
      );
    }

    return <Styled.Content>{children}</Styled.Content>;
  }, [children, emptyMessage, errorMessage, isEmpty, isError, isLoading]);

  return (
    <Stack gap={4} height="100%">
      {headerElement && headerElement}
      {childrenElement()}
    </Stack>
  );
};
