import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const TabsLayout = () => {
    // Plan is there is 2 circles, one is for creating a event and the other is for creating a task
    // Event is like a calendar event, and task is like a todo list
    // When Add button is pressed, the 2 circles will appear in an animated way
    // Hoping to be coming up and then expanding outwards

    const screenWidth = Dimensions.get('window').width;

    const circleWidth = useSharedValue(100);
    const circleHeight = useSharedValue(100);

    const startingX = (screenWidth - circleWidth.value) / 2; // Centered

    const eventCircleX = useSharedValue(startingX); // Centered
    const eventCircleY = useSharedValue(0);
    const taskCircleX = useSharedValue(startingX); // Centered
    const taskCircleY = useSharedValue(0);


    const [eventCircleVisible, setEventCircleVisible] = useState(false);

    // Animated styles for the circles

    let conditionWidth = eventCircleVisible ? circleWidth : 0;
    let conditionHeight = eventCircleVisible ? circleHeight : 0;


    // let circleWidthValue = conditionWidth;
    // let circleHeightValue = conditionHeight;
    let circleWidthValue = circleWidth.value;
    let circleHeightValue = circleHeight.value;

    const eventCircleStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: eventCircleX.value },
            { translateY: eventCircleY.value },
        ],
        width: circleWidthValue,
        height: circleHeightValue,
        borderRadius: circleWidth.value / 2,
    }));

    const taskCircleStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: taskCircleX.value },
            { translateY: taskCircleY.value },
            ],
        width: circleWidthValue,
        height: circleHeightValue,
        borderRadius: circleWidth.value / 2,
    }));

    useEffect(() => {
        if(eventCircleVisible) {
            console.log('Event Circle Visible');
            eventCircleY.value = withSpring(-100);
            taskCircleY.value = withSpring(-100);
            circleWidth.value = withSpring(circleWidth.value);
            circleWidth.value = withSpring(circleHeight.value);
            // Wait for like 0.5 seconds
            // setTimeout(() => {
            //     eventCircleX.value = withSpring(eventCircleX.value - 50);
            //     taskCircleX.value = withSpring(taskCircleX.value + 50);
            // }, 500);
        } else {
            console.log('Event Circle Not Visible');
            eventCircleX.value = withSpring(startingX);
            taskCircleX.value = withSpring(startingX);
            eventCircleY.value = withSpring(0);
            taskCircleY.value = withSpring(0);
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
                <TouchableOpacity>
                    <Animated.View style={[styles.addEvent, eventCircleStyle, { backgroundColor: 'red' }]}>
                        <Text style={styles.circleText}>Event</Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Task Circle */}
                <TouchableOpacity>
                    <Animated.View style={[styles.addTask, taskCircleStyle, { backgroundColor: 'blue' }]}>
                        <Text style={styles.circleText}>Task</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
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
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    addTask: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    circleText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        top: 25,
        marginTop: 75 / 2 - 10,
    },
    circleContainer: {
    },
})
