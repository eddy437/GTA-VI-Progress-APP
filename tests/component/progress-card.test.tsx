import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressCard } from '@/components/dashboard/progress-card';

describe('ProgressCard', () => {
  it('should render progress information', () => {
    render(
      <ProgressCard
        percentage={67}
        completed={186}
        total={276}
        achievements="12/58"
        rewards="$4.2M"
      />
    );

    expect(screen.getByText('67%')).toBeInTheDocument();
    expect(screen.getByText('186 / 276 Completed')).toBeInTheDocument();
    expect(screen.getByText('12/58')).toBeInTheDocument();
    expect(screen.getByText('$4.2M')).toBeInTheDocument();
  });

  it('should render with different values', () => {
    render(
      <ProgressCard
        percentage={0}
        completed={0}
        total={100}
        achievements="0/58"
        rewards="$0"
      />
    );

    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('0 / 100 Completed')).toBeInTheDocument();
  });
});