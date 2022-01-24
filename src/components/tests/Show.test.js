import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

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

test('renders without errors', ()=>{
  render(<Show show={showData} selectedSeason={'none'}/>)
});

test('renders Loading component when prop show is null', () => {
  //Arrange
  render(<Show show={null}/>)
  //Act
  const loading = screen.queryByTestId('loading-container')
  //Assert
  expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
  //Arrange
  render(<Show show={showData} selectedSeason={'none'}/>)
  //Act
  const seasons = (screen.queryAllByTestId('season-option'))
  //Assert
  expect(seasons).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
  const mockHandleSelect = jest.fn();
  //Arrange
  render(<Show show={showData} selectedSeason={'none'} handleSelect={mockHandleSelect}/>)
  //Act
  //1. find drop down
  //2. click drop down
  const dropdown = screen.getByLabelText(/Select A Season/i)
  userEvent.selectOptions(dropdown, ('2'))
  //Assert
  expect(mockHandleSelect).toHaveBeenCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  //Arrange 1: page renders without season selected
  const {rerender} = render(<Show show={showData} selectedSeason={'none'}/>)
  //Act 1: find episode component
  let episodesComp = screen.queryByTestId('episodes-container');
  //Assert 1: expect that episode component is not in document
  expect(episodesComp).not.toBeInTheDocument();

  //Arrange 2: page renders with a season selected
  rerender(<Show show={showData} selectedSeason={2}/>)
  //Act 2: find episode component
  episodesComp = screen.queryByTestId('episodes-container')
  //Assert 2: expect episode component to be in the document
  expect(episodesComp).toBeInTheDocument();
});
