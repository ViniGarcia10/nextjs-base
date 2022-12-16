import styled from "styled-components";

export const Container = styled.div`
  h1 {
    color: gray;
  }

  fieldset {
    display: flex;
    flex-direction: column;

    label {
      margin-top: 0.6rem;
    }

    input {
      border-radius: 4px;
      width: 20rem;
      border: 1px solid #8b21ff;
      outline: 1px solid #40265c;

      &:invalid {
        background-color: ivory;
        border: 1px solid #f00;
        outline: 1px solid #f00;
        border-radius: 5px;
      }
    }

  }
`;
