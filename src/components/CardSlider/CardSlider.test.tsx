import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { PokemonCardDetails } from '@/types';

import { CardSlider } from '@/components/CardSlider/CardSlider';

export const mockCardDetails: PokemonCardDetails = {
  category: 'Pokemon',
  dexId: [251],
  hp: 180,
  id: 'swsh1-1',
  illustrator: 'PLANETA Igarashi',
  image: 'https://assets.tcgdex.net/en/swsh/swsh1/1',
  localId: '1',
  name: 'Celebi V',
  rarity: 'Holo Rare V',
  stage: 'Basic',
  suffix: 'V',
  types: ['Grass'],
};
describe('CardSlider', () => {
  it('should render CardDetails info when open', () => {
    render(
      <CardSlider cardDetails={mockCardDetails} isOpen onClose={vi.fn()} />
    );
    expect(screen.getByText(/hp/i)).toBeInTheDocument();
    expect(screen.getByText(/stage/i)).toBeInTheDocument();
    expect(screen.getByText(/rarity/i)).toBeInTheDocument();
    expect(screen.getByText(/category/i)).toBeInTheDocument();
    expect(screen.getByAltText(mockCardDetails.name)).toBeInTheDocument();
  });

  it('should dont render CardDetails', () => {
    render(
      <CardSlider
        cardDetails={mockCardDetails}
        isOpen={false}
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByText(/hp/i)).toBeNull();
    expect(screen.queryByText(/stage/i)).toBeNull();
    expect(screen.queryByText(/rarity/i)).toBeNull();
    expect(screen.queryByText(/category/i)).toBeNull();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <CardSlider cardDetails={mockCardDetails} isOpen onClose={onClose} />
    );
    await userEvent.click(screen.getByText(/close/i));
    expect(onClose).toHaveBeenCalled();
  });
  it('calls onClose when backdrop is clicked', async () => {
    const onClose = vi.fn();
    render(
      <CardSlider cardDetails={mockCardDetails} isOpen onClose={onClose} />
    );
    const backdrop = screen.getByTestId('backdrop');
    await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });
});
