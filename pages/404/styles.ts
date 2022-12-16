import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: #41464b;
  color: #fff;

  button {
    font-weight: bold;
    color: #fff;
    font-size: 1rem;
  
  &:hover {
    color: #fff;
    filter: brightness(90%);
  }
  }
`;
