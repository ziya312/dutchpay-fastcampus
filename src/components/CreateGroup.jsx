import { Container, Form, Row, Button, Col } from "react-bootstrap";
import { groupNameState } from "../state/groupName";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { CenteredOverlayForm } from "./CenteredOverlayForm";
import styled from "styled-components";

export const CreateGroup = () => {
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  const [validated, setValidated] = useState(false);
  const [validGroupName, setVaildGroupName] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setVaildGroupName(true);
    } else {
      e.stopPropagation();
      setVaildGroupName(false);
    }
    setValidated(true);
  };
  return (
    <CenteredOverlayForm>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className="align-items-start">
              <StyledH2>먼저,</StyledH2>
              <StyledH2> 더치 페이 할 그룹의 이름을 정해볼까요?</StyledH2>
            </Row>
            <Row className="align-items-center">
              <Form.Group controlId="validationGroupName">
                <Form.Control
                  type="text"
                  required
                  placeholder="ex) 2022 제주도 여행"
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                />
                <Form.Control.Feedback
                  type="invalid"
                  data-valid={validGroupName}
                >
                  그룹 이름을 입력해 주세요.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="align-items-end">
              <Col className="text-center">
                <StyledSubmitButton>저장</StyledSubmitButton>
              </Col>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverlayForm>
  );
};

const StyledH2 = styled.h2`
  text-align: center;
  overflow-wrap: break-word;
  word-break: keep-all;
  font-weight: 700;
  font-size: 36px;
  line-height: 160%;
`;

const StyledRow = styled(Row)`
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
