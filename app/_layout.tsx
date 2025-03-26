import {Stack} from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
