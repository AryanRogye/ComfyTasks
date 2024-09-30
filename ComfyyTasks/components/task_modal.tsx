
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, SafeAreaView, Text, StyleSheet, Modal, Button } from "react-native";
import { Dimensions } from "react-native";

interface TaskModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
    visible,
    setVisible
}) => {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
        >
            <SafeAreaView style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}> Add A Task </Text>
                        <Ionicons name="information-circle-outline" size={20}/>
                    </View>
                    <Button title="close" onPress={() => setVisible(false)}/>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
    },
    modalContainer: {
        width: '100%', // Set width to 80% of the screen
        height: screenHeight - 50, // Set the height of the modal here
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '300',
        fontFamily: 'Roboto',
        textAlign: 'center',
    }
});
