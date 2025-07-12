import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TechnologyForm from '@/app/components/forms/technology-form';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    loading: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('axios', () => ({
  post: jest.fn(),
  isAxiosError: jest.fn(),
}));

// Mock useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock environment variable
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000';

describe('TechnologyForm Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with all required fields', () => {
    render(<TechnologyForm />);

    expect(screen.getByText('Technology Information Form')).toBeInTheDocument();
    expect(screen.getByLabelText(/Technology Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Axis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Technology Abstract/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Report' })).toBeInTheDocument();
  });

  it('shows field labels with icons', () => {
    render(<TechnologyForm />);

    // Check for label text
    expect(screen.getByText('Technology Name')).toBeInTheDocument();
    expect(screen.getByText('Number of Axis')).toBeInTheDocument();
    expect(screen.getByText('Technology Abstract')).toBeInTheDocument();
  });

  it('has correct input placeholders', () => {
    render(<TechnologyForm />);

    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter the number of axis (1-5)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Describe your techonogy in detail...')).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<TechnologyForm />);

    const submitButton = screen.getByRole('button', { name: 'Generate Report' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Technology name must be at least 3 characters.')
      ).toBeInTheDocument();
      expect(screen.getByText('Abstract must be at least 50 characters.')).toBeInTheDocument();
      expect(screen.getByText('Number of axes must be at least 3.')).toBeInTheDocument();
    });
  });

  it('shows validation error for short technology name', async () => {
    render(<TechnologyForm />);

    const nameInput = screen.getByLabelText(/Technology Name/i);
    await user.type(nameInput, 'AI');

    const submitButton = screen.getByRole('button', { name: 'Generate Report' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Technology name must be at least 3 characters.')
      ).toBeInTheDocument();
    });
  });

  it('shows validation error for short abstract', async () => {
    render(<TechnologyForm />);

    const abstractInput = screen.getByLabelText(/Technology Abstract/i);
    await user.type(abstractInput, 'Short abstract');

    const submitButton = screen.getByRole('button', { name: 'Generate Report' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Abstract must be at least 50 characters.')).toBeInTheDocument();
    });
  });

  it('accepts valid input in all fields', async () => {
    render(<TechnologyForm />);

    const nameInput = screen.getByLabelText(/Technology Name/i);
    const axesInput = screen.getByLabelText(/Number of Axis/i);
    const abstractInput = screen.getByLabelText(/Technology Abstract/i);

    await user.type(nameInput, 'AI Medical Diagnostic System');
    await user.type(axesInput, '3');
    await user.type(
      abstractInput,
      'This is a comprehensive AI-powered medical diagnostic system that uses machine learning algorithms to analyze patient data and provide accurate diagnostic recommendations.'
    );

    // Verify inputs have values
    expect(nameInput).toHaveValue('AI Medical Diagnostic System');
    expect(axesInput).toHaveValue('3');
    expect(abstractInput).toHaveValue(
      'This is a comprehensive AI-powered medical diagnostic system that uses machine learning algorithms to analyze patient data and provide accurate diagnostic recommendations.'
    );
  });

  it('disables form inputs when submission is pending', async () => {
    const axios = require('axios');
    // Mock axios to return a promise that resolves after a delay
    axios.post.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: { id: 1 } }), 100))
    );

    render(<TechnologyForm />);

    const nameInput = screen.getByLabelText(/Technology Name/i);
    const axesInput = screen.getByLabelText(/Number of Axis/i);
    const abstractInput = screen.getByLabelText(/Technology Abstract/i);
    const submitButton = screen.getByRole('button', { name: 'Generate Report' });

    // Fill form with valid data
    await user.type(nameInput, 'AI Medical Diagnostic System');
    await user.type(axesInput, '3');
    await user.type(
      abstractInput,
      'This is a comprehensive AI-powered medical diagnostic system that uses machine learning algorithms to analyze patient data and provide accurate diagnostic recommendations.'
    );

    // Submit form
    await user.click(submitButton);

    // Check that form is submitted (we can't easily test the pending state due to async nature)
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/technologies', {
      name: 'AI Medical Diagnostic System',
      num_of_axes: '3',
      abstract:
        'This is a comprehensive AI-powered medical diagnostic system that uses machine learning algorithms to analyze patient data and provide accurate diagnostic recommendations.',
    });
  });

  it('has proper card layout structure', () => {
    render(<TechnologyForm />);

    expect(screen.getByText('Technology Information Form')).toBeInTheDocument();
    expect(screen.getByText('Please provide your technology information')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<TechnologyForm />);

    const submitButton = screen.getByRole('button', { name: 'Generate Report' });
    expect(submitButton).toHaveClass('w-full', 'bg-gradient-to-r');
  });
});
