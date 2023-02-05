import styled from "styled-components";

export const ServiceLogo = () => {
  return <StyledLogo>&lt;Dutch Pay&gt;</StyledLogo>;
};

const StyledLogo = styled.h1`
  font-weight: 400;
  font-size: 6rem;
  font-family: "Mabook";
  text-align: center;
  color: #ff7a00;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
