import { useState, useEffect, useCallback } from 'react';

interface PushNotificationState {
  isSupported: boolean;
  permission: NotificationPermission | 'unsupported';
  isSubscribed: boolean;
}

export const usePushNotifications = () => {
  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    permission: 'unsupported',
    isSubscribed: false
  });

  useEffect(() => {
    const isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    
    if (isSupported) {
      setState(prev => ({
        ...prev,
        isSupported: true,
        permission: Notification.permission,
        isSubscribed: Notification.permission === 'granted'
      }));
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported) {
      console.log('Push notifications not supported');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      
      setState(prev => ({
        ...prev,
        permission,
        isSubscribed: permission === 'granted'
      }));

      if (permission === 'granted') {
        // Show welcome notification
        showNotification('Notifications Enabled! 🎉', {
          body: 'You\'ll now receive updates about your bookings and special offers.',
          icon: '/pwa-icon-192.png',
          badge: '/pwa-icon-192.png',
          tag: 'welcome'
        });
        
        // Store subscription status
        localStorage.setItem('pushNotificationsEnabled', 'true');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [state.isSupported]);

  const showNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (!state.isSupported || Notification.permission !== 'granted') {
      console.log('Cannot show notification - not permitted');
      return;
    }

    // Try to use service worker for notification if available
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, {
          icon: '/pwa-icon-192.png',
          badge: '/pwa-icon-192.png',
          ...options
        });
      });
    } else {
      // Fallback to regular notification
      new Notification(title, {
        icon: '/pwa-icon-192.png',
        badge: '/pwa-icon-192.png',
        ...options
      });
    }
  }, [state.isSupported]);

  // Booking notification helpers
  const notifyBookingConfirmed = useCallback((carName: string, date: string) => {
    showNotification('Booking Confirmed! ✅', {
      body: `Your ${carName} is booked for ${date}. We'll contact you shortly.`,
      tag: 'booking-confirmed',
      requireInteraction: true
    });
  }, [showNotification]);

  const notifyBookingReminder = useCallback((carName: string, hoursUntil: number) => {
    showNotification('Upcoming Booking Reminder 🚗', {
      body: `Your ${carName} booking is in ${hoursUntil} hours. Get ready for your journey!`,
      tag: 'booking-reminder'
    });
  }, [showNotification]);

  const notifySpecialOffer = useCallback((offerTitle: string, discount: string) => {
    showNotification('Special Offer! 🎁', {
      body: `${offerTitle} - Save ${discount}! Book now before it expires.`,
      tag: 'special-offer'
    });
  }, [showNotification]);

  return {
    ...state,
    requestPermission,
    showNotification,
    notifyBookingConfirmed,
    notifyBookingReminder,
    notifySpecialOffer
  };
};
