import styled from 'styled-components';
import {Button as DefaultButton, Card as DefaultCard} from "react-bootstrap";

export const Wrapper = styled.div`
    display: grid;
    row-gap: 10px;
    margin-bottom: 150px;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

export const WrapperLoading = styled.div`
  display: flex;
  justify-content: center;
`;

export const DescriptionStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 15px;


  @media (max-width: 768px) {
    flex-direction: column;
    height: 150px;
  }
`;


export const Status = styled.div`
    width: 30px;
    height: 4px;
    background: ${({ color }) => color};
`;

export const WrapperActions = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 50px;
  right: 50px;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 80px !important;
  display: flex;
  gap: 8px;


  @media (max-width: 768px) {
    width: 100%;
    right: 0;
    border-radius: 0 !important;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    bottom: 0;
    display: grid;
    row-gap: 8px;
    grid-template-columns: 1fr 1fr;
    position: sticky;
    
    button {
      width: 100%;
    }
  }
`;

export const Card = styled(DefaultCard)`
  background: #f3f3f3 !important;
  border-radius: 14px;
  border: none;
  border-left: 5px solid ${({ colorMark }) => `${colorMark}`};
`;

export const Button = styled(DefaultButton)`
    
`;

export const BlockActions = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;


  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;

export const EmptyButton = styled.div`
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: flex-end;
`;
