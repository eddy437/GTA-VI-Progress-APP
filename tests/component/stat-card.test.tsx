import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from '@/components/dashboard/stat-card';

describe('StatCard', () => {
  it('should render stat information', () => {
    render(
      <StatCard
        title="Main Story"
        value="12 / 34"
        percentage={35}
        gradientFrom="from-vice-magenta"
        gradientTo="to-vice-pink"
      />
    );

    expect(screen.getByText('Main Story')).toBeInTheDocument();
    expect(screen.getByText('12 / 34')).toBeInTheDocument();
  });

  it('should render with trend indicator', () => {
    render(
      <StatCard
        title="Progress"
        value="50%"
        percentage={50}
        trend="up"
        trendValue="+5%"
      />
    );

    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});