import styled from 'styled-components';
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


export const Table = styled.table`
    width: 100%;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin: 12px 0;
`;

export const Cell = styled.th`
  border-color: rgba(0, 0, 0, 0.2);
  border-width: 2px;
  width: 33%;
  padding: 12px;
`;
export const Head = styled.thead`
  font-weight: 400;
  height: 80px;
  background: grey;
  color: #fff;
`;
export const Body = styled.tbody`
  font-weight: normal;
`;
export const Tr = styled.tr`
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
  gap: 24px
`;

export const WrapperBonds = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 400px) minmax(200px, 400px) minmax(200px, 400px);
  justify-content: center;
  gap: 24px
`;


export const Card = styled(DefaultCard)`
  background: #f3f3f3 !important;
  border-radius: 14px;
  border: none;
  border-left: 5px solid ${({ colorMark }) => `${colorMark}`};
`;