import * as webpush from 'web-push';

export function getVapidKeys() {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;

  if (!publicKey || !privateKey || !subject) {
    console.warn('VAPID keys are not configured. Web push notifications are disabled.');
    return null;
  }

  return { publicKey, privateKey, subject };
}

export function configureVapid() {
  const keys = getVapidKeys();
  if (!keys) return false;

  webpush.setVapidDetails(keys.subject, keys.publicKey, keys.privateKey);
  return true;
}

export async function sendPushNotification(
  subscription: any,
  payload: any
): Promise<boolean> {
  const keys = getVapidKeys();
  if (!keys) return false;

  try {
    configureVapid();
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return true;
  } catch (error) {
    console.error('Error sending push notification:', error);
    return false;
  }
}