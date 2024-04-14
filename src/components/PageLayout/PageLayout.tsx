import { CircularProgress, Stack, Typography } from "@mui/material";
import { useCallback } from "react";

import { fullBoxLoaderId } from "./constants";
import * as Styled from "./PageLayout.styles";

const FullBoxWrapperMessage = ({ message }: { message?: string }) => (
  <Styled.FullBoxWrapper>
    <Typography variant="h2" fontSize={42}>
      {message}
    </Typography>
  </Styled.FullBoxWrapper>
);

export type PageLayoutProps = {
  children: React.ReactElement;
  headerElement?: React.ReactElement;
  isLoading?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
};

export const PageLayout = ({
  headerElement,
  children,
  isLoading,
  errorMessage,
  emptyMessage,
}: PageLayoutProps) => {
  const childrenElement = useCallback(() => {
    if (isLoading) {
      return (
        <Styled.FullBoxWrapper aria-busy aria-describedby={fullBoxLoaderId}>
          <CircularProgress
            id={fullBoxLoaderId}
            data-testid={fullBoxLoaderId}
          />
        </Styled.FullBoxWrapper>
      );
    }

    if (emptyMessage) {
      return <FullBoxWrapperMessage message={emptyMessage} />;
    }

    if (errorMessage) {
      return <FullBoxWrapperMessage message={errorMessage} />;
    }

    return <Styled.Content>{children}</Styled.Content>;
  }, [children, emptyMessage, errorMessage, isLoading]);

  return (
    <Stack gap={4} height="100%">
      {headerElement && headerElement}
      {childrenElement()}
    </Stack>
  );
};
