import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookAppointment from '@/pages/BookAppointment';

// Mock the Layout component
jest.mock('@/components/layout/Layout', () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-layout">{children}</div>;
  };
});

describe('BookAppointment Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <BookAppointment />
      </BrowserRouter>
    );
  });

  test('renders booking page title', () => {
    expect(screen.getByText('Book an Appointment')).toBeInTheDocument();
  });

  test('renders step indicator', () => {
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Doctor')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  test('back button is disabled on first step', () => {
    const backButton = screen.getByText('Back').closest('button');
    expect(backButton).toBeDisabled();
  });

  test('next button is disabled when no department is selected', () => {
    const nextButton = screen.getByText('Next').closest('button');
    expect(nextButton).toBeDisabled();
  });
}); 