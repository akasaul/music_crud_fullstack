import { Button } from "rebass";
import styled from "@emotion/styled";
import { buttonStyle, color, fontFamily, variant } from "styled-system";

interface PrimaryButtonProps {
  btnText: string;
  onClick: () => void;
}

const PrimaryButton = ({ btnText, onClick }: PrimaryButtonProps) => {
  const MyButton = styled(Button)`
    ${color}
    ${variant}
  ${buttonStyle}
  ${fontFamily}
  `;
  return (
    <MyButton
      variant="primary"
      fontFamily="dmSans"
      onClick={onClick}
      // color='black'
    >
      {btnText}
    </MyButton>
  );
};

export default PrimaryButton;
