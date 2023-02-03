import { Container, Form, Row, Button, Col } from "react-bootstrap";
import { groupNameState } from "../state/groupName";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { CenteredOverlayForm } from "./CenteredOverlayForm";
import styled from "styled-components";

export const CreateGroup = () => {
  const setGroupName = useSetRecoilState(groupNameState);
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
    <CenteredOverlayForm
      title="먼저, 더치 페이 할 그룹의 이름을 정해볼까요?"
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <Form.Group>
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
    </CenteredOverlayForm>
  );
};
