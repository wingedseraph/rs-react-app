import { createCSVContent } from '@/utils/fileDownloadUtils';
import { describe, expect, it } from 'vitest';

describe('fileDownloadUtils', () => {
  const mockCards = [
    { id: 'fut2020-1', name: 'Pikachu on the Ball', image: '', localId: '' },
    { id: 'basep-1', name: 'Pikachu', image: '', localId: '' },
  ];

  it('should generate CSV', () => {
    const result = createCSVContent(mockCards);
    const lines = result.split('\n');

    expect(lines[0]).toBe('id,name');
    expect(lines[1]).toBe('fut2020-1,Pikachu on the Ball');
    expect(lines[2]).toBe('basep-1,Pikachu');
    expect(lines).toHaveLength(3);
  });
});
