import React, {memo, useMemo, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SharedValue, useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import { Dimensions } from "react-native";

export default function Home() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const abrDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const getDayOfWeek = () => {
        let now = new Date();
        return days[now.getDay()];
    };

    interface DayPosition {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const originalX = 0;
    const originalY = 0;
    const originalWidth = 53;
    const originalHeight = 80;

    const dayPositions = useRef<DayPosition[]>(Array(days.length).fill({ x: 0, y: 0, width: 0, height: 0 }));

    const xValues = useRef<SharedValue<number>[]>(days.map(() => useSharedValue(originalX))).current;
    const yValues = useRef<SharedValue<number>[]>(days.map(() => useSharedValue(originalY))).current;
    const width = useRef<SharedValue<number>[]>(days.map(() => useSharedValue(originalWidth))).current;
    const height = useRef<SharedValue<number>[]>(days.map(() => useSharedValue(originalHeight))).current;

    interface RenderCalendarProps {
        days : string[];
        handleCalPress : (index: number) => void;
        animatedStyles : any[];
        getDayOfWeek : () => string;
        getDateForDay : (day: string) => number;
    }



    const animatedStyles = useRef(days.map((_, index) => {
        return useAnimatedStyle(() => ({
            transform: [
                { translateX: xValues[index].value }, // Use the current value
                { translateY: yValues[index].value },
            ],
            width: width[index].value, // Use the animated width
            height: height[index].value, // Use the animated height
        }));
    })).current;


    const getDateForDay = (day: string): number => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const now = new Date();
        const today = now.getDay(); // Get current day (0 = Sunday, 1 = Monday, etc.)

        const targetDayIndex = days.indexOf(day); // Find the index of the target day

        // Calculate the difference in days
        const diff = targetDayIndex - today;

        // Get the target date by adding the difference to the current date
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + diff);

        return targetDate.getDate(); // Return the date of the target day
    };

    const handleCalPress = (index: number) => {
        // Determine if the same day was pressed
        const isSameDayPressed =
            xValues[index].value !== originalX ||
            yValues[index].value !== originalY ||
            width[index].value !== originalWidth ||
            height[index].value !== originalHeight;

        // Reset all values to their original values
        for (let i = 0; i < days.length; i++) {
            xValues[i].value = withSpring(originalX);
            yValues[i].value = withSpring(originalY);
            width[i].value = withSpring(originalWidth);
            height[i].value = withSpring(originalHeight);
        }

        // Animate the selected day unless it is already selected
        if (!isSameDayPressed) {
            let newWidth: number = 300;
            xValues[index].value = withSpring((screenWidth - newWidth) / 2); // Move it left or right as desired
            yValues[index].value = withSpring(300); // Move it down or up as desired
            width[index].value = withSpring(newWidth);   // Expand width
            height[index].value = withSpring(200);  // Expand height
        }
    };

    const RenderCalendar = memo<RenderCalendarProps>(({
        days,
        handleCalPress,
        animatedStyles,
        getDayOfWeek,
        getDateForDay
    }) => {
        return days.map((day, index) => {
            let abrDay;
            if (day.substring(0, 3) === abrDays[days.indexOf(day)]) {
                abrDay = day.substring(0, 3);
            }

            let date = getDateForDay(day);
            return (
                <TouchableOpacity key={index} onPress={() => { handleCalPress(index); }}>
                    <Animated.View
                        onLayout={(event) => {
                            const { x, y, width, height } = event.nativeEvent.layout;
                            dayPositions.current[index] = { x, y, width, height };
                        }}
                        style={[day !== getDayOfWeek() ? styles.dayBox : styles.todayBox, animatedStyles[index]]}
                    >
                        <Text style={day === getDayOfWeek() ? styles.currText : styles.dayText}>{abrDay}</Text>
                        <Text style={day === getDayOfWeek() ? styles.currText : styles.dateText}>{date}</Text>
                    </Animated.View>
                </TouchableOpacity>
            );
        });
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Mange Tasks</Text>
            </View>
            <View style={styles.calRow}>
            <RenderCalendar
                days={days}
                handleCalPress={handleCalPress}
                animatedStyles={animatedStyles}
                getDayOfWeek={getDayOfWeek}
                getDateForDay={getDateForDay}
            />
            </View>
        </SafeAreaView>
    );
}



const calTextSize = 15;
const fontFam = 'System';
const backgroundColor = '#414141';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center',
  },
  title: {
    width: '100%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: fontFam,
  },
  calRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
  },
  dayText: {
    fontSize: calTextSize,
    fontWeight: '500',
    padding: 10,
    color: 'black',
    fontFamily: fontFam,
  },
  dayBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    marginLeft: 0.5,
    marginRight: 0.5,
    minWidth: 54,
  },
  todayBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: calTextSize,
    fontWeight: '500',
    padding: 10,
    color: 'black',
    fontFamily: fontFam,
  },
  currText: {
    fontSize: calTextSize,
    fontWeight: '500',
    padding: 10,
    fontFamily: fontFam,
  },
  scrollView: {
    marginTop: 10,
  },
});
