import { Container, Form, Row, Button } from "react-bootstrap";
import { groupNameState } from "../state/groupName";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { CenteredOverlayForm } from "./CenteredOverlayForm";

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
    <div>
      <h1>Dutch Pay</h1>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <h2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</h2>
          </Row>
          <Row>
            <Form.Group controlId="validationGroupName">
              <Form.Control
                type="text"
                required
                placeholder="ex) 2022 제주도 여행"
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
                그룹 이름을 입력해 주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Button type="submit">저장</Button>
          </Row>
        </Form>
      </Container>
      {/* <CenteredOverlayForm /> */}
    </div>
  );
};
