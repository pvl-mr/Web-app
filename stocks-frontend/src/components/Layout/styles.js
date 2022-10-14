import styled, {css} from "styled-components";
import {Link} from "react-router-dom";

export const Wrapper = styled.div``;

export const HeaderWrapper = styled.header``;

export const FooterWrapper = styled.footer`
  background: #212529;
  padding: 10px;
  color: rgba(255, 255, 255, 0.55);
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Content = styled.main`
  padding: 14px 28px;
  min-height: calc(100vh - 100px);
`;

export const NavLink = styled(Link)`
  && {
    color: rgba(255, 255, 255, 0.55) !important;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    display: block;
    color: #0d6efd;
    text-decoration: none;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;

    &:hover {
      color: rgba(255, 255, 255, 0.9) !important;
    }
    
    ${({ isActive }) => isActive && css`
      color: rgba(255, 255, 255, 0.9) !important;
    `}
  }
`;

export const BlockCurrency = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;
export const Currency = styled.div`
    color: #fff;
  @media (max-width: 768px) {
    color: black;
  }
`;
