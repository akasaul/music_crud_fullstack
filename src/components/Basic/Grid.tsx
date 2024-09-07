import styled from "@emotion/styled";
import { Box } from "rebass";
import {
  boxShadow,
  compose,
  layout,
  space,
  typography,
  border,
  position,
  borderRadius,
  grid,
  GridProps,
} from "styled-system";

export const Grid = styled(Box)<GridProps>`
  display: grid;
  ${compose(
    grid,
    space,
    layout,
    typography,
    border,
    position,
    borderRadius,
    boxShadow,
  )};
`;
