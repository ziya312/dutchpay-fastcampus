import { Container, Row, Col } from "react-bootstrap";
import { AddExpenseForm } from "./AddExpenseForm";
import { ExpenseTable } from "./ExpenseTable";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { groupNameState } from "../state/groupName";
import { SettlementSummary } from "./SettlementSummary";
import { ServiceLogo } from "../shared/ServiceLogo";

export const ExpenseMain = () => {
  return (
    <StyledMainContatiner fluid>
      <Row>
        <Col xs={12} lg={5}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </StyledMainContatiner>
  );
};

const LeftPane = () => {
  return (
    <StyledRLWrapper>
      <StyledGapRow>
        <Row>
          <ServiceLogo />
        </Row>
        <Row>
          <AddExpenseForm />
        </Row>
        <Row>
          <SettlementSummary />
        </Row>
      </StyledGapRow>
    </StyledRLWrapper>
  );
};

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);

  return (
    <StyledRLWrapper>
      <Row>
        <StyledGroupName>{groupName}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledRLWrapper>
  );
};

const StyledMainContatiner = styled(Container)`
  padding: 0 4vw;
`;

const StyledRLWrapper = styled(Container)`
  padding: 96px 2vw;
`;

const StyledGapRow = styled(Row)`
  gap: 3.5vh;
  justify-content: center;
`;

const StyledGroupName = styled.h2`
  margin-bottom: 80px;
  font-size: 48px;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
`;
