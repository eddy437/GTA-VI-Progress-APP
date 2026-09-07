import { NextResponse } from 'next/server';
import { ReminderRepository } from '@/lib/repositories/reminder-repository';

const reminderRepository = new ReminderRepository();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { action } = body;

    let reminder;

    switch (action) {
      case 'complete':
        reminder = await reminderRepository.completeReminder(params.id);
        break;
      case 'snooze':
        const hours = body.hours || 1;
        reminder = await reminderRepository.snoozeReminder(params.id, hours);
        break;
      default:
        reminder = await reminderRepository.update(params.id, body);
    }

    if (!reminder) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Reminder not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: reminder });
  } catch (error) {
    console.error('Error updating reminder:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update reminder' } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await reminderRepository.delete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Reminder not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { id: params.id } });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to delete reminder' } },
      { status: 500 }
    );
  }
}