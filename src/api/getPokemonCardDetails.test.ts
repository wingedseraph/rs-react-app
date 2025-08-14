import { afterEach, describe, expect, it, vi } from 'vitest';

import { getPokemonCardDetails } from '@/api/getPokemonCardDetails';
import { mockCardDetails } from '@/components/CardSlider/CardSlider.test';

describe('test for getPokemonCardDetails API', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should returns data on successful fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => mockCardDetails,
      ok: true,
    } as Response);
    const data = await getPokemonCardDetails('swsh1-1');
    expect(data).toEqual(mockCardDetails);
  });

  it('should throws and returns error on non-ok response', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({}),
      ok: false,
      status: 404,
    } as Response);
    const data = await getPokemonCardDetails('wrong_id');
    expect(data).toBeInstanceOf(Error);

    consoleError.mockRestore();
  });

  it('should returns error on fetch failure', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('wrong_request'));
    const data = await getPokemonCardDetails('wrong_id');
    expect(data).toBeInstanceOf(Error);

    consoleError.mockRestore();
  });
});
