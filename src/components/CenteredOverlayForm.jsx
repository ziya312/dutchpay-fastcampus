import { Container } from "react-bootstrap";
import styled from "styled-components";
import { OverlayWrapper } from "../shared/OverlayWrapper";

export const CenteredOverlayForm = ({ children }) => {
  return (
    <StyledCentralizedContainer>
      <StyledHeader>&lt;Dutch Pay&gt;</StyledHeader>
      <OverlayWrapper>{children}</OverlayWrapper>
    </StyledCentralizedContainer>
  );
};

const StyledHeader = styled.h1`
  font-weight: 400;
  font-size: 72px;
  font-family: "Mabook";
  color: #ff7a00;
`;
const StyledCentralizedContainer = styled(Container)`
  width: 50vw;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 96px;
  gap: 48px;
`;
