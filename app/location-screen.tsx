import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const {status} = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') {
                const {status: newStatus} = await Location.requestForegroundPermissionsAsync();
                if (newStatus !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    }

    return (
        <View>
            <Text>{text}</Text>
        </View>
    );
}
