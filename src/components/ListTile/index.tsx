import { Flex, Text } from "theme-ui";
import {
  color,
  ColorProps,
  display,
  DisplayProps,
  flexbox,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
} from "styled-system";
import styled from "@emotion/styled";
import { Link } from "rebass";
import { useLocation, useNavigate } from "react-router-dom";

interface ListTileProps {
  text: string;
  link: string;
  children: React.ReactNode;
}

const ListTile = ({ text, link, children }: ListTileProps) => {
  const location = useLocation();

  type TileTextProps = ColorProps &
    DisplayProps &
    FontWeightProps &
    FontSizeProps;

  const TileText = styled(Text)<TileTextProps>`
    ${color}
    ${display}
    ${fontWeight}
    ${fontSize}
  `;

  const ListTile = styled(Flex)`
    ${flexbox}
    align-items: center;
    &:hover > * {
      color: white;
      cursor: pointer;
    }
  `;

  const ListTileContainer = styled(Link)`
    &:hover > * {
      color: white;
    }
  `;

  const navigate = useNavigate();

  const onClick = () => {
    navigate(link);
  };

  return (
    <ListTileContainer onClick={onClick}>
      <ListTile
        // alignItems="center"
        className={`list_tile ${location.pathname === link && "active"}`}
        sx={{
          gap: "10px",
          alignItems: "center",
        }}
      >
        {children}
        <TileText
          color="textSecondary"
          fontSize="sm"
          fontWeight="bold"
          display={["none", "none", "block"]}
        >
          {text}
        </TileText>
      </ListTile>
    </ListTileContainer>
  );
};

export default ListTile;
