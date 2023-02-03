import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import { expensesState } from "../state/expenses";
import styled from "styled-components";

export const AddExpenseForm = () => {
  const [validated, setValidated] = useState(false);

  const [isDescValid, setIsDescValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);

  const members = useRecoilValue(groupMembersState);

  const today = new Date();
  const [date, setDate] = useState(
    [today.getFullYear(), today.getMonth() + 1, today.getDate()].join("-")
  );
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState([]);

  const addExpense = useSetRecoilState(expensesState);

  const checkFormValidity = () => {
    const descValid = desc.length > 0;
    const amountValid = amount > 0;
    const payerValid = payer.length !== 0;
    setIsDescValid(descValid);
    setIsAmountValid(amountValid);
    setIsPayerValid(payerValid);

    return descValid && amountValid && payerValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(date, desc, amount, payer);
    const form = e.currentTarget;
    if (checkFormValidity()) {
      const newExpense = {
        date,
        desc,
        amount,
        payer,
      };

      addExpense((expense) => [...expense, newExpense]);
    } else {
    }
    setValidated(true);
  };
  return (
    <StyledWrapper>
      <Form noValidate onSubmit={handleSubmit}>
        <StyledTitle>1. 비용 추가하기</StyledTitle>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="date"
                placeholder="결제 날짜 선택"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="text"
                isValid={isDescValid}
                isInvalid={!isDescValid && validated}
                placeholder="비용 내역 입력"
                value={desc}
                onChange={({ target }) => setDesc(target.value)}
              />
              <Form.Control.Feedback type="invalid" data-valid={isDescValid}>
                비용에 대한 설명을 입력해 주세요.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Control
                type="number"
                isValid={isAmountValid}
                isInvalid={!isAmountValid && validated}
                placeholder="금액 입력"
                value={amount}
                onChange={({ target }) => setAmount(target.value)}
              />
              <Form.Control.Feedback type="invalid" data-valid={isAmountValid}>
                1원이상의 금액을 입력해 주세요.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Select
                isValid={isPayerValid}
                isInvalid={!isPayerValid && validated}
                defaultValue=""
                className="form-control"
                onChange={({ target }) => setPayer(target.value)}
              >
                <option disabled value="">
                  누가 결제했나요?
                </option>
                <option>영수</option>
                {members.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid" data-valid={isPayerValid}>
                결제자를 선택해 주세요.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="d-grid gap-2">
            <StyledSubmitButton type="submit">추가하기</StyledSubmitButton>
          </Col>
        </Row>
      </Form>
    </StyledWrapper>
  );
};

const StyledTitle = styled.h3`
  color: #5c2c00;
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 20px;
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 16px;
  input,
  select {
    background: #fff3e8;
    box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    border: 0;
    color: #5c2c00;
    height: 48px;

    &:focus {
      color: #5c2c00;
      background: #fff3e8;
      filter: brightness(110%);
    }
    ::placeholder {
      color: #5c2c00;
    }
  }
`;
const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  height: 60px;
  background: #ff7a00;
  border-radius: 10px;
  border: none;
  font-size: 16pt;
  padding: 16px 32px;
  margin-top: 20px;
  &:hover {
    background: #ff7a00;
    filter: brightness(130%);
  }
`;

const StyledWrapper = styled.div`
  padding: 50px;
  background: #ffdcbb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;
