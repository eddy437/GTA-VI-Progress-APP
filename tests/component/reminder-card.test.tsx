import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReminderCard } from '@/components/dashboard/reminder-card';

describe('ReminderCard', () => {
  it('should render reminder information', () => {
    render(
      <ReminderCard
        title="The Assassination"
        description="You left this mission unfinished."
        type="Unfinished Mission"
        scheduledDate={new Date().toISOString()}
      />
    );

    expect(screen.getByText('The Assassination')).toBeInTheDocument();
    expect(screen.getByText('You left this mission unfinished.')).toBeInTheDocument();
    expect(screen.getByText('Unfinished Mission')).toBeInTheDocument();
  });

  it('should call onComplete when complete button clicked', () => {
    const onComplete = vi.fn();
    render(
      <ReminderCard
        title="Test Reminder"
        description="Test description"
        type="Test"
        onComplete={onComplete}
      />
    );

    fireEvent.click(screen.getByText('Complete'));
    expect(onComplete).toHaveBeenCalled();
  });

  it('should call onSnooze when snooze button clicked', () => {
    const onSnooze = vi.fn();
    render(
      <ReminderCard
        title="Test Reminder"
        description="Test description"
        type="Test"
        onSnooze={onSnooze}
      />
    );

    fireEvent.click(screen.getByText('Snooze'));
    expect(onSnooze).toHaveBeenCalled();
  });
});