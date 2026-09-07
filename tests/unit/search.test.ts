import { describe, it, expect } from 'vitest';

describe('Search Functionality', () => {
  const mockData = [
    { id: '1', title: 'The Assassination', type: 'mission', description: 'Eliminate target' },
    { id: '2', title: 'Hidden Package 1', type: 'collectible', description: 'Find package' },
    { id: '3', title: 'Turismo R', type: 'vehicle', description: 'Super car' },
    { id: '4', title: 'Vice Beach Nightclub', type: 'business', description: 'Own business' },
  ];

  it('should filter by search query', () => {
    const query = 'assassination';
    const results = mockData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('The Assassination');
  });

  it('should be case insensitive', () => {
    const query = 'TURISMO';
    const results = mockData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Turismo R');
  });

  it('should return empty for no matches', () => {
    const query = 'nonexistent';
    const results = mockData.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    expect(results).toHaveLength(0);
  });

  it('should search in descriptions', () => {
    const query = 'eliminate';
    const results = mockData.filter((item) =>
      item.description.toLowerCase().includes(query)
    );
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('The Assassination');
  });
});