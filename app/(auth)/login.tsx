import React from 'react';
import { router } from 'expo-router';

import { LoginScreen } from '@/features/auth/login-screen';

export default function LoginRoute() {
  return (
    <LoginScreen
      onPressGoogle={() => router.push('/(tabs)/chat')}
      onPressGithub={() => router.push('/(tabs)/chat')}
      onPressEmailLink={() => router.push('/(tabs)/chat')}
    />
  );
}
