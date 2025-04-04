import {Stack} from "expo-router";

import 'expo-dev-client';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="+not-found"/>
            <Stack.Screen name="index" options={{headerShown: false, title: 'Landing'}}/>
            <Stack.Screen name="location-screen" options={{headerShown: false, title: 'Location'}}/>
        </Stack>
    );
}
