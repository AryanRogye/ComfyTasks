import React from "react";
import { StyleSheet } from "react-native";


const calTextSize = 15;
const fontFam = 'System';
const backgroundColor = '#414141';
const styles = StyleSheet.create({
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
    dayText: {
        fontSize: calTextSize,
        fontWeight: '500',
        padding: 10,
        color: 'black',
        fontFamily: fontFam,
  },
});

export default styles;
