import { Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { OverlayWrapper } from "../shared/OverlayWrapper";
import { expensesState } from "../state/expenses";
import styled from "styled-components";

export const ExpenseTable = () => {
  const expenses = useRecoilValue(expensesState);
  return (
    <OverlayWrapper minHeight={"73vh"} padding={"1vw"}>
      <Table data-testid="expenseList" borderless hover responsive>
        <StyledThead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
          </tr>
        </StyledThead>
        <StyledBody>
          {expenses.map(({ date, desc, amount, payer }, idx) => (
            <tr key={`expense-${idx}`}>
              <td>{date}</td>
              <td>{desc}</td>
              <td>{payer}</td>
              <td>{parseInt(amount)}원</td>
            </tr>
          ))}
        </StyledBody>
      </Table>
    </OverlayWrapper>
  );
};

const StyledThead = styled.thead`
  color: #ff7a00;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  th {
    padding: 20px 8px;
  }
`;

const StyledBody = styled.tbody`
  td {
    font-weight: 400;
    font-size: 24px;
    line-heght: 60px;
    text-align: center;
  }
`;
