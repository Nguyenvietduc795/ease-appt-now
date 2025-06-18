import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import Help from '@/pages/Help';

// Mock the Layout component
jest.mock('@/components/layout/Layout', () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-layout">{children}</div>;
  };
});

describe('Help Page', () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <Help />
      </I18nextProvider>
    );
  });

  test('renders help page title', () => {
    expect(screen.getByText('Help & Support')).toBeInTheDocument();
  });

  test('renders support options section', () => {
    expect(screen.getByText('How Can We Help You?')).toBeInTheDocument();
    expect(screen.getByText('Call Support')).toBeInTheDocument();
    expect(screen.getByText('Video Guide')).toBeInTheDocument();
    expect(screen.getByText('Email Support')).toBeInTheDocument();
  });

  test('renders FAQ section', () => {
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('How do I book an appointment?')).toBeInTheDocument();
  });

  test('renders contact section', () => {
    expect(screen.getByText('Still Have Questions?')).toBeInTheDocument();
    expect(screen.getByText('1-800-123-4567')).toBeInTheDocument();
    expect(screen.getByText('support@medicalcenter.com')).toBeInTheDocument();
  });
}); 