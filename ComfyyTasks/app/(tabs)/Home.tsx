import React from 'react';
import {SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { RenderWeekCalendar } from '@/components/render_week_cal';

export default function Home({props}: any) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Manage Tasks✏</Text>
            </View>
            <View style={styles.calRow}>
            <RenderWeekCalendar/>
            </View>
        </SafeAreaView>
    );
}

const calTextSize = 15;
const fontFam = 'System';
const backgroundColor = '#414141';
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center',
  },
  title: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
  scrollView: {
    marginTop: 10,
  },
});
