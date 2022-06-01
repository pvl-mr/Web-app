import styled from 'styled-components';
import {Card as DefaultCard} from "react-bootstrap";

export const Wrapper = styled.div`
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

export const CustomButton = styled.div`
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;

