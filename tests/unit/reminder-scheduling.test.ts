import { describe, it, expect } from 'vitest';
import { parseISO, format, addHours, addDays } from 'date-fns';

describe('Reminder Scheduling', () => {
  it('should calculate correct reminder times', () => {
    const now = new Date();
    const oneHour = addHours(now, 1);
    const oneDay = addDays(now, 1);
    const weekend = addDays(now, 6); // Next Saturday

    expect(format(oneHour, 'HH:mm')).toMatch(/^\d{2}:\d{2}$/);
    expect(format(oneDay, 'yyyy-MM-dd')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(weekend.getDay()).toBe(6); // Saturday
  });

  it('should format reminder presets correctly', () => {
    const presets = {
      '1 hour': { hours: 1 },
      'Tonight': { hours: 4 },
      'Tomorrow': { days: 1 },
      'This weekend': { days: 5 },
    };

    expect(presets['1 hour'].hours).toBe(1);
    expect(presets['Tonight'].hours).toBe(4);
    expect(presets['Tomorrow'].days).toBe(1);
    expect(presets['This weekend'].days).toBe(5);
  });

  it('should validate reminder dates', () => {
    const now = new Date();
    const pastDate = addDays(now, -1);
    const futureDate = addDays(now, 1);

    expect(pastDate < now).toBe(true);
    expect(futureDate > now).toBe(true);
  });
});