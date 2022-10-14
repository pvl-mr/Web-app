import styled, {css} from 'styled-components';
import {Card as DefaultCard} from "react-bootstrap";

export const Wrapper = styled.div``;

export const Back = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  svg {
    margin-right: 5px;
  }
`;

export const WrapperLoading = styled.div`
  display: flex;
  justify-content: center;
`;

export const TableInfo = styled.table`
    width: 100%;
  margin-top: 10px;
`;

export const CellInfo = styled.th`
  ${({ color }) => color && css`
    background-color: ${color};
  `};
  text-align: center;
  width: 20%;
  color: black;
  border-width: 1px;
  border-color: rgba(237, 226, 199, 0.6);
`;
export const HeadInfo = styled.thead`
  font-weight: 200;
`;

export const Table = styled.table`
    width: 100%;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin: 12px 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const PortfolioActions = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Cell = styled.th`
  border-color: rgba(0, 0, 0, 0.2);
  border-width: 2px;
  width: 33%;
  padding: 12px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    width: 100%;
    
    &:before {
      content: attr(data-label);
      font-weight: bold;
      margin-right: 20px;
    }
  }
`;
export const Head = styled.thead`
  font-weight: 400;
  height: 80px;
  background: grey;
  color: #fff;

  @media (max-width: 768px) {
    display: none;
  }
`;
export const Body = styled.tbody`
  font-weight: normal;
`;
export const Tr = styled.tr`
  @media (max-width: 768px) {
    display: block;
  }
`;

export const InfoBlock = styled.div`
  font-size: 18px;
  margin-top: 14px;
`;

export const Bold = styled.span`
    font-weight: 500;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
  margin-top: 18px;
`;

export const WrapperStocks = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 400px) minmax(200px, 400px) minmax(200px, 400px);
  justify-content: center;
  gap: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const WrapperBonds = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 400px) minmax(200px, 400px) minmax(200px, 400px);
  justify-content: center;
  gap: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;


export const Card = styled(DefaultCard)`
  background: #f3f3f3 !important;
  border-radius: 14px;
  border: none;
  border-left: 5px solid ${({ colorMark }) => `${colorMark}`};
`;
