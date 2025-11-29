import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.booking.app',
  appName: 'BookingApp',
  webDir: 'public', 
  server: {
    url: 'https://booking-app-neon-six.vercel.app',
    cleartext: true,
  },
};

export default config;
