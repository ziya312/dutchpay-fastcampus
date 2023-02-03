import styled from "styled-components";

export const OverlayWrapper = ({ children, padding, minHeight }) => {
  return (
    <StyledContainer padding={padding} minHeight={minHeight}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  min-height: ${(props) => props.minHeight || "0"};
  padding: ${(props) => props.padding || "5vw"};
`;
