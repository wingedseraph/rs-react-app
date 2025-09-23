import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { convertToBase64 } from '@/shared/utils/convertToBase64';
import { useBase64Image } from './useBase64Image';

vi.mock('@/shared/utils/convertToBase64');

const mockConvertToBase64 = vi.mocked(convertToBase64);

describe('useBase64Image custom hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return falsy when no file', () => {
    const { result } = renderHook(() => useBase64Image(null));

    expect(result.current.imageSrc).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('should convert image file to base64', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockBase64 = 'data:image/jpeg;base64,test-data';

    mockConvertToBase64.mockResolvedValue(mockBase64);

    const { result } = renderHook(() => useBase64Image(mockFile));

    await waitFor(() => {
      expect(result.current.imageSrc).toBe(mockBase64);
      expect(result.current.error).toBeNull();
    });

    expect(mockConvertToBase64).toHaveBeenCalledWith(mockFile);
  });

  it('should handle conversion error', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const errorMessage = 'Failed to convert';

    mockConvertToBase64.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useBase64Image(mockFile));

    await waitFor(() => {
      expect(result.current.imageSrc).toBe('');
      expect(result.current.error).toBe(errorMessage);
    });
  });
});
