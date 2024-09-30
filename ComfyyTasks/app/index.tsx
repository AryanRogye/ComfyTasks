// app/index.tsx
import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { useAuthHook } from './hooks/auth_hook';

export default function Index() {
  const { status } = useAuthHook(); // Retrieve the auth status

  if (status === null) {
    // Display a loading screen or spinner here
    return null;
  }

  // Redirect based on the signedIn state
  return <Redirect href={status ? '/(tabs)/Home' : '/(auth)/SignIn'} />;
}
