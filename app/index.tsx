import {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from "react-native";

import * as Location from 'expo-location';
import {Link} from "expo-router";

export default function Index() {
    const [permission, requestPermission] = Location.useForegroundPermissions();

    useEffect(() => {
        if (!permission?.granted) {
            void requestPermission();
        }

        if (permission != null) {
            console.log(permission.status)
        }

    }, [permission]);

    return (
        <View>
            <Text>Hello World!</Text>
            <Link href="/app/location-screen" style={styles.button}>
                Go to About screen
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
})
