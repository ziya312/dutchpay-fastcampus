import { Container, Row, Button, Form, Col } from "react-bootstrap";
import styled from "styled-components";
import { OverlayWrapper } from "./OverlayWrapper";
import { ServiceLogo } from "./ServiceLogo";

export const CenteredOverlayForm = ({
  title,
  children,
  validated,
  handleSubmit,
}) => {
  return (
    <StyledCentralizedContainer>
      <ServiceLogo />
      <OverlayWrapper>
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <StyledCentralizedRow>
              <Row className="align-items-start">
                <StyledQuestion>{title}</StyledQuestion>
              </Row>
              <Row className="align-items-center">{children}</Row>
              <Row className="align-items-end">
                <Col className="text-center">
                  <StyledSubmitButton>저장</StyledSubmitButton>
                </Col>
              </Row>
            </StyledCentralizedRow>
          </Form>
        </Container>
      </OverlayWrapper>
    </StyledCentralizedContainer>
  );
};
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

const StyledQuestion = styled.h2`
  text-align: center;
  overflow-wrap: break-word;
  word-break: keep-all;
  font-weight: 700;
  font-size: 36px;
  line-height: 160%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StyledCentralizedRow = styled(Row)`
  height: 50vh;
  align-items: center;
  justify-content: center;
  float: none;
  margin: 0 auto;
`;

const StyledSubmitButton = styled(Button).attrs({ type: "submit" })`
  background: #ff7a00;
  border-radius: 10px;
  border: none;
  width: 175px;
  height: 60px;
  font-size: 24px;
  &:hover {
    background: #ff7a00;
    filter: brightness(130%);
  }
`;
