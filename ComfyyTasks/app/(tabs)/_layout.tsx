import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { TaskModal } from '@/components/task_modal';

const TabsLayout = () => {
    // Plan is there is 2 circles, one is for creating a event and the other is for creating a task
    // Event is like a calendar event, and task is like a todo list
    // When Add button is pressed, the 2 circles will appear in an animated way
    // Hoping to be coming up and then expanding outwards

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const circleSize = 75; // Target size for your circles
    const circleWidth = useSharedValue(0);
    const circleHeight = useSharedValue(0);

    const startingX = (screenWidth - circleSize) / 2; // Centered X position

    const addButtonY = screenHeight - circleSize - 1;

    const centerX = screenWidth / 2;
    const centerY = addButtonY + circleSize / 2;

    const eventCircleX = useSharedValue(centerX);
    const eventCircleY = useSharedValue(centerY);
    const taskCircleX = useSharedValue(centerX);
    const taskCircleY = useSharedValue(centerY);

    const [eventCircleVisible, setEventCircleVisible] = useState(false);


    const [taskPressed, setTaskPressed] = useState(false);
    const [eventPressed, setEventPressed] = useState(false);

    const handleEventPress = () => {

    }

    const handleTaskPress = () => {
        setTaskPressed(true);
    }

    // Animated styles for the circles

    const eventCircleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
        { translateX: eventCircleX.value - circleWidth.value / 2 },
        { translateY: eventCircleY.value - circleHeight.value / 2 },
    ],
    width: circleWidth.value,
    height: circleHeight.value,
    borderRadius: circleWidth.value / 2,
    justifyContent: 'center',
    alignItems: 'center',
    }));

    const taskCircleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
        { translateX: taskCircleX.value - circleWidth.value / 2 },
        { translateY: taskCircleY.value - circleHeight.value / 2 },
    ],
    width: circleWidth.value,
    height: circleHeight.value,
    borderRadius: circleWidth.value / 2,
    justifyContent: 'center',
    alignItems: 'center',
}));

    useEffect(() => {
        if (eventCircleVisible) {
            // Animate width and height from 0 to circleSize
            circleWidth.value = withSpring(circleSize);
            circleHeight.value = withSpring(circleSize);

            // Move circles up
            eventCircleY.value = withSpring(centerY - 90);
            taskCircleY.value = withSpring(centerY - 90);

            // Optionally move circles outward horizontally after a short delay
            setTimeout(() => {
            eventCircleX.value = withSpring(centerX - 80); // Move left
            taskCircleX.value = withSpring(centerX + 80);  // Move right
            }, 200);
        } else {
            // Reset positions to center
            eventCircleX.value = withSpring(centerX);
            taskCircleX.value = withSpring(centerX);
            eventCircleY.value = withSpring(centerY);
            taskCircleY.value = withSpring(centerY);

            // Animate width and height back to 0
            circleWidth.value = withTiming(0);
            circleHeight.value = withTiming(0);
        }
    }, [eventCircleVisible]);

    return (
        <>
            <Tabs initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="Home"
                    options={{
                        tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                        tabBarShowLabel: false,
                    }}
                />
                {/* Basically Need to get a way to have a add button in the middle */}
                <Tabs.Screen
                    name="Add"
                    options={{
                        tabBarIcon: ({ color }) => <Ionicons name="add" size={24} color={color} />,
                        tabBarButton: (props) => (
                            <TouchableOpacity
                                {...props}
                                style={{ flex: 1 }}
                                onPress={() => {
                                    setEventCircleVisible(!eventCircleVisible);
                                }}
                                activeOpacity={0.96} // Prevent opacity change on press
                            >
                                <View style={styles.addContainer}>
                                    <Ionicons name="add" size={25} style={styles.addButton} />
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                <Tabs.Screen
                    name="Settings"
                    options={{
                        tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                        tabBarShowLabel: false,
                    }}
                />
            </Tabs>

            {/* Event Circle */}
                {/* Event Circle */}
            <View style={styles.circleContainer}>
                <TouchableOpacity onPress={() => handleEventPress()}>
                    <Animated.View style={[styles.addEvent, eventCircleStyle]}>
                        <Text style={styles.circleText}>Event</Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Task Circle */}
                <TouchableOpacity onPress={() => handleTaskPress()}>
                    <Animated.View style={[styles.addTask, taskCircleStyle]}>
                        <Text style={styles.circleText}>Task</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <TaskModal
                visible={taskPressed}
                setVisible={setTaskPressed}
            />
        </>
    );
};

export default TabsLayout;

const styles = StyleSheet.create({
    addContainer: {
        backgroundColor: '#414141',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 100,
        height: 100,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 1,
    },
    addButton: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        top: 10,
    },
    addEvent: {
        backgroundColor: 'white',
        position: 'absolute',
    },
    addTask: {
        backgroundColor: 'white',
        position: 'absolute',
    },
    circleText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    circleContainer: {
        borderWidth: 1,
        position: 'absolute',
    },
})
