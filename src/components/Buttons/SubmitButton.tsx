import { Button } from "rebass";
import styled from "@emotion/styled";
import { buttonStyle, color, fontFamily, variant } from "styled-system";
import { CSSProperties } from "react";

interface SubmitButtonProps {
  children: React.ReactNode;
  styles?: CSSProperties; // Accepting styles as an optional prop
}

const MyButton = styled(Button)`
  ${color}
  ${variant({
    variants: {
      submit: {
        backgroundColor: "blue",
        color: "white",
      },
    },
  })}
  ${buttonStyle}
  ${fontFamily}
`;

const SubmitButton = ({ children, styles }: SubmitButtonProps) => {
  return (
    <MyButton
      variant="submit"
      fontFamily="dmSans"
      type="submit"
      py="10px"
      sx={styles} // Applying the styles prop using sx from rebass
    >
      {children}
    </MyButton>
  );
};

export default SubmitButton;
