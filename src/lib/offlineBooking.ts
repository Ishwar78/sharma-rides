// Offline booking storage and sync utilities

export interface PendingBooking {
  id: string;
  carName: string;
  name: string;
  mobile: string;
  pickupDate: string;
  dropDate: string;
  createdAt: string;
  synced: boolean;
}

const PENDING_BOOKINGS_KEY = 'pendingBookings';

export const savePendingBooking = (booking: Omit<PendingBooking, 'id' | 'createdAt' | 'synced'>): PendingBooking => {
  const pendingBookings = getPendingBookings();
  
  const newBooking: PendingBooking = {
    ...booking,
    id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    synced: false,
  };
  
  pendingBookings.push(newBooking);
  localStorage.setItem(PENDING_BOOKINGS_KEY, JSON.stringify(pendingBookings));
  
  // Register for background sync if available
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      (registration as any).sync.register('sync-bookings').catch((err: Error) => {
        console.log('Background sync registration failed:', err);
      });
    });
  }
  
  return newBooking;
};

export const getPendingBookings = (): PendingBooking[] => {
  try {
    const saved = localStorage.getItem(PENDING_BOOKINGS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const markBookingAsSynced = (bookingId: string): void => {
  const pendingBookings = getPendingBookings();
  const updated = pendingBookings.map((b) =>
    b.id === bookingId ? { ...b, synced: true } : b
  );
  localStorage.setItem(PENDING_BOOKINGS_KEY, JSON.stringify(updated));
};

export const removeSyncedBookings = (): void => {
  const pendingBookings = getPendingBookings();
  const unsynced = pendingBookings.filter((b) => !b.synced);
  localStorage.setItem(PENDING_BOOKINGS_KEY, JSON.stringify(unsynced));
};

export const syncPendingBookings = async (): Promise<void> => {
  const pendingBookings = getPendingBookings().filter((b) => !b.synced);
  
  if (pendingBookings.length === 0) return;
  
  for (const booking of pendingBookings) {
    try {
      // Generate WhatsApp message
      const message = `Hello Sharma Car Rent,

I want to book a car with the following details:

*Car:* ${booking.carName}
*Name:* ${booking.name}
*Mobile:* ${booking.mobile}
*Pickup Date:* ${booking.pickupDate}
*Drop Date:* ${booking.dropDate}

Please confirm availability and pricing.

(This booking was saved offline and synced automatically)`;

      const whatsappUrl = `https://wa.me/919053860397?text=${encodeURIComponent(message)}`;
      
      // Mark as synced
      markBookingAsSynced(booking.id);
      
      // Open WhatsApp (only works if user is interacting)
      if (document.hasFocus()) {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
      
      console.log('Synced booking:', booking.id);
    } catch (error) {
      console.error('Failed to sync booking:', booking.id, error);
    }
  }
  
  // Clean up synced bookings
  removeSyncedBookings();
};

// Check if online and sync
export const checkAndSync = (): void => {
  if (navigator.onLine) {
    syncPendingBookings();
  }
};

// Listen for online event
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('Back online - syncing pending bookings...');
    syncPendingBookings();
  });
}
