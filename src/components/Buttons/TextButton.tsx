import { Button } from "rebass";
import styled from "@emotion/styled";
import { buttonStyle, color, fontFamily, variant } from "styled-system";

interface TextButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const TextButton = ({ children, onClick }: TextButtonProps) => {
  const MyButton = styled(Button)`
    ${color}
    ${variant}
  ${buttonStyle}
  ${fontFamily}
  &:hover {
      text-decoration: underline;
    }
  `;
  return (
    <MyButton
      variant="textButton"
      fontFamily="dmSans"
      onClick={onClick}
      // color='black'
    >
      {children}
    </MyButton>
  );
};

export default TextButton;

