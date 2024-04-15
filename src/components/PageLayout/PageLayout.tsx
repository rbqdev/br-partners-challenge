import { CircularProgress, Stack, Typography } from "@mui/material";
import { useCallback } from "react";

import { fullBoxLoaderId } from "./constants";
import * as Styled from "./PageLayout.styles";

const FullBoxWrapperMessage = ({
  message,
  action,
}: {
  message?: string;
  action?: React.ReactElement;
}) => (
  <Styled.FullBoxWrapper>
    <Typography variant="h2" fontSize={42}>
      {message}
    </Typography>
    {action && action}
  </Styled.FullBoxWrapper>
);

export type PageLayoutProps = {
  children: React.ReactElement;
  headerElement?: React.ReactElement;
  isLoading?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  errorAction?: React.ReactElement;
};

export const PageLayout = ({
  headerElement,
  children,
  isLoading,
  emptyMessage,
  errorMessage,
  errorAction,
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
      return (
        <FullBoxWrapperMessage message={errorMessage} action={errorAction} />
      );
    }

    return <Styled.Content>{children}</Styled.Content>;
  }, [children, emptyMessage, errorAction, errorMessage, isLoading]);

  return (
    <Stack gap={4} height="100%">
      {headerElement && headerElement}
      {childrenElement()}
    </Stack>
  );
};
