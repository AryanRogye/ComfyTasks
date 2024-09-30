// hooks/auth_hook.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export const useAuthHook = () => {
    const [status, setStatus] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const isSignedIn = await AsyncStorage.getItem('isSignedIn');
            setStatus(isSignedIn === 'true');
        };
        checkAuthStatus();
    }, []);

    const setSignedIn = async (signedIn: boolean) => {
        await AsyncStorage.setItem('isSignedIn', signedIn.toString());
        setStatus(signedIn);
    };

    return { status, setSignedIn };
};
