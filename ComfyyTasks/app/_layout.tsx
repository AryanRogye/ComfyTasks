import { Stack } from 'expo-router';

const Layout = () => {
    return (
        <Stack
            initialRouteName="(tabs)"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
};

export default Layout;
