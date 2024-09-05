import { Button } from "rebass";
import styled from "@emotion/styled";
import { buttonStyle, color, fontFamily, variant } from "styled-system";

interface SubmitButtonProps {
  children: React.ReactNode;
}

const SubmitButton = ({ children }: SubmitButtonProps) => {
  const MyButton = styled(Button)`
    ${color}
    ${variant}
  ${buttonStyle}
  ${fontFamily}
  `;
  return (
    <MyButton
      variant="submit"
      fontFamily="dmSans"
      type="submit"
      py="10px"
      // color='black'
    >
      {children}
    </MyButton>
  );
};

export default SubmitButton;

