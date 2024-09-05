import styled from "@emotion/styled";
import { Flex } from "rebass";

interface BaseInputWrapper {
  children: React.ReactNode;
}
const BaseInputWrapper = ({ children }: BaseInputWrapper) => {
  const Container = styled(Flex)``;

  return (
    <Container
      alignItems="center"
      bg="inputBg"
      p="5px"
      width={["250px", "325px", "350px", "400px"]}
    >
      {children}
    </Container>
  );
};

export default BaseInputWrapper;

