import { NextResponse } from 'next/server';
import { NotificationRepository } from '@/lib/repositories/notification-repository';
import { sendNotificationToUser } from '@/lib/notifications/web-push';
import { rateLimit } from '@/lib/security/rate-limit';

const notificationRepository = new NotificationRepository();

export async function GET(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'AUTH_ERROR', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get('unread') === 'true';

    let notifications;
    if (unreadOnly) {
      notifications = await notificationRepository.findUnreadNotifications(userId);
    } else {
      notifications = await notificationRepository.findAll(userId);
    }

    return NextResponse.json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch notifications' } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'AUTH_ERROR', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // Rate limiting
    if (!rateLimit(`send-notification-${userId}`, 20, 60000)) {
      return NextResponse.json(
        { success: false, error: { code: 'RATE_LIMIT', message: 'Too many requests. Please try again later.' } },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { title, message, type, link } = body;

    if (!title || !message || !type) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Title, message, and type are required' } },
        { status: 400 }
      );
    }

    const sent = await sendNotificationToUser(userId, {
      title,
      message,
      type,
      link,
    });

    if (!sent) {
      throw new Error('Failed to send notification');
    }

    return NextResponse.json({ success: true, data: { sent: true } });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to send notification' } },
      { status: 500 }
    );
  }
}