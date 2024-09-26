import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { authHook } from './hooks/auth_hook';

const Layout = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false); // Use null for initial loading state



  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
    </Stack>
  );
};

export default Layout;
