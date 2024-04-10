import {
  Card as MUICard,
  CardContent as MUICardContent,
  Container as MUIContainer,
  styled,
} from "@mui/material";

export const Container = styled(MUIContainer)(
  () => `
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `
);

export const Card = styled(MUICard)(
  () => `
    height: 80%;
    width: 100%;
  `
);

export const CardContent = styled(MUICardContent)(
  ({ theme }) => `
    height: 100%;
    padding: ${theme.spacing(4)}
  `
);
