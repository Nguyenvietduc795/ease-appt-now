import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookAppointment from '../BookAppointment';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('BookAppointment', () => {
  it('renders the initial step correctly', () => {
    render(<BookAppointment />);
    
    // Check if the first step is rendered
    expect(screen.getByText('Select Department')).toBeInTheDocument();
    expect(screen.getByLabelText('Department')).toBeInTheDocument();
  });

  it('navigates to the next step when clicking next button', () => {
    render(<BookAppointment />);
    
    // Click the next button
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Check if the second step is rendered
    expect(screen.getByText('Select Doctor')).toBeInTheDocument();
    expect(screen.getByLabelText('Doctor')).toBeInTheDocument();
  });

  it('navigates back to the previous step when clicking back button', () => {
    render(<BookAppointment />);
    
    // Go to second step
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Click the back button
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    // Check if we're back at the first step
    expect(screen.getByText('Select Department')).toBeInTheDocument();
  });

  it('shows all required fields in each step', () => {
    render(<BookAppointment />);
    
    // Check first step
    expect(screen.getByLabelText('Department')).toBeInTheDocument();
    
    // Go to second step
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByLabelText('Doctor')).toBeInTheDocument();
    
    // Go to third step
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Time')).toBeInTheDocument();
    
    // Go to fourth step
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByLabelText('Reason')).toBeInTheDocument();
    expect(screen.getByLabelText('Notes')).toBeInTheDocument();
  });
}); 