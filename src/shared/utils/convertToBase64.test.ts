import { describe, expect, it } from 'vitest';

import { convertToBase64 } from './convertToBase64';

describe('convertToBase64 util function', () => {
  it('should convert image file to base64', async () => {
    const mockFile = new File(['test content'], 'test.jpg', {
      type: 'image/jpeg',
    });

    const result = await convertToBase64(mockFile);

    expect(result).toMatch(/^data:image\/jpeg;base64,/);
  });
});
