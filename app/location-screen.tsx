import React, {useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import * as Location from 'expo-location';
import {getProviderStatusAsync, LocationAccuracy, LocationOptions} from 'expo-location';
import {useRouter} from "expo-router";
import {useLocationTracking} from "@/services/location";

export default function LocationScreen() {
    const router = useRouter();

    const [errMsg, setErrMsg] = useState<string>();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [lastKnownPosition, setLastKnownPosition] = useState<Location.LocationObject | null>(null);

    const {isTracking, startTracking, stopTracking} = useLocationTracking();

    const logEnableNetworkProviderAsync = async () => {
        const log = await Location.enableNetworkProviderAsync();
        console.log("Enable Network Provider: ", log);
    }

    const logProviderStatusAsync = async () => {
        const log = await getProviderStatusAsync();
        console.log("Provider Status: ", log);
    }

    const logGetCurrentPositionAsync = async () => {
        const option: LocationOptions = {
            accuracy: LocationAccuracy.Balanced,
            mayShowUserSettingsDialog: true,
            timeInterval: 2000,
            distanceInterval: 1
        }
        try {
            const log = await Location.getCurrentPositionAsync(option);
            setLocation(log);
            console.log("Current Position: ", log);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            setErrMsg(errMsg);
            console.error(error);
        }
    }

    const logGetLastKnownPositionAsync = async () => {
        try {
            const log = await Location.getLastKnownPositionAsync();
            setLastKnownPosition(log);
            console.log("Last KnownPosition: ", log);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            setErrMsg(errMsg);
            console.error(error);
        }
    }

    const onClickTracking = async () => {
        if (isTracking) {
            await stopTracking();
        } else {
            await startTracking();
        }
    }

    let curLocText = 'Waiting...';
    if (location) {
        curLocText = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    } else if (errMsg) {
        curLocText = `Waiting: ${errMsg}`;
    }

    let lastKnownLocText = 'Waiting...';
    if (lastKnownPosition) {
        lastKnownLocText = `Latitude: ${lastKnownPosition.coords.latitude}, Longitude: ${lastKnownPosition.coords.longitude}`;
    } else if (errMsg) {
        curLocText = `Waiting: ${errMsg}`;
    }

    let isTrackingText = '미추적';
    if (isTracking) {
        isTrackingText = '추적중';
    } else {
        isTrackingText = '미추적';
    }

    return (
        <View>
            <Button onPress={() => router.back()} title={"back"}/>
            <Button onPress={() => logEnableNetworkProviderAsync()} title={"enable network provider"}/>
            <Button onPress={() => logProviderStatusAsync()} title={"check network provider status"}/>
            <Button onPress={() => logGetCurrentPositionAsync()} title={"현재 위치 단건 조회"}/>
            <Button onPress={() => logGetLastKnownPositionAsync()} title={"캐시된 last KnownPosition 조회"}/>
            <Text>현재 위치: {curLocText}</Text>
            <Text>알려진 마지막 위치: {lastKnownLocText}</Text>

            <View>
                <TouchableOpacity
                    onPress={() => onClickTracking()}
                >
                    <Text>{isTrackingText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
