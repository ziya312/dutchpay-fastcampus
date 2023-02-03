import { Container, Row, Col } from "react-bootstrap";
import { AddExpenseForm } from "./AddExpenseForm";
import { ExpenseTable } from "./ExpenseTable";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { groupNameState } from "../state/groupName";

export const ExpenseMain = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={5} md={4}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </Container>
  );
};

const LeftPane = () => {
  return (
    <Container>
      <AddExpenseForm />
      {/* TODO : 정산 결과 컴포넌트 렌더링 */}
    </Container>
  );
};

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);

  return (
    <StyledContainer>
      <Row>
        <StyledGroupName>{groupName || "그룹 이름"}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding: 100px 32px 100px 32px;
`;

const StyledGroupName = styled.h2`
  margin-bottom: 80px;
  font-size: 48px;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
`;

const StyledThead = styled.thead`
  color: #ff7a00;
`;
