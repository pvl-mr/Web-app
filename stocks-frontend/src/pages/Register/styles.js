import styled from 'styled-components';
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Content = styled.div`
    min-width: 450px;
    background: #f0f0f0;
    padding: 40px;
    border-radius: 18px;
    margin-bottom: 10px;

    @media (max-width: 768px) {  
      min-width: 320px;
      margin-top: 40px;
    }
`;

export const Title = styled.h2`
    margin-bottom: 24px;
  
    @media (max-width: 768px) {
      margin-top: 70px;
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

export const ButtonRegister = styled(Button)`
  @media (max-width: 768px) {
    width: 100%;
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
