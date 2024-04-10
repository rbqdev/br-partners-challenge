import { Typography } from "@mui/material";
import React from "react";

import * as Styled from "./PageHeader.styles";

type PageHeaderProps = {
  title: string;
  action?: React.ReactElement;
};

export const PageHeader = ({ title, action }: PageHeaderProps) => {
  return (
    <Styled.Header>
      <Typography variant="h1" fontSize={32}>
        {title}
      </Typography>
      {action && action}
    </Styled.Header>
  );
};
