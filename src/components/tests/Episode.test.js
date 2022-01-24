import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


test("renders without error", () => {
  render(<Episode episode={{
    id: 1,
    img: 'https://i.ibb.co/2FsfXqM/stranger-things.png',
    season: 1,
    episode: 1,
    name: 'episode name',
    summary: 'summary',
    runtime: 1
  }} />);
});

test("renders the summary test passed as prop", ()=>{
  //Arrange
  render (<Episode episode={{summary: 'this is the summary'}}/>)
  //Act
  const summary = screen.queryByText(/this is the summary/i);
  //Assert
  expect(summary).toBeInTheDocument();
  expect(summary).toBeTruthy();
  expect(summary).toHaveTextContent(/this is the summary/i);
});

test("renders default image when image is not defined", ()=>{
  //Arrange
  render(<Episode episode={{image: null}}/>)

  //Act
  const imgAlt = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')

  //Assert
  expect(imgAlt).toBeInTheDocument();
});
