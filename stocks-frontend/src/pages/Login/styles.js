import styled from 'styled-components';
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export const Content = styled.div`
    min-width: 450px;
    background: #f0f0f0;
    padding: 40px;
    border-radius: 18px;
    margin-bottom: 100px;

  @media (max-width: 768px) {
    min-width: 320px;
  }
`;

export const Title = styled.h2`
    margin-bottom: 24px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    row-gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CustomLink = styled(Link)`
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    font-size: 14px;
  
    &:hover {
      text-decoration: underline;
    }
`;

export const StyledButtonLogin = styled(Button)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;
