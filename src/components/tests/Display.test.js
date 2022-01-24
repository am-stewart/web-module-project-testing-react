import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

import Display from './../Display';

const showData = {
  name: 'test show name',
  summary: 'test summary of show',
  seasons: [
    {
      id: 1,
      name: 'test season 1',
      episodes: []
    },
    {
      id: 2,
      name: 'test season 2',
      episodes: []
    },
    {
      id: 3,
      name: 'test season 3',
      episodes: []
    }
  ]
}

test('renders without errors with no props', ()=>{
  render(<Display />)
});

test('renders Show component when the button is clicked ', async () => {
  mockFetchShow.mockResolvedValueOnce(showData);

  //Arrange: display component 
  render(<Display />)

  //Act:
  //1. find button 
  const button = screen.getByRole('button');
  //2. click button
  userEvent.click(button);

  //Assert
  //1. find show component
  const showComponent = await screen.findByTestId('show-container');
  //2. expect show component to be in document
  expect(showComponent).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
  mockFetchShow.mockResolvedValueOnce(showData);

  //Arrange: renders display with show data props
  render(<Display show={showData}/>)

  //Act
  //1. find get data button 
  const button = screen.getByRole('button');
  //2. click button 
  userEvent.click(button);

  //Assert
  //5. find number of dropdown options
  const seasons = await (screen.findAllByTestId('season-option'))
  //6. expect number of dropdown options === number of seasons(3)
  expect(seasons).toHaveLength(3);
});

test('displayFunc is called when fetch button is pressed', () => {
  mockFetchShow.mockResolvedValueOnce(showData);

  render(<Display />)
  const button = screen.getByRole('button');
  userEvent.click(button);

  expect(mockFetchShow).toHaveBeenCalled();
});
