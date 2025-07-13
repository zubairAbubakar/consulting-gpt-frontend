import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TechnologyForm from '../../app/components/forms/technology-form';
import axios from 'axios';

// Mock axios for HTTP requests
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock console methods to avoid test output clutter
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
};

describe('Technology Form Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock environment variable
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api';
  });

  it('renders form with all required fields', () => {
    render(<TechnologyForm />);

    expect(screen.getByText('Technology Information Form')).toBeInTheDocument();
    expect(screen.getByLabelText(/Technology Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Axis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Technology Abstract/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate report/i })).toBeInTheDocument();
  });

  it('allows user to fill out form fields', async () => {
    const user = userEvent.setup();
    render(<TechnologyForm />);

    const nameInput = screen.getByLabelText(/Technology Name/i);
    const axisInput = screen.getByLabelText(/Number of Axis/i);
    const abstractInput = screen.getByLabelText(/Technology Abstract/i);

    await user.type(nameInput, 'AI Medical Diagnostic System');
    await user.type(axisInput, '3');
    await user.type(
      abstractInput,
      'This is a comprehensive AI-powered medical diagnostic system that uses advanced algorithms.'
    );

    expect(nameInput).toHaveValue('AI Medical Diagnostic System');
    expect(axisInput).toHaveValue('3');
    expect(abstractInput).toHaveValue(
      'This is a comprehensive AI-powered medical diagnostic system that uses advanced algorithms.'
    );
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<TechnologyForm />);

    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /generate report/i });
    await user.click(submitButton);

    // Check for validation errors
    await waitFor(() => {
      expect(
        screen.getByText(/Technology name must be at least 3 characters/i)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Number of axes must be at least 3/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Abstract must be at least 50 characters/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for short technology name', async () => {
    const user = userEvent.setup();
    render(<TechnologyForm />);

    const nameInput = screen.getByLabelText(/Technology Name/i);
    await user.type(nameInput, 'AI'); // Too short

    const submitButton = screen.getByRole('button', { name: /generate report/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Technology name must be at least 3 characters/i)
      ).toBeInTheDocument();
    });
  });

  it('shows validation error for short abstract', async () => {
    const user = userEvent.setup();
    render(<TechnologyForm />);

    const nameInput = screen.getByLabelText(/Technology Name/i);
    const axisInput = screen.getByLabelText(/Number of Axis/i);
    const abstractInput = screen.getByLabelText(/Technology Abstract/i);

    await user.type(nameInput, 'AI Medical System');
    await user.type(axisInput, '3');
    await user.type(abstractInput, 'Too short'); // Less than 50 characters

    const submitButton = screen.getByRole('button', { name: /generate report/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Abstract must be at least 50 characters/i)).toBeInTheDocument();
    });
  });

  it('makes HTTP request with correct data when form is valid', async () => {
    const user = userEvent.setup();

    // Mock successful API response
    mockAxios.post.mockResolvedValue({
      data: { id: 'tech-123', name: 'AI Medical System' },
    });

    render(<TechnologyForm />);

    const nameInput = screen.getByLabelText(/Technology Name/i);
    const axisInput = screen.getByLabelText(/Number of Axis/i);
    const abstractInput = screen.getByLabelText(/Technology Abstract/i);

    await user.type(nameInput, 'AI Medical Diagnostic System');
    await user.type(axisInput, '3');
    await user.type(
      abstractInput,
      'This is a comprehensive AI-powered medical diagnostic system that uses advanced algorithms for medical diagnosis.'
    );

    const submitButton = screen.getByRole('button', { name: /generate report/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:3000/api/technologies', {
        name: 'AI Medical Diagnostic System',
        num_of_axes: '3',
        abstract:
          'This is a comprehensive AI-powered medical diagnostic system that uses advanced algorithms for medical diagnosis.',
      });
    });
  });

  it('handles form submission errors gracefully', async () => {
    const user = userEvent.setup();

    // Mock API error response
    mockAxios.post.mockRejectedValue({
      response: { data: { detail: 'Server error occurred' } },
    });

    render(<TechnologyForm />);

    const nameInput = screen.getByLabelText(/Technology Name/i);
    const axisInput = screen.getByLabelText(/Number of Axis/i);
    const abstractInput = screen.getByLabelText(/Technology Abstract/i);

    await user.type(nameInput, 'AI Medical Diagnostic System');
    await user.type(axisInput, '3');
    await user.type(
      abstractInput,
      'This is a comprehensive AI-powered medical diagnostic system that uses advanced algorithms for medical diagnosis.'
    );

    const submitButton = screen.getByRole('button', { name: /generate report/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalled();
    });
  });

  it('maintains form state during user interaction', async () => {
    const user = userEvent.setup();
    render(<TechnologyForm />);

    const nameInput = screen.getByLabelText(/Technology Name/i);
    const axisInput = screen.getByLabelText(/Number of Axis/i);

    // Fill partial form
    await user.type(nameInput, 'AI System');
    await user.type(axisInput, '2');

    // Values should persist
    expect(nameInput).toHaveValue('AI System');
    expect(axisInput).toHaveValue('2');

    // Continue typing
    await user.type(nameInput, ' Extended');
    expect(nameInput).toHaveValue('AI System Extended');
  });
});
