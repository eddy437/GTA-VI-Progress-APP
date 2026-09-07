import { createClient } from '@/lib/supabase/server';
import { sendPushNotification } from './vapid';
import { DEMO_MODE } from '@/lib/constants';

export async function sendNotificationToUser(
  userId: string,
  notification: {
    title: string;
    message: string;
    type: string;
    link?: string;
  }
): Promise<boolean> {
  if (DEMO_MODE) {
    console.log('Demo mode: notification not sent', notification);
    return true;
  }

  const client = await createClient();
  if (!client) return false;

  try {
    // Save in-app notification
    const { error: insertError } = await client
      .from('notifications')
      .insert({
        user_id: userId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        link: notification.link,
        is_read: false,
      });

    if (insertError) {
      console.error('Error saving notification:', insertError);
      return false;
    }

    // Get push subscriptions
    const { data: subscriptions, error: subError } = await client
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userId);

    if (subError) {
      console.error('Error fetching push subscriptions:', subError);
      return false;
    }

    // Send push notifications
    for (const subscription of subscriptions) {
      const pushSubscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh_key,
          auth: subscription.auth_key,
        },
      };

      await sendPushNotification(pushSubscription, {
        title: notification.title,
        body: notification.message,
        url: notification.link,
      });
    }

    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
}

export async function savePushSubscription(
  userId: string,
  subscription: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  }
): Promise<boolean> {
  if (DEMO_MODE) return true;

  const client = await createClient();
  if (!client) return false;

  const { error } = await client
    .from('push_subscriptions')
    .upsert({
      user_id: userId,
      endpoint: subscription.endpoint,
      p256dh_key: subscription.keys.p256dh,
      auth_key: subscription.keys.auth,
    });

  if (error) {
    console.error('Error saving push subscription:', error);
    return false;
  }

  return true;
}

export async function removePushSubscription(
  userId: string,
  endpoint: string
): Promise<boolean> {
  if (DEMO_MODE) return true;

  const client = await createClient();
  if (!client) return false;

  const { error } = await client
    .from('push_subscriptions')
    .delete()
    .eq('user_id', userId)
    .eq('endpoint', endpoint);

  if (error) {
    console.error('Error removing push subscription:', error);
    return false;
  }

  return true;
}