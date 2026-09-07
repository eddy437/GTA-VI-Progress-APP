import { NextResponse } from 'next/server';
import { ReminderRepository } from '@/lib/repositories/reminder-repository';
import { ReminderSchema } from '@/lib/validations';
import { validateInput } from '@/lib/security/validate';
import { rateLimit } from '@/lib/security/rate-limit';

const reminderRepository = new ReminderRepository();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'AUTH_ERROR', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    let reminders;
    if (status === 'pending') {
      reminders = await reminderRepository.findPendingReminders(userId);
    } else {
      reminders = await reminderRepository.findAll(userId);
    }

    return NextResponse.json({ success: true, data: reminders });
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch reminders' } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const userId = request.headers.get('x-user-id');
    if (userId && !rateLimit(`create-reminder-${userId}`, 10, 60000)) {
      return NextResponse.json(
        { success: false, error: { code: 'RATE_LIMIT', message: 'Too many requests. Please try again later.' } },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = validateInput(ReminderSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: validation.error } },
        { status: 400 }
      );
    }

    const reminder = await reminderRepository.create(validation.data);

    if (!reminder) {
      throw new Error('Failed to create reminder');
    }

    return NextResponse.json({ success: true, data: reminder });
  } catch (error) {
    console.error('Error creating reminder:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create reminder' } },
      { status: 500 }
    );
  }
}