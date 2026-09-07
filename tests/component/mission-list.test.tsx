import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MissionSummary } from '@/components/dashboard/mission-summary';

describe('MissionSummary', () => {
  const mockMissions = [
    { id: '1', title: 'Mission 1', category: 'Main Story', is_completed: true },
    { id: '2', title: 'Mission 2', category: 'Side Mission', is_completed: false },
    { id: '3', title: 'Mission 3', category: 'Heist', is_completed: true },
  ];

  it('should render mission list', () => {
    render(
      <MissionSummary
        missions={mockMissions}
        completedCount={2}
        totalCount={3}
      />
    );

    expect(screen.getByText('Missions')).toBeInTheDocument();
    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.getByText('Mission 2')).toBeInTheDocument();
    expect(screen.getByText('Mission 3')).toBeInTheDocument();
  });

  it('should render correct completion count', () => {
    render(
      <MissionSummary
        missions={mockMissions}
        completedCount={2}
        totalCount={3}
      />
    );

    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });
});