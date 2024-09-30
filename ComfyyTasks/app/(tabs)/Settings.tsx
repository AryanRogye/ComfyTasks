import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
export default function Settings() {
    const router = useRouter(); // Declare useRouter at the top level of the component

    const data: {
        id: number,
        title: string,
        icon:
            'person' |
            'lock-closed' |
            'notifications' |
            'shield' |
            'help-circle' |
            'information-circle' |
            'log-out'
        }[] = [
        { id: 1, title: 'Account', icon: 'person' },
        { id: 2, title: 'Security', icon: 'lock-closed' },
        { id: 3, title: 'Notifications', icon: 'notifications' },
        { id: 4, title: 'Privacy', icon: 'shield' },
        { id: 5, title: 'Help', icon: 'help-circle' },
        { id: 6, title: 'About', icon: 'information-circle' },
        { id: 7, title: 'Sign Out', icon: 'log-out' },
    ]

    const signOut = async () => {
        try {
            Alert.alert(
                'Sign Out',
                'Are you sure you want to sign out?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Sign Out',
                        onPress: async () => {
                            try {
                                // Clear the authentication state from AsyncStorage
                                await AsyncStorage.removeItem('isSignedIn');

                                // Navigate to the sign-in screen
                                router.push('/(auth)/SignIn');
                            } catch (e: any) {
                                Alert.alert('Error:\n', e.message);
                            }
                        },
                    },
                ]
            );
        } catch (e: any) {
            Alert.alert('Error:\n', e.message);
        }
    };

    const handlePress = async (title: string) => {
        if (title === 'Sign Out') {
            signOut();
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{flex: 1}} onPress={() => handlePress( item.title )}>
                        <View style={styles.item}>
                            <Ionicons name={item.icon} size={24} color="white" />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#414141',
    },
    item: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
    }
});
