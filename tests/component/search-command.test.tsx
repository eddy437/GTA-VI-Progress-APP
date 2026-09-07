import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchCommand } from '@/components/ui/search-command';

describe('SearchCommand', () => {
  const mockSearch = vi.fn().mockResolvedValue([
    {
      id: '1',
      title: 'Test Mission',
      type: 'mission',
      description: 'Test description',
      href: '/missions/1',
    },
  ]);

  it('should render when open', () => {
    render(
      <SearchCommand
        open={true}
        onClose={() => {}}
        onSearch={mockSearch}
        recentSearches={['test']}
      />
    );

    expect(screen.getByPlaceholderText('Search missions, collectibles, vehicles...')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(
      <SearchCommand
        open={false}
        onClose={() => {}}
        onSearch={mockSearch}
      />
    );

    expect(screen.queryByPlaceholderText('Search missions, collectibles, vehicles...')).not.toBeInTheDocument();
  });

  it('should show recent searches', () => {
    render(
      <SearchCommand
        open={true}
        onClose={() => {}}
        onSearch={mockSearch}
        recentSearches={['mission', 'vehicle']}
      />
    );

    expect(screen.getByText('Recent Searches')).toBeInTheDocument();
    expect(screen.getByText('mission')).toBeInTheDocument();
    expect(screen.getByText('vehicle')).toBeInTheDocument();
  });
});