import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";

export default function EventModal(
    visible : boolean
) {
    return (
        <Modal
            animationType="slide"
            visible={visible}
        >
            <Text>Hello</Text>
        </Modal>
    )
}
