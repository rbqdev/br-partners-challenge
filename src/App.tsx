import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import * as Styled from "./App.styles";
import { SnackBarProvider } from "./contexts/SnackBarProvider";
import { router } from "./router";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.CardContent>
          <QueryClientProvider client={queryClient}>
            <SnackBarProvider>
              <RouterProvider router={router} />
            </SnackBarProvider>
          </QueryClientProvider>
        </Styled.CardContent>
      </Styled.Card>
    </Styled.Container>
  );
};
