import styled from 'styled-components';
const { motion } = require('framer-motion');

export const SuccessWrapper = styled.div`
  margin: 5rem 15rem;
`;

export const SuccessCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 2rem;
  h2 {
    margin-bottom: 1rem 0;
  }
  button {
    color: white;
    background-color: var(--primary);
    font-size: 1.2rem;
    font-weight: 500;
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
  }
`;

export const SuccessAddress = styled.div`
  font-size: 1rem;
  width: 100%;
`;

export const SuccessOrder = styled.div`
  font-size: 1rem;
  width: 100%;
  div {
    padding-bottom: 1rem;
  }
`;

export const SuccessInfo = styled.div`
  display: flex;
  margin: 2rem 0;
`;
