import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
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

    const handlePress = (title: string) => {
        // This Works Inside For the given data
    }

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
