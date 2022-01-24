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

test("renders the summary test passed as prop", ()=>{});

test("renders default image when image is not defined", ()=>{});
