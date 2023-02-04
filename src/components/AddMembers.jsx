import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState, useRecoilValue } from "recoil";
import { CenteredOverlayForm } from "../shared/CenteredOverlayForm";
import { groupMembersState } from "../state/groupMembers";
import { useState } from "react";
import { groupNameState } from "../state/groupName";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

export const AddMembers = () => {
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const groupName = useRecoilValue(groupNameState);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    if (groupMembers.length > 0) {
      navigate(ROUTES.EXPENSE_MAIN);
    }
  };
  const header = `${groupName}에 속한 사람들의 이름을 모두 적어주세요.`;
  return (
    <div>
      <CenteredOverlayForm
        title={header}
        validated={validated}
        handleSubmit={handleSubmit}
      >
        <InputTags
          data-testid="input-member-names"
          onTags={(value) => setGroupMembers(value.values)}
          placeholder="이름 간 띄어 쓰기"
        />
        {validated && groupMembers.length == 0 && (
          <StyledErrorMessage>
            그룹 멤버들의 이름을 입력해 주세요.
          </StyledErrorMessage>
        )}
      </CenteredOverlayForm>
    </div>
  );
};

const StyledErrorMessage = styled.span`
  color: red;
  padding: 2px;
`;
