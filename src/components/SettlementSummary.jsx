import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { groupMembersState } from "../state/groupMembers";
import styled from "styled-components";
import { StyledTitle } from "./AddExpenseForm";

const calculateMinimumTransaction = (expenses, members, amountPerPerson) => {
  const minTransactions = [];

  if (amountPerPerson === 0) {
    return minTransactions;
  }
  // 1. 사람별로 냈어야 할 금액
  const membersToPay = {};
  members.forEach((member) => {
    membersToPay[member] = amountPerPerson;
  });

  // 2. 사람별로 냈어야 할 금액 업데이트
  expenses.forEach(({ payer, amount }) => {
    membersToPay[payer] -= amount;
  });

  // 3.
  const sortedMembersToPay = Object.keys(membersToPay)
    .map((member) => ({
      member: member,
      amount: membersToPay[member],
    }))
    .sort((a, b) => a.amount - b.amount);

  var left = 0;
  var right = sortedMembersToPay.length - 1;
  while (left < right) {
    while (left < right && sortedMembersToPay[left].amount === 0) {
      left++;
    }
    while (left < right && sortedMembersToPay[right].amount === 0) {
      right--;
    }
    const toReceive = sortedMembersToPay[left];
    const toSend = sortedMembersToPay[right];
    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToSend > amountToReceive) {
      minTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToReceive,
      });
      toReceive.amount = 0;
      toSend.amount -= amountToReceive;
      left++;
    } else {
      minTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToSend,
      });
      toSend.amount = 0;
      toReceive.amount += amountToSend;
      right--;
    }
  }
  return minTransactions;
};

export const SettlementSummary = () => {
  const expenses = useRecoilValue(expensesState);
  const members = useRecoilValue(groupMembersState);

  const totalExpenseAmount = parseInt(
    expenses.reduce(
      (prevAmount, curExpense) => prevAmount + parseInt(curExpense.amount),
      0
    )
  );
  const groupMembersCount = members.length;
  const splitAmount = totalExpenseAmount / groupMembersCount;
  const minimumTransaction = calculateMinimumTransaction(
    expenses,
    members,
    splitAmount
  );

  return (
    <StyledWrapper>
      <StyledTitle>2. 정산은 이렇게!</StyledTitle>
      {totalExpenseAmount > 0 && groupMembersCount > 0 && (
        <div>
          <StyledSummaryDiv>
            <span>
              {groupMembersCount}명이서 총 {totalExpenseAmount}원 지출
            </span>
            <br />
            <span>한 사람 당 {splitAmount}원</span>
          </StyledSummaryDiv>

          <StyledUl>
            {minimumTransaction.map(({ sender, receiver, amount }, index) => (
              <li key={`transaction-${index}`}>
                <span>
                  {sender} -&gt; {receiver} : {amount}원 보내기
                </span>
              </li>
            ))}
          </StyledUl>
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 50px;
  background: #ffdcbb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  color: #5c2c00;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`;

const StyledSummaryDiv = styled.div`
  margin-top: 32px;
`;
const StyledUl = styled.ul`
  margin-top: 32px;
  list-style-type: disclosure-closed;
  line-height: 200%;

  li::marker {
    animation: blinker 1.5s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;
