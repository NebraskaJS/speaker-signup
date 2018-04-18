import React from 'react';
import styled from 'react-emotion';

const Container = styled.section`
  background-color: white;
  border-radius: 6px;
  border: 6px solid black;
  padding: 6px; /* 6 6 6 */
  margin: 1rem 0;
  position: relative;

  ::before {
    content: '';
    background: #fcf01a;
    width: 80%;
    height: 80%;
    bottom: -7%;
    max-width: 700px;
    position: absolute;
    left: -13%;
    z-index: -1;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  display: inline-block;
  font-size: 32px;
  text-transform: uppercase;
  color: black;

  margin: 1rem 0;
  padding: 0.25rem 1rem;

  border: 2px solid #000;
  border-left-width: 0;
  border-right-width: 0;
`;

export function Block({ children, title, ...rest }) {
  return (
    <Container {...rest}>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      {children()}
    </Container>
  );
}
