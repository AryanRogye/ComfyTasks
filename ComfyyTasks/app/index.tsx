// app/index.tsx
import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { useAuthHook } from './hooks/auth_hook';

export default function Index() {
  const [status, setStatus] = useState<boolean | null>(true); // Use `null` as an initial value


  if (status === null) {
    // You can add a loading spinner here while checking the authentication state
    return null; // or a loading component like <LoadingScreen />
  }

  // Redirect based on the signedIn state
  return <Redirect href={status ? '/(tabs)/Home' : '/(auth)/SignIn'} />;
}
