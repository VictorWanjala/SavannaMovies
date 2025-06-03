// @jest-environment jsdom
import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from "../components/ui/movieCard"
import { movieCardType } from '@/app/types/movieCardTypes';

jest.mock('next/image', () => require('../_mocks_/next-image').default);
jest.mock('next/link', () => require('../_mocks_/next-link').default);
jest.mock('@/lib/getImageUrl', () => require('../_mocks_/getImageUrl'));


const mockCard: movieCardType = {
  id: 1,
  poster_path: '/poster.jpg',
  title: 'Sample Movie',
  release_date: '2024-01-01',
  vote_average: 8.5,
  duration: '120 min',
  href: '/movies/1',
  original_language: 'en',
  overview: 'Sample overview',
  genres: [{ id: 1, name: 'Action' }],
  country: 'USA',
  production_companies: [],
};

describe('MovieCard Component', () => {
  it('renders movie title, year, language and vote average', () => {
    render(<MovieCard card={mockCard} />);

    expect(screen.getByText('Sample Movie')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument(); 
    expect(screen.getByText('8.5')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/fake-poster.jpg');
    expect(image).toHaveAttribute('alt', 'Sample Movie');

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movies/1');
  });
});
