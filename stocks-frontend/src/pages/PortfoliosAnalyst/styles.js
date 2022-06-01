import styled from 'styled-components';
import {Button as DefaultButton, Card as DefaultCard} from "react-bootstrap";

export const Wrapper = styled.div`
    display: grid;
    row-gap: 10px;
    margin-bottom: 150px;
`;

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  text-align: center;
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
`;

export const Actions = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

export const EmptyButton = styled.div`
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: flex-end;
`;