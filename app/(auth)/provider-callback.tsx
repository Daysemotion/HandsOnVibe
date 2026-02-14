import React from 'react';
import { router } from 'expo-router';

import { ProviderCallbackScreen } from '@/features/auth/provider-callback-screen';

export default function ProviderCallbackRoute() {
  return (
    <ProviderCallbackScreen
      providerName="OpenAI"
      onFinish={() => router.replace('/settings/models')}
    />
  );
}
