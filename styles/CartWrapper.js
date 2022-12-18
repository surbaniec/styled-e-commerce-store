import styled from 'styled-components';

export const CartWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
  z-index: 100;
`;

export const CartStyle = styled.div`
  width: 30%;
  background: #f1f1f1;
  padding: 2rem 5rem;
  overflow-y: scroll;
  position: relative;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  padding: 2rem;
  margin: 2rem 0;
  img {
    width: 8rem;
  }
`;

export const CardInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const EmptyStyle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  h1 {
    font-size: 2rem;
  }
  svg {
    margin-top: 2rem;
    font-size: 10rem;
    color: var(--secondary);
  }
`;
