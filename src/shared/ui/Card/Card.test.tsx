import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type FormSubmission } from '@/app/store';
import { useBase64Image } from '@/shared/hooks/useBase64Image';
import { Card } from './Card';

vi.mock('@/shared/hooks/useBase64Image');

const mockBase64Hook = vi.mocked(useBase64Image);

export const mockFormSubmission = (
  overrides: Partial<FormSubmission> = {}
): FormSubmission => ({
  id: 'test',
  formType: 'uncontrolled',
  data: {
    name: 'Jack',
    age: '1',
    email: 'example@example.com',
    password: 'example@example.comA',
    secondPassword: 'example@example.comA',
    gender: 'male',
    checkbox: true,
    file: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
    country: 'usa',
  },
  isNew: false,
  ...overrides,
});

describe('Card component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render uncontrolled form data correctly', () => {
    const mockData = mockFormSubmission();

    mockBase64Hook.mockReturnValue({ imageSrc: '', error: null });

    render(<Card data={mockData} />);

    expect(screen.getByText('uncontrolled Form')).toBeInTheDocument();
    expect(screen.getByText('Jack')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('example@example.com')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('usa')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('should render controlled (react hook form) form correctly', () => {
    const mockData = mockFormSubmission({ formType: 'hook' });

    mockBase64Hook.mockReturnValue({ imageSrc: '', error: null });

    render(<Card data={mockData} />);

    expect(screen.getByText('hook Form')).toBeInTheDocument();
    expect(screen.getByText('Jack')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('example@example.com')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('usa')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('should display image when imageSrc is true', () => {
    const mockData = mockFormSubmission();
    const mockImageSrc = 'data:image/jpeg;base64,test-base64';

    mockBase64Hook.mockReturnValue({ imageSrc: mockImageSrc, error: null });

    render(<Card data={mockData} />);

    const image = screen.getByAltText('form submitted file');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImageSrc);
  });

  it('should display false condition for checkbox', () => {
    const mockData = mockFormSubmission({
      data: {
        ...mockFormSubmission().data,
        checkbox: false,
      },
    });

    mockBase64Hook.mockReturnValue({ imageSrc: '', error: null });

    render(<Card data={mockData} />);

    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('should calls useBase64Image with image file', () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockData = mockFormSubmission({
      data: {
        ...mockFormSubmission().data,
        file: mockFile,
      },
    });

    mockBase64Hook.mockReturnValue({ imageSrc: '', error: null });

    render(<Card data={mockData} />);

    expect(mockBase64Hook).toHaveBeenCalledWith(mockFile);
  });

  it('should render all form fields', () => {
    const mockData = mockFormSubmission();

    mockBase64Hook.mockReturnValue({ imageSrc: '', error: null });

    render(<Card data={mockData} />);

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Age:')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('Country:')).toBeInTheDocument();
    expect(screen.getByText('Terms Accepted:')).toBeInTheDocument();
  });
});
